import z from "zod";

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

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const PasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, number and special character"
      ),
  })
  // Ensure newPassword and confirmPassword match
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  // Prevent using the same current password as new
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from current password",
  });

export const profileSchema = z.object({
  avatarUrl: z.file().optional().or(z.literal("")),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  bio: z
    .string()
    .max(300, "Bio cannot exceed 300 characters")
    .optional()
    .or(z.literal("")),

  theme: z.enum(["light", "dark"], {
    error: () => ({ message: "Please select a theme" }),
  }),
});

export type SignupValues = z.infer<typeof SignupSchema>;
export type LoginValues = z.infer<typeof LoginSchema>;
export type PasswordValues = z.infer<typeof PasswordSchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
