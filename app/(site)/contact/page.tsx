import { client } from '@/sanity/lib/client'
import { contactPageQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import ContactForm from '@/components/contact/ContactForm'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContactPageData = Record<string, any>

export default async function ContactPage() {
  const contact: ContactPageData | null = await client.fetch(contactPageQuery).catch(() => null)

  return (
    <div className="py-20">
      <div className="page-content">

        {/* ── Headline ─────────────────────────────────────────────────────── */}
        <h1 className="text-text-body mb-6">
          {contact?.headline ? (
            <PortableText
              value={contact.headline}
              components={{
                block: { normal: ({ children }: { children: React.ReactNode }) => <>{children}</> },
                marks: {
                  highlight: ({ children }: { children: React.ReactNode }) => (
                    <span className="text-accent-pink">{children}</span>
                  ),
                },
              }}
            />
          ) : (
            'Contact me'
          )}
        </h1>

        {/* ── Intro ────────────────────────────────────────────────────────── */}
        <div className="text-text-secondary space-y-6 mb-12">
          {contact?.introParagraph ? (
            <PortableText
              value={contact.introParagraph}
              components={{
                block: { normal: ({ children }: { children: React.ReactNode }) => <p>{children}</p> },
              }}
            />
          ) : (
            <p>
              Have a project in mind, a question, or just want to say hello?
              Drop me a line and I&rsquo;ll get back to you as soon as I can.
            </p>
          )}
        </div>

        {/* ── Form ─────────────────────────────────────────────────────────── */}
        <ContactForm />

      </div>
    </div>
  )
}
