"use client";

import { cloneElement, isValidElement, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  ContactFormSchema,
  type ContactFormData,
  SERVICE_OPTIONS,
  SERVICE_LABELS,
  BUDGET_OPTIONS,
  BUDGET_LABELS,
} from "@/lib/schemas/contact";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: undefined,
      budget: undefined,
      description: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: { _form?: string[] };
      };
      if (!res.ok || !body.ok) {
        setStatus("error");
        setErrorMessage(
          body.errors?._form?.[0] ??
            "We couldn't submit your message. Please try again, or email info@yjventures.in directly.",
        );
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error. Please try again, or email info@yjventures.in directly.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-full flex-col items-center justify-center rounded-2xl border border-[var(--accent-blue)]/40 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.08))] p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-[var(--accent-blue)]" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-semibold text-yj-on-surface">
          Got it. We&rsquo;ll reply within one business day.
        </h2>
        <p className="mt-3 max-w-sm text-sm text-[var(--text-muted)]">
          Check your spam folder just in case, we send from{" "}
          <span className="text-yj-on-surface">info@yjventures.in</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-[var(--accent-blue)] hover:text-yj-on-surface"
        >
          Send another message →
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={submitting}
      className="space-y-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 p-6 backdrop-blur md:p-8"
    >
      <div role="status" aria-live="polite" className="sr-only">
        {submitting
          ? "Sending your message"
          : status === "error"
            ? `Error: ${errorMessage}`
            : ""}
      </div>

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
          <div className="flex-1">
            <p>{errorMessage}</p>
            <p className="mt-2 text-xs text-red-200/80">
              You can also email us directly at{" "}
              <a
                href="mailto:info@yjventures.in"
                className="underline decoration-red-300/60 underline-offset-2 hover:text-red-100"
              >
                info@yjventures.in
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <fieldset disabled={submitting} className="contents">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Name"
          htmlFor="name"
          error={errors.name?.message}
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputCls(!!errors.name)}
            {...register("name")}
          />
        </Field>
        <Field
          label="Company"
          htmlFor="company"
          optional
          error={errors.company?.message}
        >
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className={inputCls(!!errors.company)}
            {...register("company")}
          />
        </Field>
        <Field
          label="Email"
          htmlFor="email"
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputCls(!!errors.email)}
            {...register("email")}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor="phone"
          error={errors.phone?.message}
        >
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputCls(!!errors.phone)}
            {...register("phone")}
          />
        </Field>
        <Field
          label="Service"
          htmlFor="service"
          error={errors.service?.message}
        >
          <select
            id="service"
            defaultValue=""
            className={inputCls(!!errors.service)}
            {...register("service")}
          >
            <option value="" disabled>
              Pick a service…
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {SERVICE_LABELS[opt]}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Budget"
          htmlFor="budget"
          error={errors.budget?.message}
        >
          <select
            id="budget"
            defaultValue=""
            className={inputCls(!!errors.budget)}
            {...register("budget")}
          >
            <option value="" disabled>
              Pick a range…
            </option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {BUDGET_LABELS[opt]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Tell us about your project"
        htmlFor="description"
        error={errors.description?.message}
      >
        <textarea
          id="description"
          rows={5}
          className={cn(inputCls(!!errors.description), "resize-y")}
          placeholder="What are you trying to ship? Who's it for? Timeline?"
          {...register("description")}
        />
      </Field>

      <Button
        type="submit"
        variant="primary"
        disabled={submitting}
        className="w-full md:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
      </fieldset>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full min-h-11 rounded-lg border bg-black/40 px-4 py-2.5 text-sm text-yj-on-surface placeholder:text-[var(--text-muted)] transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-offset-2 focus:ring-offset-black",
    hasError
      ? "border-red-500/60"
      : "border-[var(--border-subtle)] focus:border-[var(--accent-blue)]",
  );
}

function Field({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  const childWithAria =
    isValidElement(children)
      ? cloneElement(
          children as React.ReactElement<{
            "aria-invalid"?: boolean;
            "aria-describedby"?: string;
          }>,
          {
            "aria-invalid": !!error || undefined,
            "aria-describedby": error ? errorId : undefined,
          },
        )
      : children;

  return (
    <div className="group transition-transform duration-200 focus-within:scale-[1.005]">
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-2 text-sm font-medium text-yj-on-surface transition-colors duration-200 group-focus-within:text-[var(--accent-blue)]"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-[var(--text-muted)]">
            (optional)
          </span>
        )}
      </label>
      {childWithAria}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
