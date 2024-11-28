import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-2 text-slate-100 hover:bg-slate-100 hover:text-colorPrimary font-semibold",
        noneOutline:
          "border-colorPrimary border-2 text-slate-100 hover:bg-slate-100 hover:text-colorPrimary",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "sm:hover:bg-accent sm:hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",
        primary:
          "font-medium rounded-md shadow-lg transition duration-150 ease-in delay-50 bg-colorPrimary text-blue-50 disabled:bg-gray-300 disabled:text-slate-500 hover:bg-colorPrimary_Shadow",
      },
      size: {
        default: "h-9 px-5 py-3 mb-1",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        link: "py-2 px-1 text-sm",
      },
      color: {
        default: "text-colorPrimary",
        secondary: "text-colorSecondary",
        outline: "border-colorPrimary",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, color, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
