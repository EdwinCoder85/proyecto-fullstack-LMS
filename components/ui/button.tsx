import { FC, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/libs/utils";

interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit";
  label?: string;
  className?: string;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ type, label, className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "w-full bg-primary text-white py-3 px-4 rounded-xl border-2 border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-colors duration-300",
          className
        )}
        {...rest} 
      >
        {label}
      </button>
    );
  }
);

export default Button;
