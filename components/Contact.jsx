"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";

import { contact } from "@/data/portfolio";
import { brandStyle } from "@/lib/brandColors";
import { cn } from "@/lib/utils";
import Button from "./ui/Button";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import SocialLinks from "./ui/SocialLinks";

/**
 * Submissions go to our own server route, which holds the email credentials —
 * nothing secret is shipped to the browser. See app/api/contact/route.js.
 */
const ENDPOINT = "/api/contact";

/** How long the success panel stays before the form goes quiet again. */
const SUCCESS_MS = 9000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** `company` is the honeypot: hidden from people, tempting to bots. */
const EMPTY = { name: "", email: "", message: "", company: "" };

function validate(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Tell me a little more — at least 10 characters.";
  }

  return errors;
}

function Field({ id, label, error, children, hint }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-destructive"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground/60">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const inputClasses =
  "w-full rounded-lg border border-border/80 bg-background px-4 py-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground/60 transition-colors " +
  "focus:outline-none focus:border-ring focus-visible:outline-none " +
  "aria-[invalid=true]:border-destructive";

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  /** Bumped on every delivery, so the line and dot replay each time. */
  const [sentCount, setSentCount] = useState(0);
  const reduceMotion = useReducedMotion();

  // Let the success panel settle back to the resting state on its own.
  useEffect(() => {
    if (status !== "success") return undefined;
    const id = window.setTimeout(() => setStatus("idle"), SUCCESS_MS);
    return () => window.clearTimeout(id);
  }, [status]);

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((v) => ({ ...v, [field]: value }));
    // Clear the error as soon as the visitor starts fixing it.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
    if (status !== "idle") setStatus("idle");
  };

  const submitting = status === "submitting";

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Guard against a second submit while the first is still in flight.
    if (submitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json().catch(() => ({}));
      // Success only when the email service actually accepted the message.
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? `Request failed: ${response.status}`);
      }

      setStatus("success");
      setValues(EMPTY);
      setSentCount((count) => count + 1);
    } catch (cause) {
      console.error("Contact form:", cause);
      setStatus("error");
    }
  };

  return (
    <Section id="contact" containerClassName="py-24">
      <div className="flex flex-col gap-12 relative z-10 w-full max-w-5xl mx-auto">
        <SectionHeading
          index="07"
          label="Contact"
          title="Let's Work Together"
          description="Have a product that needs designing, or a design that needs building? I'd like to hear about it."
          titleClassName="text-3xl md:text-4xl"
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Details */}
          <Reveal x={-20} y={0} className="w-full lg:w-[38%] shrink-0">
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="group relative flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card hover:border-border hover:shadow-md transition-all duration-300"
              >
                {/* A message just landed in this inbox. */}
                <AnimatePresence>
                  {sentCount > 0 && status === "success" ? (
                    <motion.span
                      key={sentCount}
                      aria-hidden="true"
                      className="absolute right-4 top-4 flex h-2.5 w-2.5"
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {!reduceMotion ? (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-live)] opacity-70" />
                      ) : null}
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-live)]" />
                    </motion.span>
                  ) : null}
                </AnimatePresence>

                <span className="w-12 h-12 rounded-xl bg-muted/40 text-muted-foreground group-hover:bg-primary/10 transition-colors flex items-center justify-center shrink-0">
                  <Mail
                    className="brand-icon w-5 h-5"
                    style={brandStyle("email")}
                    aria-hidden="true"
                  />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    Email
                  </span>
                  <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {contact.email}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${contact.phoneHref}`}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card hover:border-border hover:shadow-md transition-all duration-300"
              >
                <span className="w-12 h-12 rounded-xl bg-muted/40 text-muted-foreground group-hover:bg-primary/10 transition-colors flex items-center justify-center shrink-0">
                  <Phone
                    className="brand-icon w-5 h-5"
                    style={brandStyle("live")}
                    aria-hidden="true"
                  />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    Phone
                  </span>
                  <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {contact.phone}
                  </span>
                </span>
              </a>

              <div className="p-5 rounded-2xl border border-border/80 bg-card">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4">
                  Elsewhere
                </p>
                <SocialLinks exclude={["email"]} />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal x={20} y={0} delay={0.1} className="w-full lg:flex-1">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative h-full flex flex-col gap-5 p-6 md:p-8 rounded-2xl border border-border/80 bg-card shadow-sm overflow-hidden"
            >
              {/* The side line traces down the card as the message goes out. */}
              <AnimatePresence>
                {sentCount > 0 && status === "success" ? (
                  <motion.span
                    key={sentCount}
                    aria-hidden="true"
                    className="absolute left-0 inset-y-6 w-px origin-top bg-linear-to-b from-transparent via-[var(--brand-live)] to-transparent"
                    initial={reduceMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
                    animate={
                      reduceMotion
                        ? { opacity: 0.5 }
                        : { scaleY: 1, opacity: [0, 1, 0.45] }
                    }
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0.2 : 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="name" label="Name" error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={update("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClasses}
                  />
                </Field>

                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={update("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClasses}
                  />
                </Field>
              </div>

              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="What are you working on?"
                  value={values.message}
                  onChange={update("message")}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(inputClasses, "resize-y min-h-32")}
                />
              </Field>

              {/* Honeypot: hidden from people and from the tab order; bots fill it in. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={update("company")}
                />
              </div>

              <AnimatePresence>
                {status === "success" ? (
                  <motion.div
                    key="sent"
                    className="flex items-start gap-3 rounded-xl border border-[var(--brand-live)]/30 bg-[var(--brand-live)]/10 px-4 py-3"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      className="shrink-0 text-[var(--brand-live)]"
                      initial={reduceMotion ? false : { scale: 0.4, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.1 }}
                    >
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">
                        Message Sent Successfully! ✓
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Thanks for reaching out. I&apos;ll get back to you soon.
                      </span>
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-auto pt-2">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="group"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Button>

                {/* Status is announced to screen readers as it changes. */}
                <p
                  role="status"
                  aria-live="polite"
                  className="text-xs leading-relaxed"
                >
                  {status === "success" ? (
                    <span className="sr-only">
                      Message sent successfully. Thanks for reaching out. I&apos;ll
                      get back to you soon.
                    </span>
                  ) : status === "error" ? (
                    <span className="flex items-center gap-1.5 text-destructive">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      Something went wrong. Please try again.
                    </span>
                  ) : (
                    <span className="text-muted-foreground/60">
                      I usually reply within a couple of days.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
