import { useCallback, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

/**
 * It sets the locale of the moment library to the locale of the browser
 * @param {string} [localeString] - The locale string to use. If not provided, the browser's locale
 * will be used.
 * @returns The locale of the browser.
 */
export default function useDateSetup() {
  const loadDependencies = useCallback(async () => {
    try {
      const relativeTime = (await import("dayjs/plugin/relativeTime")).default;
      dayjs.extend(relativeTime);
    } catch (e) {
      console.error(e, "useDateSetup/loadDependencies/relativeTime");
    }
  }, []);

  useEffect(() => {
    loadDependencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
