
//
// UberServer Protocol Events
//
import { EventEmitter } from "events";

import { Command } from "./cmds";


export class UberEvents
{
    private _bus: EventEmitter;

    public constructor()
    {
        this._bus = new EventEmitter();
    }

    public emit(cmd: Command, ...args: any[]): UberEvents
    {
        this._bus.emit(Command[cmd], ...args);

        return this;
    }

    public on(cmd: Command, listener: (...args: any[]) => void)
    {
        this._bus.on(Command[cmd], listener);
    }

    public once(cmd: Command, listener: (...args: any[]) => void)
    {
        this._bus.once(Command[cmd], listener);
    }
}
