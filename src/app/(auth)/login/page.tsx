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
import { LoginValues, LoginSchema } from "@/lib/FormsSchema";

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
import { useRouter } from "next/navigation";
import useStore from "@/store";
import { PublicOnlyRoute } from "@/components/shared/RouteProvider";

function Login() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { login } = useStore();

  const [state, setState] = useState<"initial" | "loading" | "success">(
    "initial"
  );
  const [error, setError] = useState<string | null>(null);

  async function onLogin(values: LoginValues) {
    const { email, password } = values;
    try {
      setError(null);
      setState("loading");
      await login({ email, password });
      setState("success");
      router.push("/");
    } catch (error) {
      setState("initial");
      setError(
        error instanceof Error
          ? error.message
          : "Something wrong please try again"
      );
    }
  }

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 px-4 pt-6">
      <Logo size="lg" className="mx-auto" />
      <Card className="">
        <CardHeader>
          <CardTitle className="text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            Login with your Email and password
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
            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
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
                    <FormLabel
                      htmlFor="password"
                      className="flex justify-between"
                    >
                      Password *
                      <Link
                        href={"/forgot-password"}
                        className="text-sm hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </FormLabel>
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
                        Loging Account
                      </>
                    ) : state === "success" ? (
                      <>
                        <CheckIcon />
                        Successfully Logged
                      </>
                    ) : (
                      <>Login</>
                    )}
                  </Button>
                  <Button onClick={() => form.reset()} type="button">
                    Cancel
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mt-3 text-center">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="underline hover:text-foreground"
                  >
                    Sign up
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

export default PublicOnlyRoute(Login);
