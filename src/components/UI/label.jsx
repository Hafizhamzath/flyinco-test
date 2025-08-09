import React, { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils"; // adjust path if needed

// Simple variant utility without TypeScript
const labelVariants = () =>
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const Label = forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

Label.displayName = "Label";

export { Label };
