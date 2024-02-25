import { EventEmitterEvents } from "..";
import { ToastOptions } from "lib/hooks/toast/useToast";

export type LoggedInEventPassData = {};
export type LoggedOutEventPassData = {};
export type LogOutCurrentUserEventPassData = {
  excludeApiCall?: boolean;
  excludeSuccessNotification?: boolean;
  message?: string;
};
export type ShowNotificationEventPassData = {
  message: string | React.ReactNode;
  options?: ToastOptions;
};
export type RouterPushEventPassData = string;

export type EventEmitterEventData<T extends EventEmitterEvents> = any;
