"use client";

import { useState } from "react";
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
 * Where the form posts.
 *
 * Set NEXT_PUBLIC_FORM_ENDPOINT in .env.local (or in the Vercel dashboard) to
 * a Formspree / Resend / custom API route URL and submissions are POSTed there
 * as JSON. With nothing configured the form falls back to opening the
 * visitor's mail client with everything pre-filled, so it is never a dead end.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY = { name: "", email: "", message: "" };

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

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((v) => ({ ...v, [field]: value }));
    // Clear the error as soon as the visitor starts fixing it.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(
        `Portfolio enquiry from ${values.name.trim()}`,
      );
      const body = encodeURIComponent(
        `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`,
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setValues(EMPTY);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

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
                className="group flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card hover:border-border hover:shadow-md transition-all duration-300"
              >
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
                <SocialLinks />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal x={20} y={0} delay={0.1} className="w-full lg:flex-1">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="h-full flex flex-col gap-5 p-6 md:p-8 rounded-2xl border border-border/80 bg-card shadow-sm"
            >
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

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-auto pt-2">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="group"
                  disabled={submitting}
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
                    <span className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      Thanks — your message is on its way.
                    </span>
                  ) : status === "error" ? (
                    <span className="flex items-center gap-1.5 text-destructive">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      Something went wrong. Email {contact.email} instead?
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
