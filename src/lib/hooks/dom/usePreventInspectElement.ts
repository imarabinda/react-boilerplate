import { useEventListener } from "ahooks";

export default function usePreventInspectElement(enabled: boolean) {
  useEventListener("keydown", (e) => {
    if (enabled) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
      }
    }
  });
}
