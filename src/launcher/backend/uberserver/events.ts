
//
// UberServer Protocol Events
//
import { EventEmitter } from "events";

import { Command } from "./ptcl/cmds";


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

    public on(cmds: Command[], listener: (...args: any[]) => void)
    {
        for (let cmd of cmds) {
            this._bus.on(Command[cmd], listener);
        }
    }

    public once(cmds: Command[], listener: (...args: any[]) => void)
    {
        for (let cmd of cmds) {
            this._bus.once(Command[cmd], listener);
        }
    }
}
