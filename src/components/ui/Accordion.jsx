import { useId, useState } from 'react'
import { Plus, X } from 'lucide-react'

/**
 * Disclosure list. The open row inverts to accent — the same treatment the
 * template uses — and the +/× tile flips with it.
 *
 * Uses grid-template-rows 0fr→1fr so the panel animates to its natural height
 * without measuring anything in JS.
 */
export default function Accordion({ items, defaultOpen = 0, tone = 'surface' }) {
  const [openId, setOpenId] = useState(items[defaultOpen]?.id ?? null)
  const baseId = useId()

  const closedRow =
    tone === 'ink'
      ? 'bg-ink-soft text-paper hover:bg-ink-line'
      : 'bg-surface text-ink hover:bg-surface-dim'

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-${item.id}-panel`
        const buttonId = `${baseId}-${item.id}-button`

        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-3xl transition-colors duration-400 ${
              isOpen ? 'bg-accent text-white' : closedRow
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-7"
              >
                <span className="display-tight text-lg font-semibold sm:text-[1.375rem]">
                  {item.question ?? item.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                    isOpen ? 'bg-white text-ink' : 'bg-ink text-paper'
                  }`}
                >
                  {isOpen ? <X className="h-4.5 w-4.5" /> : <Plus className="h-4.5 w-4.5" />}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-400 ease-[var(--ease-out-expo)]"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-2xl px-6 pb-7 text-[0.9375rem] leading-relaxed sm:px-7 ${
                    isOpen ? 'text-white/85' : 'text-muted'
                  }`}
                >
                  {item.answer ?? item.body}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
