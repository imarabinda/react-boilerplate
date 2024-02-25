import { useEventListener, useMemoizedFn } from "ahooks";
import { useState } from "react";

export default function useIsOnline() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== "undefined" ? window.navigator.onLine : true
  );
  const onStatusChange = useMemoizedFn(() => {
    setIsOnline(window.navigator.onLine);
  });

  useEventListener("online", onStatusChange);
  useEventListener("offline", onStatusChange);

  return isOnline;
}
