import { useRef, useState, useCallback, KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { useOnClickOutside } from "@client/hooks/useOnClickOutside";

interface SelectOption<T = string> {
  value: T;
  label: string;
}

interface SelectProps<T = string> {
  options: SelectOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
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
  label,
  id = "select",
  error,
  selectedOptions = [],
  disabled = false,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

  useOnClickOutside(selectRef, () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  });

  const selectedOption = options.find((option) => option.value === value);
  const selectedIndex = options.findIndex((option) => option.value === value);

  const handleSelect = (option: SelectOption<T>) => {
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement | HTMLUListElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : 0);
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
              selectedIndex !== -1 ? selectedIndex : options.length - 1
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
            setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : 0);
          }
          break;

        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;

        case "Tab":
          if (isOpen) {
            setIsOpen(false);
            setHighlightedIndex(-1);
          }
          break;

        default:
          // Handle first-letter navigation
          const key = event.key.toLowerCase();
          if (key.length === 1 && /[a-z0-9]/.test(key)) {
            const nextIndex = options.findIndex(
              (option, index) =>
                index > highlightedIndex &&
                option.label.toLowerCase().startsWith(key)
            );
            if (nextIndex !== -1) {
              setHighlightedIndex(nextIndex);
            } else {
              // If no match found after current index, start from beginning
              const firstIndex = options.findIndex((option) =>
                option.label.toLowerCase().startsWith(key)
              );
              if (firstIndex !== -1) {
                setHighlightedIndex(firstIndex);
              }
            }
          }
          break;
      }
    },
    [isOpen, options, selectedIndex, highlightedIndex, handleSelect]
  );

  // Update refs array when options change
  const setOptionRef = (element: HTMLLIElement | null, index: number) => {
    optionsRef.current[index] = element;
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          relative w-full px-4 py-2.5 text-left bg-white dark:bg-gray-800 
          border rounded-lg focus:outline-none focus:ring-2 
          transition-colors duration-200
          ${error ? "border-error focus:ring-error" : "focus:ring-primary"}
          ${isOpen ? "border-primary ring-2 ring-primary" : ""}
          ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700"
              : ""
          }
        `}
      >
        <span
          className={`block truncate ${
            !selectedOption
              ? "text-gray-500"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={label ? `${id}-label` : undefined}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none"
        >
          {options.map((option, index) => {
            const isDisabled = selectedOptions.includes(option.value);
            return (
              <li
                key={`${option.label}-${index}`}
                ref={(el) => setOptionRef(el, index)}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={isDisabled}
                onClick={() => !isDisabled && handleSelect(option)}
                className={`
                  px-4 py-2 select-none outline-none
                  ${
                    isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }
                  ${
                    index === highlightedIndex
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                      : option.value === value
                      ? "bg-blue-50 dark:bg-blue-800/50 text-blue-900 dark:text-blue-100"
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
