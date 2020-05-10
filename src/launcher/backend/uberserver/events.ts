
//
// UberServer Protocol Events
//
import { EventEmitter } from "events";

import { Command } from "./cmds";

// string => listener/emitter argument types
interface VizEventTypes
{
    "newbattle": {};
}


export class ListenerHandle
{
    private emitter: EventEmitter;

    private key:      string;
    private listener: (...args: any[]) => void;

    constructor(emitter: EventEmitter, key: string, listener: (...args: any[]) => void)
    {
        this.emitter = emitter;

        this.key      = key;
        this.listener = listener;
    }

    public listen(): void
    {
        this.emitter.addListener(this.key, this.listener);
    }

    public pause(): void
    {
        this.remove();
    }

    public resume(): void
    {
        this.listen();
    }

    public remove(): void
    {
        this.emitter.removeListener(this.key, this.listener);
    }
}


export class VizEvents
{
    private emitter: EventEmitter;

    private static _instance: VizEvents;

    private constructor()
    {
        this.emitter = new EventEmitter();
    }

    public static instance(): VizEvents
    {
        if (!VizEvents._instance) {
            VizEvents._instance = new this();
        }

        return VizEvents._instance;
    }

    public emit<K extends keyof VizEventTypes>(key: K, args: VizEventTypes[K]): void {
        this.emitter.emit(key, args)
    }

    public register<K extends keyof VizEventTypes>(key: K, listener: (args: VizEventTypes[K]) => void): ListenerHandle
    {
        let handle = new ListenerHandle(this.emitter, key, listener);
        return handle;
    }
}

