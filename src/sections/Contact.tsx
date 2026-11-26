import { type FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  PenLine,
  Send,
  User,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { SectionTitle } from '../components/SectionTitle';
import { PROFILE } from '../data/profile';

interface ContactProps {
  onActionSound?: () => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export function Contact({ onActionSound }: ContactProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.subject.trim().length < 3) {
      nextErrors.subject = 'Please add a short subject for your inquiry.';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Please share a brief message (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onActionSound?.();
    setSubmitStatus(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const emailJsConfigured =
        Boolean(EMAILJS_SERVICE_ID) &&
        Boolean(EMAILJS_TEMPLATE_ID) &&
        Boolean(EMAILJS_PUBLIC_KEY);

      if (emailJsConfigured) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          EMAILJS_PUBLIC_KEY
        );
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent. I will get back to you soon.',
        });
      } else {
        const body = `${form.message}\n\n— ${form.name} (${form.email})`;
        window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
          form.subject
        )}&body=${encodeURIComponent(body)}`;
        setSubmitStatus({
          type: 'success',
          message:
            'Your email app should open with the message ready to send. If it does not, write to me directly at ' +
            PROFILE.email +
            '.',
        });
      }

      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setSubmitStatus({
        type: 'error',
        message:
          'Unable to send your message right now. Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          number="07"
          kicker="Contact"
          icon={MessageSquare}
          title="Have a Project in Mind? Let's Build Something Amazing."
          subtitle="Whether you are looking for a frontend specialist, React developer, or UI collaborator, I would love to hear from you."
        />

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl glass-card glass-hover p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-inset text-[#FB7185]">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[#D2B6BE]">Email Contact</p>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-display text-base font-semibold text-[#FB7185] transition-colors hover:text-[#F8FAFC]"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="rounded-2xl glass-card glass-hover p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-inset text-[#FDA4AF]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[#D2B6BE]">Location</p>
                  <p className="font-display text-base font-semibold text-[#F8FAFC]">
                    {PROFILE.location}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="rounded-2xl glass-card p-6"
            >
              <p className="font-display text-sm font-semibold text-[#FB7185]">
                Connect Online
              </p>
              <p className="mt-1 text-xs text-[#D2B6BE]">Find me on these platforms.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {PROFILE.socialLinks
                  .filter((s) => s.id !== 'email')
                  .map((social) => {
                    const Icon = social.id === 'github' ? Github : Linkedin;
                    return (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-inset inline-flex min-h-[40px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-[#FB7185] transition-colors hover:border-[#FB7185] hover:bg-[#9F1239]/25"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{social.label}</span>
                      </a>
                    );
                  })}
              </div>
            </motion.div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            noValidate
            className="relative overflow-hidden rounded-2xl glass-card p-6 sm:p-8 lg:col-span-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#9F1239]/25 blur-3xl"
            />

            <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-medium text-[#FB7185]"
                >
                  Name
                </label>
                <div className="relative">
                <User className="pointer-events-none absolute left-4 h-4 w-4 text-[#FB7185] top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name"
                  className="glass-inset w-full rounded-xl py-3 pr-4 pl-11 text-sm text-[#F8FAFC] placeholder-[#D2B6BE]/60 transition-all focus:border-[#FB7185] focus:ring-2 focus:ring-[#BE123C]/40 focus:outline-none"
                />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-[#FDA4AF]">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-medium text-[#FB7185]"
                >
                  Email
                </label>
                <div className="relative">
                <Mail className="pointer-events-none absolute left-4 h-4 w-4 text-[#FB7185] top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="glass-inset w-full rounded-xl py-3 pr-4 pl-11 text-sm text-[#F8FAFC] placeholder-[#D2B6BE]/60 transition-all focus:border-[#FB7185] focus:ring-2 focus:ring-[#BE123C]/40 focus:outline-none"
                />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-[#FDA4AF]">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="relative mt-5">
              <label
                htmlFor="contact-subject"
                className="mb-1.5 block text-xs font-medium text-[#FB7185]"
              >
                Subject
              </label>
              <div className="relative">
                <PenLine className="pointer-events-none absolute left-4 h-4 w-4 text-[#FB7185] top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                id="contact-subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                placeholder="React project, frontend role, or UI collaboration"
                className="glass-inset w-full rounded-xl py-3 pr-4 pl-11 text-sm text-[#F8FAFC] placeholder-[#D2B6BE]/60 transition-all focus:border-[#FB7185] focus:ring-2 focus:ring-[#BE123C]/40 focus:outline-none"
              />
                </div>
              {errors.subject && (
                <p className="mt-1.5 text-xs text-[#FDA4AF]">{errors.subject}</p>
              )}
            </div>

            <div className="relative mt-5">
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-medium text-[#FB7185]"
              >
                Message
              </label>
              <div className="relative">
                <MessageSquare className="pointer-events-none absolute left-4 h-4 w-4 text-[#FB7185] top-4" aria-hidden="true" />
                <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about your frontend goals, timeline, or how we can collaborate..."
                className="w-full resize-y rounded-xl glass-inset px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#D2B6BE]/60 transition-all focus:border-[#BE123C] focus:ring-2 focus:ring-[#BE123C]/30 focus:outline-none"
              />
                </div>
              {errors.message && (
                <p className="mt-1.5 text-xs text-[#FDA4AF]">{errors.message}</p>
              )}
            </div>

            {submitStatus && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-5 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs sm:text-sm ${
                  submitStatus.type === 'success'
                    ? 'border-[#BE123C]/50 bg-[#9F1239]/25 text-[#F8FAFC]'
                    : 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                }`}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#FB7185]"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-rose-400"
                    aria-hidden="true"
                  />
                )}
                <span>{submitStatus.message}</span>
              </div>
            )}

            <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#D2B6BE]">
                Typically responds within 24–48 hours.
              </span>

              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] px-6 py-2.5 text-sm font-semibold text-[#F8FAFC] shadow-[0_0_24px_rgba(159,18,57,0.4)] transition-all hover:brightness-115 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </MagneticButton>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
