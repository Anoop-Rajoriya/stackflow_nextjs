import z, { refine } from "zod";

/**
 * Password rules:
 * - at least 8 chars
 * - at least one lowercase, one uppercase, one digit, one special char
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export const SignupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});

export type SignupValues = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

export const UpdatePasswordSchema = z
  .object({
    newPassword: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"],
  });
export type UpdatePasswordValues = z.infer<typeof UpdatePasswordSchema>;
