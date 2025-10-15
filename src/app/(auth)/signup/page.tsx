"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupValues, SignupSchema } from "@/lib/FormsSchema";

import Logo from "@/components/shared/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AlertCircleIcon, CheckIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

function Signup() {
  const [state, setState] = useState<"initial" | "loading" | "success">(
    "initial"
  );
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignupValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSignup(values: SignupValues) {}

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 px-4 pt-6">
      <Logo size="lg" className="mx-auto" />
      <Card className="">
        <CardHeader>
          <CardTitle className="text-center">Create your account</CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Enter your email below to create your account
          </CardDescription>
          {error && (
            <Alert variant={"destructive"}>
              <AlertCircleIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignup)} className="space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name *</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="jhon doe" {...field} />
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
                        placeholder="jhon@gmail.com"
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
              <div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={state === "loading" || state === "success"}
                  >
                    {state === "loading" ? (
                      <>
                        <Spinner className="w-6 h-6 mr-2" />
                        Creating Account
                      </>
                    ) : state === "success" ? (
                      <>
                        <CheckIcon />
                        Successfully Created
                      </>
                    ) : (
                      <>Create Account</>
                    )}
                  </Button>
                  <Button onClick={() => form.reset()} type="button">
                    Cancel
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mt-3 text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="underline hover:text-foreground"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
