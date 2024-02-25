import { IncomingMessage } from "http";
import cookie from "cookie";
import eventEmitter from "service/EventEmitter/eventEmitter";
import events from "config/events.config";
import { AxiosError } from "axios";

export const isInServer = () => typeof window === "undefined";
export const isInBrowser = () => typeof window !== "undefined";

export function parseCookies(req?: IncomingMessage) {
  return cookie.parse(
    req
      ? req.headers.cookie || ""
      : typeof document !== "undefined"
      ? document?.cookie
      : ""
  );
}

export function isApple() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const platformExpression = /Mac|iPhone|iPod|iPad/i;
  const agent = navigator.userAgent;
  return platformExpression.test(agent);
}

export function isAppleSafari() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const rejectedExpression = /Chrome|Android|CriOS|FxiOS|EdgiOS/i;
  const expectedExpression = /Safari/i;

  const agent = navigator.userAgent;
  if (rejectedExpression.test(agent)) {
    return false;
  }
  return isApple() && expectedExpression.test(agent);
}

export const copyTextToClipBoard = (content: string): Promise<void> => {
  return navigator.clipboard.writeText(content);
};

/**
 * Function for getting the file extension from a file name.
 * This is taken from VisioN's answer on Stack Overflow:
 *
 * @see https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript#VisioN
 * @param fileName the file name without path
 * @returns the extension without the dot or empty string if no extension
 */
export const getFileExtension = (fileName: string) => {
  if (fileName?.trim()) {
    return fileName
      .slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2)
      .trim()
      .toLowerCase();
  }
  return "";
};

export const trimStartAndEnd = (value?: string) => {
  if (value) {
    value = value.trimStart();
    return value.trimEnd();
  }
  return value;
};

export const globalCatchError = (error: AxiosError<BaseApiResponseType>) => {
  let message = "Something went wrong";
  if (error.response?.data?.message) {
    message = error.response?.data.message;
  }
  eventEmitter.emit(events.notification.showNotification, {
    message,
    options: { variant: "error" },
  });
};

export const successErrorNotification = (response: BaseApiResponseType) => {
  eventEmitter.emit(events.notification.showNotification, {
    message: response.message,
    options: {
      variant: response.status === 200 ? "success" : "error",
    },
  });
};
