import { ComponentProps } from "react";
import { cn } from "@client/utils";

interface Props extends Omit<ComponentProps<"label">, "required"> {
  required?: boolean;
  label: string;
}

const Label = ({ className, required, label, ...props }: Props) => {
  return (
    <label
      className={cn(
        "flex items-center gap-1 mb-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {label}
      {required && <span>*</span>}
    </label>
  );
};

export default Label;
