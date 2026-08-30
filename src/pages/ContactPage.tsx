import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/Primitives';

export function ContactPage() {
  const { show, node } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setForm({ name: '', email: '', subject: '', message: '' });
    show('Thank you — we will be in touch shortly.');
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="page-enter page-enter-active pt-20">
      <section className="py-20 md:py-28 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="label-tag mb-3">Get in Touch</p>
            <h1 className="heading-display text-5xl md:text-6xl">Contact the House</h1>
            <div className="section-divider" />
            <p className="max-w-xl mx-auto text-stone-dark mt-4">
              Our concierge is available for private appointments, bespoke enquiries, and any
              assistance you may need.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
            {/* Contact details */}
            <div className="space-y-10">
              <ContactRow
                icon={<MapPin size={20} strokeWidth={1.5} />}
                title="Maison"
                lines={['14 Rue du Faubourg', 'Paris 75008, France']}
              />
              <ContactRow
                icon={<Phone size={20} strokeWidth={1.5} />}
                title="Telephone"
                lines={['+33 1 42 00 00 00', 'Mon–Sat · 10h–19h CET']}
              />
              <ContactRow
                icon={<Mail size={20} strokeWidth={1.5} />}
                title="Concierge"
                lines={['concierge@verdellehouse.com', 'Replies within one business day']}
              />

              <div className="pt-4 border-t border-bronze/20">
                <p className="label-tag mb-4">Follow the House</p>
                <div className="flex gap-4">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label="Social link"
                      className="w-10 h-10 border border-bronze/30 flex items-center justify-center text-navy hover:bg-navy hover:text-cream-light transition-colors"
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="bg-cream-light/60 p-8 md:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Name" required>
                  <input
                    value={form.name}
                    onChange={update('name')}
                    required
                    className="w-full bg-transparent border-b border-bronze/30 py-2 outline-none focus:border-navy text-navy"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    required
                    className="w-full bg-transparent border-b border-bronze/30 py-2 outline-none focus:border-navy text-navy"
                  />
                </Field>
              </div>
              <Field label="Subject">
                <input
                  value={form.subject}
                  onChange={update('subject')}
                  className="w-full bg-transparent border-b border-bronze/30 py-2 outline-none focus:border-navy text-navy"
                />
              </Field>
              <Field label="Message" required>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  required
                  rows={5}
                  className="w-full bg-transparent border-b border-bronze/30 py-2 outline-none focus:border-navy text-navy resize-none"
                />
              </Field>
              <button type="submit" disabled={sending} className="btn-primary disabled:opacity-50">
                <span className="inline-flex items-center gap-2">
                  <Send size={15} strokeWidth={1.5} />
                  {sending ? 'Sending' : 'Send Message'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
      {node}
    </div>
  );
}

function ContactRow({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex gap-5">
      <div className="w-11 h-11 rounded-full border border-bronze/40 flex items-center justify-center text-bronze flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="label-tag mb-2">{title}</p>
        {lines.map((l) => (
          <p key={l} className="font-sans text-sm text-navy leading-relaxed">{l}</p>
        ))}
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-tag block mb-2">
        {label} {required && <span className="text-bronze">*</span>}
      </span>
      {children}
    </label>
  );
}
