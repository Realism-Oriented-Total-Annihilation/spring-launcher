//
// Pong/...
//
import { IResponse } from "./response";

import { Command } from "../cmds";
import { PtclLine } from "../handling/line";


export class RepPong implements IResponse
{
    public readonly command = Command.PONG;
}

export class RepAddUser implements IResponse
{
    public readonly command = Command.ADDUSER;

    public readonly username: string;
    public readonly country:  string;
    public readonly userid:   string;
    public readonly lobbyid:  string;

    constructor(line: PtclLine)
    {
        this.username = line.word().string();
        this.country  = line.word().string();
        this.userid   = line.word().string();
        this.lobbyid  = line.sentence();
    }
}