import React from "react";
import { X } from "lucide-react";
import { cn } from "@client/utils";

interface ChipProps {
  label: string;
  onDelete?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ label, onDelete, className = "" }) => {
  return (
    <div
      role="listitem"
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 bg-accent rounded-full text-sm group",
        className
      )}
    >
      <span className="select-none">{label}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          type="button"
          className="
            flex items-center justify-center cursor-pointer
            w-5 h-5 rounded-full
            hover:bg-gray-200 
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
            transition-colors
          "
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
