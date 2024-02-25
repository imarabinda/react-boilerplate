import { useEffect, useRef } from "react";

type useAsyncScriptLoaderProps = {
  scriptUrl: string;
  id: string;
  onLoad?: () => void;
  onError?: () => void;
  crossOrigin?: boolean;
};
export default function useAsyncScriptLoader({
  scriptUrl,
  id,
  onError,
  onLoad,
  crossOrigin,
}: useAsyncScriptLoaderProps) {
  const scriptTagRef = useRef<Nullable<HTMLScriptElement>>(null);
  useEffect(() => {
    const headTag = document.getElementsByTagName("head")[0];
    const existingScriptTag = document.querySelector(
      `script[id="${id}"]`
    ) as HTMLScriptElement;
    let scriptTag: typeof scriptTagRef.current = existingScriptTag;

    if (!existingScriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.async = true;
      scriptTag.src = scriptUrl;
      scriptTag.id = id;
      if (typeof crossOrigin === "boolean") {
        scriptTag.crossOrigin = crossOrigin ? "true" : "false";
      }
      if (onLoad) {
        scriptTag.onload = onLoad;
      }
      if (onError) {
        scriptTag.onerror = onError;
      }
      headTag.appendChild(scriptTag);
    } else {
      onLoad?.();
    }

    scriptTagRef.current = scriptTag;
    return () => {
      scriptTagRef?.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptUrl]);

  return scriptTagRef;
}
