import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        small: "text-xs",
        medium: "text-sm",
        large: "text-lg",
        title: "text-3xl",
        subtitle: "text-2xl mb-2",
      },
      color: {
        default: "text-colorPrimary",
        colorSecondary: "text-colorSecondary",
        alert: "text-red-500"
      },
    },
    defaultVariants: {
      size: "medium",
      color: "default",
    },
  }
);

const Label = React.forwardRef(({ className, size, color, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size, color }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
