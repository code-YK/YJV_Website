import { z } from "zod";

export const SERVICE_OPTIONS = [
  "development",
  "implementation",
  "consultancy",
  "training",
  "support",
  "hire-developer",
  "not-sure",
] as const;

export const BUDGET_OPTIONS = [
  "under-2l",
  "2l-5l",
  "5l-15l",
  "15l-plus",
  "unsure",
] as const;

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[+\d\s()-]+$/, "Numbers, spaces, +, -, () only."),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Pick a service.",
  }),
  budget: z.enum(BUDGET_OPTIONS, {
    message: "Pick a budget range.",
  }),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a bit more (20+ characters).")
    .max(2000, "Keep it under 2000 characters."),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const SERVICE_LABELS: Record<(typeof SERVICE_OPTIONS)[number], string> = {
  development: "Development",
  implementation: "Implementation",
  consultancy: "Consultancy",
  training: "Training",
  support: "Support",
  "hire-developer": "Hire a Developer",
  "not-sure": "Not sure yet",
};

export const BUDGET_LABELS: Record<(typeof BUDGET_OPTIONS)[number], string> = {
  "under-2l": "Under ₹2L",
  "2l-5l": "₹2L – ₹5L",
  "5l-15l": "₹5L – ₹15L",
  "15l-plus": "₹15L+",
  unsure: "Not sure yet",
};
