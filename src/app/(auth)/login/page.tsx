"use client";
import { useAuth } from "@/zustand/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  email: z.email(),
  password: z.string().min(4).max(10),
});

type FormType = typeof FormSchema;

function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const form = useForm<z.infer<FormType>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<FormType>) {
    const { email, password } = values;

    setIsLoading(true);
    setIsError(null);

    const loginResponse = await login(email, password);

    if (!loginResponse.success) {
      setIsError(loginResponse.error!.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-xl font-bold">Welcome to Stackflow</h1>
      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </p>
      {/* Error */}
      {isError && <p className="">{isError}</p>}
      {/* Form */}
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className={"w-full"}>
            {isLoading ? "Please wait..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
