import ContactForm from '@/components/contact/ContactForm'

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="page-content">

        {/* ── Headline ─────────────────────────────────────────────────────── */}
        <h1 className="text-text-body mb-6">
          Contact me
        </h1>

        {/* ── Intro ────────────────────────────────────────────────────────── */}
        <p className="text-text-secondary mb-12">
          Have a project in mind, a question, or just want to say hello?
          Drop me a line and I&rsquo;ll get back to you as soon as I can.
        </p>

        {/* ── Form ─────────────────────────────────────────────────────────── */}
        <ContactForm />

      </div>
    </div>
  )
}
