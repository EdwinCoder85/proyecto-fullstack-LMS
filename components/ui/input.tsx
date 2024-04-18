import { FC, forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "@/libs/utils";

import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";

// Extendemos las propiedades de InputHTMLAttributes para incluir el atributo "name"
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "password";
  placeholder: string;
  className?: string;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function Input({ type, placeholder, className, ...rest }, ref) {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full relative mb-5">
        <input
          ref={ref}
          type={type === "text" ? "text" : showPassword ? "text" : "password"}
          className={cn(
            "bg-gray-100 w-full py-3 pl-4 pr-12 outline-none rounded-xl",
            className
          )}
          placeholder={placeholder}
          {...rest} // Pasamos el resto de las props al input
        />
        {type === "password" && (
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
  }
);

Input.displayName = 'Input';

export default Input;
