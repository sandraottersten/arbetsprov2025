import { X } from "lucide-react";
import { cn } from "@client/utils";

interface Props {
  label: string;
  onDelete?: () => void;
  className?: string;
}

const Chip = ({ label, onDelete, className }: Props) => {
  return (
    <div
      role="listitem"
      className={cn(
        "inline-flex items-center gap-2 pl-3 bg-accent rounded-md text-sm group",
        className
      )}
    >
      <span className="select-none">{label}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          type="button"
          className={cn(
            "flex items-center justify-center cursor-pointer w-8 h-8 rounded-r-md",
            "focus:outline-none focus:ring-2 focus:ring-primary transition-colors",
            "group-hover:bg-primary/20"
          )}
          aria-label={`Ta bort ${label}`}
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Ta bort</span>
        </button>
      )}
    </div>
  );
};

export default Chip;
