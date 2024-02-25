import { useCallback, useState } from "react";
import { useEventListener } from "ahooks";

const useWindowFocus = () => {
  const [isBrowserTabFocused, setIsBrowserTabFocused] = useState(
    typeof document !== "undefined" && "hidden" in document
      ? !document?.hidden
      : true
  );
  const updateIsFocused = useCallback(() => {
    if ("hasFocus" in document) {
      const isVisible = document?.hasFocus();
      setIsBrowserTabFocused(isVisible);
    }
  }, []);

  useEventListener("focus", updateIsFocused);
  useEventListener("blur", updateIsFocused);
  useEventListener("visibilitychange", updateIsFocused);

  return isBrowserTabFocused;
};

export default useWindowFocus;
