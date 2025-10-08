import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

type Props = {
  className?: string;
  size?: "sm" | "lg" | "icon";
};

export function Logo({ className, size = "lg" }: Props) {
  const sizeClasses = {
    sm: "text-base",
    lg: "text-2xl",
    icon: "text-xl",
  };

  const iconSizes = {
    sm: 20,
    lg: 28,
    icon: 24,
  };

  return (
    <div
      className={cn(
        "flex items-center font-bold tracking-tight select-none",
        sizeClasses[size],
        className
      )}
    >
      {/* Icon */}
      <Flame
        className={cn("mr-2 text-orange-500", size === "icon" && "mr-0")}
        size={iconSizes[size]}
        strokeWidth={2.5}
      />

      {/* Text — hidden for icon-only mode */}
      {size !== "icon" && (
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Stack<span className="text-foreground">Flow</span>
        </span>
      )}
    </div>
  );
}
