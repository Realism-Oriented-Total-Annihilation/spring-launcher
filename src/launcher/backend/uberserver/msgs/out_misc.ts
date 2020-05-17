//
// Ping/...
//
import { IOutbound } from "./out";

import { Command } from "../cmds";


export class OutPing extends IOutbound
{
    public readonly command = Command.PING;

    constructor()
    {
        super();
    }
}

export class OutMyStatus extends IOutbound
{
    public readonly command = Command.MYSTATUS;

    constructor()
    {
        super();
    }
}