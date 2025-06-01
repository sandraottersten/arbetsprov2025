import { forwardRef } from "react";
import { cn } from "@client/utils";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "@client/types/form";

type Props = {
  type: "text" | "email";
  id: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  className?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type, id, name, register }, ref) => {
    const { ref: inputRef, ...registerProps } = register(name);

    return (
      <input
        {...registerProps}
        type={type}
        id={id}
        className={cn(
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-gray flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-[2px]",
          "aria-invalid:ring-error aria-invalid:border-error",
          className
        )}
        ref={(e) => {
          inputRef(e);
          if (ref) {
            if (typeof ref === "function") ref(e);
            else ref.current = e;
          }
        }}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
