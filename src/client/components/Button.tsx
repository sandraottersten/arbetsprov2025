import { ComponentProps } from "react";
import { cn } from "@client/utils";

const Button = ({ className, ...props }: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "h-12 px-4 py-2 font-medium",
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "bg-primary text-white shadow-xs hover:bg-primary/90",
        className
      )}
      {...props}
    />
  );
};

export { Button };
