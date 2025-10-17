"use client";

import React, { ComponentType, useEffect } from "react";
import useStore from "@/store";
import { Spinner } from "../ui/spinner";
import Logo from "./Logo";
import { redirect } from "next/navigation";

type WrappedComponentProps = Record<string, any>;

function UserOnlyRoute<P extends WrappedComponentProps>(
  WrappedComponent: ComponentType<P>
) {
  return function (props: P) {
    const { isAuthenticated, _hasHydrated } = useStore();

    useEffect(() => {
      if (_hasHydrated && !isAuthenticated) {
        redirect("/login");
      }
    }, [isAuthenticated, _hasHydrated]);

    if (_hasHydrated && isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Spinner className="w-6 h-6" />
          <Logo size="sm" />
        </div>
      </div>
    );
  };
}

function PublicOnlyRoute<P extends WrappedComponentProps>(
  WrappedComponent: ComponentType<P>
) {
  return function (props: P) {
    const { isAuthenticated, _hasHydrated } = useStore();

    useEffect(() => {
      if (_hasHydrated && isAuthenticated) {
        redirect("/profile");
      }
    }, [isAuthenticated, _hasHydrated]);

    if (_hasHydrated && !isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Spinner className="w-6 h-6" />
          <Logo size="sm" />
        </div>
      </div>
    );
  };
}

export { UserOnlyRoute, PublicOnlyRoute };
