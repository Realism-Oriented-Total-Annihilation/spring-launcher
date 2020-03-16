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

export class RepBattleOpened implements IResponse
{
    public readonly command = Command.BATTLEOPENED;

    public readonly battleid:      string;
    public readonly type:          string;
    public readonly nattype:       string;
    public readonly founder:       string;
    public readonly ip:            string;
    public readonly port:          string;
    public readonly maxplayers:    string;
    public readonly passworded:    string;
    public readonly rank:          string;
    public readonly maphash:       string;
    public readonly enginename:    string;
    public readonly engineversion: string;
    public readonly map:           string;
    public readonly title:         string;
    public readonly gamename:      string;
    // public readonly channel:       string;

    constructor(line: PtclLine)
    {
        this.battleid      = line.word().string();
        this.type          = line.word().string();
        this.nattype       = line.word().string();
        this.founder       = line.word().string();
        this.ip            = line.word().string();
        this.port          = line.word().string();
        this.maxplayers    = line.word().string();
        this.passworded    = line.word().string();
        this.rank          = line.word().string();
        this.maphash       = line.word().string();
        this.enginename    = line.sentence();
        this.engineversion = line.sentence();
        this.map           = line.sentence();
        this.title         = line.sentence();
        this.gamename      = line.sentence();
        // this.channel       = line.sentence();
    }
}

export class RepJoinedBattle implements IResponse
{
    public readonly command = Command.JOINEDBATTLE;

    public readonly battleid: string;
    public readonly username: string;
    // public readonly scriptpwd: string;

    constructor(line: PtclLine)
    {
        this.battleid  = line.word().string()
        this.username  = line.word().string()
        // this.scriptpwd = line.sentence();
    }
}