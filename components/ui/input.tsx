"use client";
import { forwardRef, useState } from "react";
import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        className="bg-gray-100 rounded-xl w-full px-4 py-3 outline-none pr-10"
        {...props}
        type={props.type === "password" && showPassword ? "text" : props.type}
        ref={ref}
      />
      {props.type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <RiLockUnlockLine /> : <RiLockLine />}
        </button>
      )}
    </div>
  );
});

Input.displayName = "Input";
