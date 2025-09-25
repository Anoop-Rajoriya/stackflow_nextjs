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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useAuthStore from "@/lib/stores/authStore";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
  const { login, loading } = useAuthStore();
  const [formState, setFormState] = useState<
    "enable" | "disable" | "successful"
  >("enable");
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormType) {
    try {
      setError(null);
      setFormState("disable");
      await login(values);
      setFormState("successful");
      router.push("/");
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
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input placeholder="Enter password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={loading || formState === "disable"}
            className="w-full"
          >
            {loading && formState === "disable" && "Login..."}
            {formState === "successful" && (
              <>
                Logged In
                <Check className="size-5" />
              </>
            )}
            {!loading && formState === "enable" && "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="underline-offset-4 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
