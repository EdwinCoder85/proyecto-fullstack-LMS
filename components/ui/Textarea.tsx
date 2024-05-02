"use client";
import { forwardRef } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ children, ...props }, ref) => {
  return (
    <textarea className="bg-gray-100 rounded-xl w-full px-4 py-3 outline-none" {...props} ref={ref}>
      {children}
    </textarea>
  );
});

Textarea.displayName = "Input";
