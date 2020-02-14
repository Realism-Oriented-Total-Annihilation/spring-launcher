//
//
//
// import { EventEmitter } from "events";


// enum _EventKey
// {
//     ""
// }


// export type EventKey = keyof typeof _EventKey;


// class EventBus
// {
//     private static _instance: EventBus;

//     private _bus: EventEmitter;

//     private constructor()
//     {
//         this._bus = new EventEmitter();
//     }

//     public static get Instance(): EventBus
//     {
//         return this._instance || (this._instance = new this());
//     }

//     public emit(event: EventKey, ...args: any[]): EventBus
//     {
//         this._bus.emit(event, ...args);

//         return this;
//     }

//     public on(event: EventKey, listener: (...args: any[]) => void): EventBus
//     {
//         this._bus.on(event, listener);

//         return this;
//     }
// }


// export const Events = EventBus.Instance;
