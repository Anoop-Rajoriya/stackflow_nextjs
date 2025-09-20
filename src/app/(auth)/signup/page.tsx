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
import { GalleryVerticalEnd } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(4).max(20),
  email: z.email(),
  password: z.string().min(4).max(10),
});

type FormType = typeof FormSchema;

function Signup() {
  const { signup, login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const form = useForm<z.infer<FormType>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<FormType>) {
    const { name, email, password } = values;

    setIsLoading(true);
    setIsError(null);

    const signupResponse = await signup(name, email, password);

    if (!signupResponse.success) {
      if (signupResponse.error) {
        setIsError(signupResponse.error.message);
      } else {
        setIsError("Something want wrong");
      }
      setIsLoading(false);
      return;
    }

    const loginResponse = await login(email, password);

    if (!loginResponse.success) {
      if (loginResponse.error) {
        setIsError(loginResponse.error.message);
      } else {
        setIsError("Something want wrong");
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col items-center gap-2">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <span className="sr-only">Stackflow</span>
        </a>
        <h1 className="text-xl font-bold">Welcome to Stackflow</h1>
        <p className="text-center text-sm">
          Have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Login
          </a>
        </p>
      </div>
      {/* Form */}
      <Form {...form}>
        {/* Error */}
        {isError && (
          <p className="text-center text-sm text-red-400">{isError}</p>
        )}
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isLoading ? "Please wait..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Signup;
