import { useRef, useState, useCallback, KeyboardEvent, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useOnClickOutside } from "@client/hooks/useOnClickOutside";
import { cn } from "@client/utils";

interface SelectOption<T = string> {
  value: T;
  label: string;
}

interface Props<T = string> {
  options: SelectOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  id?: string;
  error?: string;
  selectedOptions?: T[];
  disabled?: boolean;
}

const Select = <T = string,>({
  options,
  value,
  onChange,
  placeholder,
  id = "select",
  error,
  selectedOptions = [],
  disabled = false,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(
    () => options.filter((option) => !selectedOptions.includes(option.value)),
    [options, selectedOptions]
  );

  const selectedOption = options.find((option) => option.value === value);
  const availableOptions = filteredOptions;
  const selectedFilteredIndex = availableOptions.findIndex(
    (option: SelectOption<T>) => option.value === value
  );

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  useOnClickOutside(selectRef, closeDropdown);

  const handleSelect = useCallback(
    (option: SelectOption<T>) => {
      onChange(option.value);
      closeDropdown();
    },
    [onChange, closeDropdown]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement | HTMLUListElement>) => {
      const options = availableOptions;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(
              selectedFilteredIndex !== -1 ? selectedFilteredIndex : 0
            );
          } else {
            setHighlightedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : 0
            );
          }
          break;

        case "ArrowUp":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(
              selectedFilteredIndex !== -1
                ? selectedFilteredIndex
                : options.length - 1
            );
          } else {
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : options.length - 1
            );
          }
          break;

        case "Enter":
        case " ":
          event.preventDefault();
          if (isOpen && highlightedIndex !== -1) {
            handleSelect(options[highlightedIndex]);
          } else if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(
              selectedFilteredIndex !== -1 ? selectedFilteredIndex : 0
            );
          }
          break;

        case "Escape":
          event.preventDefault();
          closeDropdown();
          break;

        case "Tab":
          if (isOpen) {
            closeDropdown();
          }
          break;
      }
    },
    [
      isOpen,
      availableOptions,
      selectedFilteredIndex,
      highlightedIndex,
      handleSelect,
      closeDropdown,
    ]
  );

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative w-full px-4 h-12 text-left bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200",
          error ? "border-error focus:ring-error" : "focus:ring-primary",
          isOpen
            ? "border-primary ring-2 ring-primary"
            : "border-gray focus:border-primary",
          disabled ? "opacity-50 cursor-not-allowed bg-gray/20" : ""
        )}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray transition-transform duration-200",
              isOpen && "transform rotate-180"
            )}
          />
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          className="absolute z-10 w-full mt-1 bg-white border border-gray rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
        >
          {availableOptions.map((option: SelectOption<T>, index: number) => (
            <li
              key={`${option.label}-${index}`}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option)}
              className={cn(
                "px-4 py-2 select-none outline-none cursor-pointer",
                index === highlightedIndex
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-primary/10 hover:text-primary"
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
