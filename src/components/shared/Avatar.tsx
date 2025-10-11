import React from "react";
import { Avatar as A, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  src: string;
  fallback: string;
};

function Avatar({ className, src, fallback }: Props) {
  return (
    <A className={cn(className)}>
      <AvatarImage src={src} alt="avatar image" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </A>
  );
}

export default Avatar;
