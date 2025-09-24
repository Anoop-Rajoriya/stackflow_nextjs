"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useAuthStore from "@/lib/stores/authStore";
import { Check } from "lucide-react";

const RegisterFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

type RegisterFormType = z.infer<typeof RegisterFormSchema>;

function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const { register, loading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<
    "enable" | "disable" | "successful"
  >("enable");
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormType) {
    try {
      setError(null);
      setFormState("disable");
      await register(values);
      setFormState("successful");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something wrong happen"
      );
      setFormState("enable");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        {/* Error */}
        {error && (
          <p className="text-center capitalize text-sm p-2 text-destructive-foreground bg-destructive/30 border border-destructive rounded">
            Error: {error}
          </p>
        )}

        {/* FullName */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-3">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          {/* Main Register Button */}
          <Button
            type="submit"
            disabled={loading || formState === "disable"}
            className="w-full"
          >
            {loading && formState === "disable" && "Registering..."}
            {formState === "successful" && (
              <>
                {" "}
                Registered
                <Check className="size-5" />
              </>
            )}
            {!loading && formState === "enable" && "Register"}
          </Button>

          {/* Google Register Button */}
          <Button type="button" variant="outline" className="w-full">
            Register with Google
          </Button>
        </div>
        <div className=" text-center text-sm">
          Have an account?{" "}
          <Link
            href="/login"
            className="underline-offset-4 text-primary-foreground hover:underline font-semibold"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
