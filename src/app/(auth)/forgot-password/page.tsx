"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { app } from "@/lib/env";
import {
  ForgotPasswordSchema,
  ForgotPasswordValues,
  UpdatePasswordSchema,
  UpdatePasswordValues,
} from "@/lib/FormsSchema";
import useStore from "@/store";

import Logo from "@/components/shared/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircleIcon, CheckIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormState = "initial" | "loading" | "success";

function ForgotPassword() {
  const router = useRouter();
  const params = useSearchParams();
  const { sendPasswordRecovery, ConfirmPasswordRecovery } = useStore();
  const showPasswordUpdateFrom =
    params.get("userId") && params.get("secret") ? true : false;

  const [state, setState] = useState<{
    forgotPasswordState: FormState;
    updatePasswordState: FormState;
  }>({
    forgotPasswordState: "initial",
    updatePasswordState: "initial",
  });
  const [error, setError] = useState<{
    forgotPasswordError: string | null;
    updatePasswordError: string | null;
  }>({
    forgotPasswordError: null,
    updatePasswordError: null,
  });
  const forgotPasswordForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const updatePasswordForm = useForm<UpdatePasswordValues>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSendLink(values: ForgotPasswordValues) {
    const { email } = values;
    const url = `http://${app.domain}/forgot-password`;
    try {
      setError((pre) => ({ ...pre, forgotPasswordError: null }));
      setState((pre) => ({ ...pre, forgotPasswordState: "loading" }));
      await sendPasswordRecovery({ email, url });
      setState((pre) => ({ ...pre, forgotPasswordState: "success" }));
    } catch (error) {
      setError((pre) => ({
        ...pre,
        forgotPasswordError: "Failed to send recovery link. Please try again.",
      }));
      setState((pre) => ({ ...pre, forgotPasswordState: "initial" }));
    }
  }

  async function onUpdatePassword(values: UpdatePasswordValues) {
    const { newPassword: password } = values;
    const userId = params.get("userId");
    const secret = params.get("secret");
    if (!userId || !secret) {
      setError((pre) => ({
        ...pre,
        updatePasswordError: "Something wrong please resend link",
      }));
      return;
    }

    try {
      setError((pre) => ({ ...pre, updatePasswordError: null }));
      setState((pre) => ({ ...pre, updatePasswordState: "loading" }));
      await ConfirmPasswordRecovery({ userId, secret, password });
      setState((pre) => ({ ...pre, updatePasswordState: "success" }));
      router.push("/login");
    } catch (error) {
      setError((pre) => ({
        ...pre,
        updatePasswordError: "Failed to update password. Please resend link",
      }));
      setState((pre) => ({ ...pre, updatePasswordState: "initial" }));
    }
  }

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 px-4 pt-6">
      <Logo size="lg" className="mx-auto" />
      {showPasswordUpdateFrom ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Update your password</CardTitle>
            <CardDescription className="text-center">
              Enter new Password
            </CardDescription>
            {error.updatePasswordError && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error.updatePasswordError}</AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <Form {...updatePasswordForm}>
              <form
                onSubmit={updatePasswordForm.handleSubmit(onUpdatePassword)}
                onReset={() => updatePasswordForm.reset()}
                className="space-y-4"
              >
                <FormField
                  name="newPassword"
                  control={updatePasswordForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword">
                        New Password *
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="newPassword"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={updatePasswordForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password *
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button
                    disabled={
                      state.updatePasswordState === "loading" ||
                      state.updatePasswordState === "success"
                    }
                  >
                    {state.updatePasswordState === "success" ? (
                      <>
                        <CheckIcon />
                        Password Updated
                      </>
                    ) : state.updatePasswordState === "loading" ? (
                      <>
                        <Spinner className="w-4 h-4" />
                        Updating Password
                      </>
                    ) : (
                      <>Update Password</>
                    )}
                  </Button>
                  <Button variant="outline" type="reset">
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Recover your password</CardTitle>
            <CardDescription className="text-center">
              Enter your registered email below
            </CardDescription>

            {error.forgotPasswordError && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>{error.forgotPasswordError}</AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <Form {...forgotPasswordForm}>
              <form
                onSubmit={forgotPasswordForm.handleSubmit(onSendLink)}
                className="space-y-4"
              >
                <FormField
                  name="email"
                  control={forgotPasswordForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Registered Email *</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="doe@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        After sending link check your email inbox and click
                        password recovery link to update it.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  disabled={
                    state.forgotPasswordState === "loading" ||
                    state.forgotPasswordState === "success"
                  }
                >
                  {state.forgotPasswordState === "success" ? (
                    <>
                      <CheckIcon />
                      Check Your Email
                    </>
                  ) : state.forgotPasswordState === "loading" ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      Sending Link
                    </>
                  ) : (
                    <>Send Link</>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ForgotPassword;
