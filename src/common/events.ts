//
// Generic Event Emitter (NodeJs) Extension
//
import { EventEmitter } from "events";


export class Events<Events>
{
    private emitter: EventEmitter;

    constructor()
    {
        this.emitter = new EventEmitter();
    }

    public register<K extends keyof Events>(key: K, listener: (args: Events[K]) => void): EventHandle
    {
        let handle = new EventHandle(this.emitter, <string>key, listener);
        return handle;
    }

    public emit<K extends keyof Events>(key: K, args: Events[K]): void
    {
        this.emitter.emit(<string>key, args)
    }
}


export class EventHandle
{
    private key:      string;
    private listener: (...args: any[]) => void;

    private emitter: EventEmitter;

    constructor(emitter: EventEmitter, key: string, listener: (...args: any[]) => void)
    {
        this.key      = key;
        this.listener = listener;

        this.emitter = emitter;
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
