import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return <span className={`badge badge-${variant}${className ? ` ${className}` : ""}`} {...props} />;
}
