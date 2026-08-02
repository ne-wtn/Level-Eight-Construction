import { useId, useRef, useState } from 'react'
import { AlertCircle, Check, ChevronDown, Loader2 } from 'lucide-react'
import { services } from '../../data/services'
import Button from '../../components/ui/Button'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

const EMPTY = { name: '', email: '', phone: '', service: '', message: '' }

/**
 * Field-level rules. Phone is optional, but validated when supplied — the
 * international formats Tanzanian clients use (+255…, 07…) all pass.
 */
const validators = {
  name: (v) =>
    !v.trim() ? 'Please tell us your name.' : v.trim().length < 2 ? 'That name looks too short.' : '',
  email: (v) =>
    !v.trim()
      ? 'We need an email address to reply to.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? 'That email address does not look right.'
        : '',
  phone: (v) =>
    !v.trim() ? '' : !/^[+()\d][\d\s()-]{6,19}$/.test(v.trim()) ? 'That phone number does not look right.' : '',
  service: (v) => (!v ? 'Choose the service closest to your project.' : ''),
  message: (v) =>
    !v.trim()
      ? 'A sentence or two about the project is enough.'
      : v.trim().length < 15
        ? 'Please add a little more detail — at least 15 characters.'
        : '',
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const formId = useId()
  const honeypotRef = useRef(null)
  const summaryRef = useRef(null)

  const setField = (field) => (event) => {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    // Only re-validate live once a field has been blurred, so we aren't
    // shouting at someone halfway through typing their email.
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }))
    }
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validators[field](values[field]) }))
  }

  const validateAll = () => {
    const next = {}
    for (const field of Object.keys(validators)) {
      next[field] = validators[field](values[field])
    }
    setErrors(next)
    setTouched(Object.fromEntries(Object.keys(validators).map((f) => [f, true])))
    return Object.values(next).every((error) => !error)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Bots fill hidden fields; humans never see this one.
    if (honeypotRef.current?.value) return

    if (!validateAll()) {
      summaryRef.current?.focus()
      return
    }

    setStatus('submitting')

    try {
      if (ENDPOINT) {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      } else {
        // No endpoint configured — the site stays demoable without a backend.
        // Set VITE_CONTACT_ENDPOINT to send this for real. See README.
        console.info('[contact] No VITE_CONTACT_ENDPOINT set. Payload:', values)
        await new Promise((resolve) => setTimeout(resolve, 900))
      }

      setStatus('success')
      setValues(EMPTY)
      setTouched({})
      setErrors({})
    } catch (error) {
      console.error('[contact] Submission failed:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[1.75rem] bg-ink p-8 text-paper sm:p-10" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent">
          <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
        </span>
        <h3 className="display-tight mt-6 text-2xl font-semibold sm:text-3xl">
          Message received.
        </h3>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-dark">
          Thank you — our team will follow up to discuss scope, timeline and next steps.
          The initial consultation is free.
        </p>
        <Button
          variant="ghostDark"
          className="mt-8"
          arrow={false}
          onClick={() => setStatus('idle')}
        >
          Send another message
        </Button>
      </div>
    )
  }

  const invalidFields = Object.entries(errors).filter(([, message]) => message)

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] bg-surface p-6 sm:p-9"
      aria-describedby={`${formId}-summary`}
    >
      <div
        id={`${formId}-summary`}
        ref={summaryRef}
        tabIndex={-1}
        aria-live="polite"
        className="outline-none"
      >
        {invalidFields.length > 0 && (
          <p className="mb-6 flex items-start gap-2.5 rounded-2xl bg-accent-tint p-4 text-sm text-accent-dark">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Please check {invalidFields.length}{' '}
              {invalidFields.length === 1 ? 'field' : 'fields'} below before sending.
            </span>
          </p>
        )}

        {status === 'error' && (
          <p className="mb-6 flex items-start gap-2.5 rounded-2xl bg-accent-tint p-4 text-sm text-accent-dark">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Something went wrong sending that. Please try again, or email us directly.
            </span>
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          value={values.name}
          error={errors.name}
          onChange={setField('name')}
          onBlur={handleBlur('name')}
          autoComplete="name"
          placeholder="Your full name"
          required
        />
        <Field
          id={`${formId}-email`}
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={setField('email')}
          onBlur={handleBlur('email')}
          autoComplete="email"
          placeholder="you@company.co.tz"
          required
        />
        <Field
          id={`${formId}-phone`}
          label="Phone"
          type="tel"
          optional
          value={values.phone}
          error={errors.phone}
          onChange={setField('phone')}
          onBlur={handleBlur('phone')}
          autoComplete="tel"
          placeholder="+255 000 000 000"
        />
        <Field
          id={`${formId}-service`}
          label="Service interest"
          as="select"
          value={values.service}
          error={errors.service}
          onChange={setField('service')}
          onBlur={handleBlur('service')}
          required
        >
          <option value="">Select a service…</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </Field>
        <Field
          id={`${formId}-message`}
          label="Message"
          as="textarea"
          rows={5}
          className="sm:col-span-2"
          value={values.message}
          error={errors.message}
          onChange={setField('message')}
          onBlur={handleBlur('message')}
          placeholder="Tell us about the project — type of build, location, and roughly when you'd like to start."
          required
        />
      </div>

      {/* Honeypot: off-screen and hidden from assistive tech, never focusable. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-company`}>Company (leave blank)</label>
        <input id={`${formId}-company`} ref={honeypotRef} tabIndex={-1} autoComplete="off" />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        disabled={status === 'submitting'}
        arrow={status !== 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </Button>

      <p className="mt-4 text-center text-xs text-muted">
        We reply to every enquiry. Your details are only used to respond to this message.
      </p>
    </form>
  )
}

/** One labelled control, wired to its own error message. */
function Field({
  id,
  label,
  as = 'input',
  error,
  optional,
  className = '',
  children,
  ...props
}) {
  const Tag = as
  const errorId = `${id}-error`
  const invalid = Boolean(error)

  const control =
    'w-full rounded-2xl border bg-paper px-4 py-3.5 text-[0.9375rem] text-ink ' +
    'placeholder:text-muted/60 transition-colors duration-200 ' +
    (invalid ? 'border-accent' : 'border-line hover:border-muted/50 focus:border-ink')

  return (
    <div className={className}>
      <label htmlFor={id} className="label mb-2.5 flex items-baseline gap-2 text-muted">
        {label}
        {optional && <span className="normal-case opacity-60">(optional)</span>}
      </label>

      {/* The select drops the native arrow so it matches the inputs, so it has
          to draw its own — without one it doesn't read as a dropdown at all. */}
      <div className={as === 'select' ? 'relative' : undefined}>
        <Tag
          id={id}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          className={`${control} ${as === 'textarea' ? 'resize-y' : ''} ${
            as === 'select' ? 'cursor-pointer appearance-none pr-11' : ''
          }`}
          {...props}
        >
          {children}
        </Tag>
        {as === 'select' && (
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted"
          />
        )}
      </div>

      {invalid && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-xs text-accent-dark">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
