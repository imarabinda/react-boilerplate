import EventEmitter from "eventemitter2";
import events from "config/events.config";
import { EventEmitterEventData } from "./dataTypes/eventEmitter.dataTypes";

export type EventEmitterEvents = GenerateUnionType<typeof events>;

export declare class ExtendedEventEmitter extends EventEmitter {
  emit: <T extends EventEmitterEvents>(
    event: T,
    data?: EventEmitterEventData<T>,
    broadCast?: boolean
  ) => boolean;
  emitAsync: <T extends EventEmitterEvents>(
    event: T,
    data?: EventEmitterEventData<T>,
    broadCast?: boolean
  ) => Promise<unknown[]>;
  listeners: <T extends EventEmitterEvents>(
    event?: T
  ) => ((data?: EventEmitterEventData<T>) => void)[];
}

type ProbabilityStorm<T extends EventEmitterEvents> = {
  [K in T]: {
    event: K;
    data?: EventEmitterEventData<K>;
  };
}[T];

export type BroadCastEventType = ProbabilityStorm<EventEmitterEvents>;
