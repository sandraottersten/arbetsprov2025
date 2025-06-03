import { ComponentProps } from "react";
import { cn } from "@client/utils";

interface Props extends ComponentProps<"button"> {
  text: string;
}

const Button = ({ className, text, ...props }: Props) => {
  return (
    <button
      className={cn(
        "h-12 px-4 py-2 font-medium",
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:underline focus-visible:border-primary/40 focus-visible:ring-primary/40 focus-visible:ring-[3px] aria-invalid:ring-error aria-invalid:border-error",
        "bg-primary text-white shadow-xs hover:bg-primary/90 hover:cursor-pointer",
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
