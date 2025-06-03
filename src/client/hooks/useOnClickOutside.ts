import { RefObject, useEffect } from "react";

/**
 * Handles click/touch events outside of a specified element.
 * @param ref - React ref object pointing to the DOM element to monitor
 * @param handler - Callback function to be called when a click/touch occurs outside the referenced element
 */

const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export { useOnClickOutside };
