import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, ChevronDown } from 'lucide-react'

/**
 * Custom single-select, styled to match the site's inputs.
 *
 * Replacing a native <select> means re-implementing everything the browser was
 * doing for free, so this follows the ARIA select-only combobox pattern:
 *
 * - focus never leaves the trigger; the active option is communicated with
 *   `aria-activedescendant`, which is far more robust than moving DOM focus
 * - ↑/↓ move (opening first if closed), Home/End jump, Enter/Space select,
 *   Escape closes without changing the value, Tab closes and moves on
 * - typing letters jumps to the matching option, like a real select
 * - clicking outside, or focus leaving the component, closes it and fires
 *   `onBlur` so the form's validation still runs
 *
 * `options` are `{ value, label, number? }`. The optional number renders in the
 * accent colour on the left, echoing the numbering on the services cards.
 */
export default function Select({
  id,
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Select…',
  invalid = false,
  describedBy,
  labelledBy,
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const optionRefs = useRef([])
  const typeahead = useRef({ buffer: '', at: 0 })
  const reduced = useReducedMotion()
  const listId = useId()

  const selectedIndex = options.findIndex((o) => o.value === value)
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    setActiveIndex(-1)
    if (restoreFocus) buttonRef.current?.focus()
  }, [])

  const openList = useCallback(
    (startIndex) => {
      setOpen(true)
      setActiveIndex(startIndex ?? (selectedIndex >= 0 ? selectedIndex : 0))
    },
    [selectedIndex],
  )

  const choose = useCallback(
    (index) => {
      const option = options[index]
      if (!option) return
      onChange(option.value)
      close()
    },
    [options, onChange, close],
  )

  // Keep the active option scrolled into view when arrowing through a list
  // that's taller than its container.
  useEffect(() => {
    if (!open || activeIndex < 0) return
    optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  // A click anywhere else dismisses the list. `mousedown` rather than `click`
  // so it closes before the other element takes focus.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
        setActiveIndex(-1)
        onBlur?.()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open, onBlur])

  const move = (delta) => {
    setActiveIndex((current) => {
      const from = current < 0 ? (selectedIndex >= 0 ? selectedIndex : 0) : current
      return Math.min(options.length - 1, Math.max(0, from + delta))
    })
  }

  const handleKeyDown = (event) => {
    const { key } = event

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault()
      if (!open) openList()
      else move(key === 'ArrowDown' ? 1 : -1)
      return
    }
    if (key === 'Home' || key === 'End') {
      if (!open) return
      event.preventDefault()
      setActiveIndex(key === 'Home' ? 0 : options.length - 1)
      return
    }
    if (key === 'Enter' || key === ' ') {
      event.preventDefault()
      if (!open) openList()
      else choose(activeIndex)
      return
    }
    if (key === 'Escape') {
      if (!open) return
      event.preventDefault()
      close()
      return
    }
    if (key === 'Tab') {
      // Let focus move on naturally, but don't leave the list hanging open.
      if (open) {
        setOpen(false)
        setActiveIndex(-1)
      }
      return
    }

    // Type-ahead: printable single characters jump to the next match.
    if (key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const now = Date.now()
      const buffer = now - typeahead.current.at > 600 ? key : typeahead.current.buffer + key
      typeahead.current = { buffer, at: now }

      const match = options.findIndex((o) =>
        o.label.toLowerCase().startsWith(buffer.toLowerCase()),
      )
      if (match >= 0) {
        if (!open) openList(match)
        else setActiveIndex(match)
      }
    }
  }

  // Focus leaving the whole component (not just moving inside it) counts as blur.
  const handleBlur = (event) => {
    if (rootRef.current?.contains(event.relatedTarget)) return
    setOpen(false)
    setActiveIndex(-1)
    onBlur?.()
  }

  const trigger =
    'flex w-full items-center justify-between gap-3 rounded-2xl border bg-paper px-4 py-3.5 ' +
    'text-left text-[0.9375rem] transition-colors duration-200 ' +
    (invalid
      ? 'border-accent'
      : open
        ? 'border-ink'
        : 'border-line hover:border-muted/50')

  return (
    <div ref={rootRef} className="relative" onBlur={handleBlur}>
      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-labelledby={labelledBy ? `${labelledBy} ${id}` : undefined}
        aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? close() : openList())}
        onKeyDown={handleKeyDown}
        className={trigger}
      >
        <span className={selected ? 'text-ink' : 'text-muted/60'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelledBy}
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-40 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-line bg-paper p-1.5 shadow-[0_18px_40px_-16px_rgba(11,11,12,0.28)]"
          >
            {options.map((option, i) => {
              const isSelected = option.value === value
              const isActive = i === activeIndex
              return (
                <li
                  key={option.value}
                  ref={(node) => (optionRefs.current[i] = node)}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  // Pointer selection, not click: mousedown would fire the
                  // wrapper's blur before the choice registers.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(i)}
                  // mousemove, not mouseenter. mouseenter also fires when the
                  // list opens underneath an already-stationary cursor, which
                  // would silently overwrite the option the keyboard just
                  // moved to. mousemove requires the pointer to actually move.
                  onMouseMove={() => setActiveIndex(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] transition-colors duration-150 ${
                    isActive ? 'bg-surface' : ''
                  } ${isSelected ? 'text-ink' : 'text-muted'}`}
                >
                  {/* Fixed-width slot so an option without a number (Other)
                      still aligns its label with the numbered ones. */}
                  <span
                    aria-hidden="true"
                    className={`label w-5 shrink-0 ${
                      isSelected ? 'text-accent' : 'text-muted/45'
                    }`}
                  >
                    {option.number}
                  </span>
                  <span className={isSelected ? 'font-medium' : ''}>{option.label}</span>
                  {isSelected && (
                    <Check className="ml-auto h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
