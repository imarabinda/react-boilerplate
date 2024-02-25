import { useCallback } from "react";
import type { ExternalToast } from "sonner";

type AvailableVariants =
  | "success"
  | "error"
  | "message"
  | "loading"
  | "warning";
export type ToastOptions = ExternalToast & {
  variant: AvailableVariants;
};

export default function useToast() {
  const enqueueToast = useCallback(
    async (message: React.ReactNode, data?: ToastOptions) => {
      const toast = (await import("sonner")).toast;
      let variant = data?.variant;
      //   change warning to message variant
      if (variant === "warning") {
        variant = "message";
      }
      if (variant && typeof toast?.[variant] === "function") {
        return toast?.[variant]?.(message, data);
      } else {
        return toast(message, data);
      }
    },
    []
  );

  const enqueuePromiseToast = useCallback(async () => {
    const toast = (await import("sonner")).toast;
    return toast.promise;
  }, []);

  const enqueueCustomToast = useCallback(async () => {
    const toast = (await import("sonner")).toast;
    return toast.custom;
  }, []);

  const dismissToast = useCallback(async (id?: number | string) => {
    const toast = (await import("sonner")).toast;
    return toast.dismiss(id);
  }, []);
  return {
    enqueueToast,
    enqueuePromiseToast,
    dismissToast,
    enqueueCustomToast,
  };
}
