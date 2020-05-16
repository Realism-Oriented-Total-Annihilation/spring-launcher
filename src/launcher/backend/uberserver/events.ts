
//
// UberServer Protocol Events
//
import { EventEmitter } from "events";

import { Command } from "./cmds";

// string => listener/emitter argument types
interface GuiEventTypes
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


export class GuiEvents
{
    private emitter: EventEmitter;

    private static _instance: GuiEvents;

    private constructor()
    {
        this.emitter = new EventEmitter();
    }

    public static instance(): GuiEvents
    {
        if (!GuiEvents._instance) {
            GuiEvents._instance = new this();
        }

        return GuiEvents._instance;
    }

    public emit<K extends keyof GuiEventTypes>(key: K, args: GuiEventTypes[K]): void {
        this.emitter.emit(key, args)
    }

    public register<K extends keyof GuiEventTypes>(key: K, listener: (args: GuiEventTypes[K]) => void): ListenerHandle
    {
        let handle = new ListenerHandle(this.emitter, key, listener);
        return handle;
    }
}
