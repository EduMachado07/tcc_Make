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
        base: "max-sm:text-base text-lg",
        large: "text-lg",
        subtitle: "max-sm:text-2xl text-4xl mb-2",
        title: "text-3xl font-bold capitalize",
        titleLg: "text-4xl font-bold capitalize",
        largeTitle: "text-5xl max-sm:text-4xl font-bold",
      },
      color: {
        default: "text-colorPrimary",
        colorSecondary: "text-colorSecondary",
        colorText: "text-colorText",
        colorText_Bold: "text-colorText_Bold",
        alert: "text-red-500",
        white: "text-zinc-50",
      },
    },
    defaultVariants: {
      size: "medium",
      color: "default",
    },
  }
);

const Label = React.forwardRef(
  ({ className, size, color, style, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ size, color }), className)}
      {...props}
    />
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
