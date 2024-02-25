import { useMemoizedFn } from "ahooks";
import useEventEmitter from "lib/hooks/eventEmitter/useEventEmitter";
import useToast from "lib/hooks/toast/useToast";
import { useNavigate } from "react-router";
import { ShowNotificationEventPassData } from "service/EventEmitter/@types/dataTypes/eventEmitter.dataTypes";

export default function EventListeners() {
  const { enqueueToast } = useToast();

  const showNotificationsCallback = useMemoizedFn(
    (data?: ShowNotificationEventPassData) => {
      enqueueToast(data?.message, data?.options);
    }
  );

  useEventEmitter("notification/showNotification", showNotificationsCallback);

  const navigate = useNavigate();
  const handleRoutes = useMemoizedFn(
    (pathName?: Parameters<typeof navigate>["0"]) => {
      if (pathName) {
        navigate(pathName);
      }
    }
  );

  useEventEmitter("router/routerPush", handleRoutes);

  return null;
}
