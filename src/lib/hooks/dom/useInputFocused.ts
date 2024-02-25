import { useCallback, useRef, useState } from "react";
import { useEventListener } from "ahooks";

export default function useInputFocused(enableStateUpdate?: boolean) {
  //input focused
  const inputFocusedRef = useRef(false);
  const [inputFocused, setInputFocused] = useState(inputFocusedRef.current);

  const onInputFocusIn = useCallback(
    (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const inputs = ["input", "textarea"];
      if (
        (inputs.includes(target.tagName.toLowerCase()) ||
          target.contentEditable) &&
        !target.parentElement?.classList.contains("MuiSlider-thumb")
      ) {
        inputFocusedRef.current = true;
        if (enableStateUpdate) {
          setInputFocused(inputFocusedRef.current);
        }
      }
    },
    [enableStateUpdate]
  );

  const onInputFocusOut = useCallback(() => {
    inputFocusedRef.current = false;
    if (enableStateUpdate) {
      setInputFocused(inputFocusedRef.current);
    }
  }, [enableStateUpdate]);

  useEventListener("focusin", onInputFocusIn);
  useEventListener("focusout", onInputFocusOut);

  return { inputFocused, inputFocusedRef };
}
