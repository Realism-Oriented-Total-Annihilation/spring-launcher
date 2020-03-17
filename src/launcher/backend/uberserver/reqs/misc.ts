//
// Ping/...
//
import { IRequest } from "./request";

import { Command } from "../cmds";


export class ReqPing extends IRequest
{
    public readonly command = Command.PING;

    constructor()
    {
        super();
    }
}

export class ReqMyStatus extends IRequest
{
    public readonly command = Command.MYSTATUS;

    constructor()
    {
        super();
    }
}