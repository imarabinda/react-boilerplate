import { useEffect } from "react";

export default function useBodyTagStyle(
  callback: (body: HTMLBodyElement) => string | void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] | any
) {
  useEffect(() => {
    const bodyTag = document.getElementsByTagName("body")?.[0];
    if (bodyTag) {
      const styles = callback?.(bodyTag);
      if (styles) {
        bodyTag.style.cssText = styles;
      }
    }
  }, [JSON.stringify(deps)]);
}
