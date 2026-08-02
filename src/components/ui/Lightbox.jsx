import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { src, srcSet } from '../../data/images'

/**
 * Accessible image viewer.
 *
 * - Esc closes, ← / → step through the filtered set
 * - focus moves in on open and returns to the trigger on close
 * - Tab is trapped inside the dialog
 * - background scroll is locked while open
 */
export default function Lightbox({ items, index, onClose, onStep }) {
  const dialogRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const open = index !== null && index >= 0
  const item = open ? items[index] : null

  const step = useCallback(
    (delta) => {
      if (!items.length) return
      onStep((index + delta + items.length) % items.length)
    },
    [index, items, onStep],
  )

  // Remember what had focus, then move focus into the dialog.
  useEffect(() => {
    if (!open) return
    restoreFocusRef.current = document.activeElement
    dialogRef.current?.focus()
    return () => {
      const node = restoreFocusRef.current
      if (node instanceof HTMLElement) node.focus()
    }
  }, [open])

  // Lock background scroll without the layout shifting as the scrollbar goes.
  useEffect(() => {
    if (!open) return
    const { body, documentElement } = document
    const gutter = window.innerWidth - documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (gutter > 0) body.style.paddingRight = `${gutter}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
      } else if (event.key === 'Tab') {
        // Trap focus: only the dialog's own controls are reachable.
        const focusable = dialogRef.current?.querySelectorAll('button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, step])

  if (!open || !item) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — image ${index + 1} of ${items.length}`}
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-100 flex flex-col bg-ink/97 backdrop-blur-sm outline-none"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <p className="label text-muted-dark">
          <span className="text-paper">{String(index + 1).padStart(2, '0')}</span>
          <span className="px-1.5 opacity-40">/</span>
          {String(items.length).padStart(2, '0')}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close gallery</span>
        </button>
      </div>

      {/* Clicking the backdrop closes; clicking the figure does not. */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center px-5 pb-4 sm:px-8"
        onClick={onClose}
      >
        <figure
          className="flex max-h-full min-h-0 flex-col items-center gap-5"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            key={item.id}
            src={src(item.photo.id, 1600)}
            srcSet={srcSet(item.photo.id, [960, 1400, 1920])}
            sizes="90vw"
            alt={item.photo.alt}
            className="min-h-0 rounded-2xl object-contain"
            style={{ maxHeight: '68vh' }}
          />
          <figcaption className="max-w-2xl text-center">
            <p className="label text-accent">{item.category}</p>
            <h2 className="display-tight mt-2 text-xl font-semibold text-paper sm:text-2xl">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-dark">{item.caption}</p>
          </figcaption>
        </figure>
      </div>

      <div className="flex items-center justify-center gap-3 px-5 pb-7 sm:px-8">
        <button
          type="button"
          onClick={() => step(-1)}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Previous project</span>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
        >
          <ArrowRight className="h-5 w-5" />
          <span className="sr-only">Next project</span>
        </button>
      </div>
    </div>,
    document.body,
  )
}
