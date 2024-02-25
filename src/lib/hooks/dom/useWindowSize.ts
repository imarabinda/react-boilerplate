import { useCallback, useLayoutEffect, useState } from "react";
import { useEventListener, useLatest } from "ahooks";

interface useWindowSizeProps {
  onChange?: (width: number, height: number) => void;
  defaultValue?: [Nullable<number>, Nullable<number>];
}
/**
 * It returns the current window size as an array of two numbers, width and height
 * @returns The window size.
 */

export function useWindowSize(props?: useWindowSizeProps) {
  const [size, setSize] = useState(props?.defaultValue || [null, null]);
  const onChangeRef = useLatest(props?.onChange);
  const updateSize = useCallback(() => {
    onChangeRef?.current?.(window.innerWidth, window.innerHeight);
    setSize([window.innerWidth, window.innerHeight]);
  }, [onChangeRef]);

  /* Adding an event listener to the window object. */
  useEventListener("resize", updateSize);
  useLayoutEffect(() => {
    updateSize();
  }, []);

  return size;
}
