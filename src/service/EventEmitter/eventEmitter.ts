import EventEmitter from "eventemitter2";
import { BroadCastEventType, ExtendedEventEmitter } from "./@types";
import createBroadCastChannel from "./broadCastChannel";

/* This code is creating a new instance of the `EventEmitter` class from the `eventemitter2` library
and assigning it to a constant variable named `eventEmitter`. This `EventEmitter` instance can be
used to emit and listen to events within the application. */

const eventEmitter = new EventEmitter() as ExtendedEventEmitter;
const broadCastChannel = createBroadCastChannel("eventEmitter");

eventEmitter.prependAny((event, data, broadCast) => {
  if (broadCast) {
    broadCastChannel?.postMessage({ event, data });
  }
});

broadCastChannel?.addEventListener(
  "message",
  ({ data: broadCastEventData }: MessageEvent<BroadCastEventType>) => {
    console.log("boradcards");
    const { data, event } = broadCastEventData;
    const listeners = eventEmitter.listeners(event);
    listeners?.forEach((listener) => listener?.apply(this, [data]));
  }
);

export default eventEmitter;
