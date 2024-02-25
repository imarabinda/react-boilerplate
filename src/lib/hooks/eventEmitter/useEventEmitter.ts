import eventEmitter from "service/EventEmitter/eventEmitter";
import { useEffect } from "react";
import { useMemoizedFn } from "ahooks";
import { EventEmitterEvents } from "service/EventEmitter/@types";
import { EventEmitterEventData } from "service/EventEmitter/@types/dataTypes/eventEmitter.dataTypes";

/**
 * This is a TypeScript function that uses hooks to register and unregister event listeners with a
 * callback function.
 * @param {EventEmitterEvents} eventName - EventEmitterEvents is a type that represents the name of the event that the
 * component wants to listen to. It is likely an enum or string type that is defined elsewhere in the
 * codebase.
 * @param callback - The `callback` parameter is a function that will be called when the specified
 * event (`eventName`) is emitted. It takes an optional `data` parameter of type `T`, which can be used
 * to pass data along with the event. The `useMemoizedFn` hook is used to memoize
 * @returns This code is returning `null`.
 */
export default function useEventEmitter<T extends EventEmitterEvents>(
  eventName: T,
  callback: (data?: EventEmitterEventData<T>) => void
) {
  const callbackFunction = useMemoizedFn(callback);

  useEffect(() => {
    eventEmitter.on(eventName, callbackFunction);
    return () => {
      eventEmitter.off(eventName, callbackFunction);
    };
  }, [callbackFunction, eventName]);

  return null;
}
