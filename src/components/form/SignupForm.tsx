"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupValues } from "@/lib/zodSchemas";

import { Logo } from "../shared/Logo";
import { AlertCircleIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

function SignupForm() {
  const [status, setStatus] = useState<"initial" | "loading" | "success">();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignupValues>({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = async (values: SignupValues) => {};

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <Logo size="sm" />
        <CardTitle>Sign up your account</CardTitle>
        <CardDescription>
          Create your StackFlow account to start asking and answering questions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="text-sm">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle className="font-semibold">Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* OAuth section (optional) */}
        <div id="OAuth" className="flex flex-col gap-2">
          <Button type="button" variant="outline">
            Continue with Google
          </Button>
          <Button type="button" variant="outline">
            Continue with GitHub
          </Button>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name *</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="jhone doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email *</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="something@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password *</FormLabel>
                  <FormControl>
                    <Input id="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-3">
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
              >
                {/* {status ? "Signing up..." : "Sign Up"} */}
                Sign Up
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignupForm;
