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

export class RepLeftBattle implements IResponse
{
    public readonly command = Command.LEFTBATTLE;

    public readonly battleid: string;
    public readonly username: string;

    constructor(line: PtclLine)
    {
        this.username  = line.word().string();
        this.battleid  = line.word().string();
    }
}


export class RepClientStatus implements IResponse
{
    public readonly command = Command.CLIENTSTATUS;

    public readonly username: string;

    public readonly ingame:       boolean;
    public readonly afk:          boolean;
    public readonly rank:         number;
    public readonly access_level: boolean;
    public readonly bot:          boolean;

    constructor(line: PtclLine)
    {
        this.username = line.word().string();

        let status = line.word().number();

        this.ingame = (status & (1 << 0)) ? true : false;
        this.afk    = (status & (1 << 1)) ? true : false;

        this.rank  = status & (1 << 2);
        this.rank += status & (1 << 3);
        this.rank += status & (1 << 4);

        this.access_level = status & (1 << 5) ? true : false;
        this.bot          = status & (1 << 6) ? true : false;
    }
}













// b0 = in game (0 - normal, 1 - in game)
// b1 = away status (0 - normal, 1 - away)
// b2-b4 = rank (see Account class implementation for description of rank) - client is not allowed to change rank bits himself (only server may set them).
// b5 = access status (tells us whether this client is a server moderator or not) - client is not allowed to change this bit himself (only server may set them).
// b6 = bot mode (0 - normal user, 1 - automated bot). This bit is copied from user's account and can not be changed by the client himself. Bots differ from human players in that they are fully automated and that some anti-flood limitations do not apply to them.

// MybattleStatus

// b0 = undefined (reserved for future use)
// b1 = ready (0=not ready, 1=ready)
// b2..b5 = team no. (from 0 to 15. b2 is LSB, b5 is MSB)
// b6..b9 = ally team no. (from 0 to 15. b6 is LSB, b9 is MSB)
// b10 = mode (0 = spectator, 1 = normal player)
// b11..b17 = handicap (7-bit number. Must be in range 0..100). Note: Only host can change handicap values of the players in the battle (with HANDICAP command). These 7 bits are always ignored in this command. They can only be changed using HANDICAP command.
// b18..b21 = reserved for future use (with pre 0.71 versions these bits were used for team color index)
// b22..b23 = sync status (0 = unknown, 1 = synced, 2 = unsynced)
// b24..b27 = side (e.g.: arm, core, tll, ... Side index can be between 0 and 15, inclusive)
// b28..b31 = undefined (reserved for future use)


// this.ready = (field & (1 << 1)) ? true : false;

// this.team  = field & (1 << 2);
// this.team += field & (1 << 3);
// this.team += field & (1 << 4);
// this.team += field & (1 << 5);

// this.ally  = field & (1 << 6);
// this.ally += field & (1 << 7);
// this.ally += field & (1 << 8);
// this.ally += field & (1 << 9);

// this.mode = (field & (1 << 10)) ? "player" : "spectator";

// this.handicap  = field & (1 << 11);
// this.handicap += field & (1 << 12);
// this.handicap += field & (1 << 13);
// this.handicap += field & (1 << 14);
// this.handicap += field & (1 << 15);
// this.handicap += field & (1 << 16);
// this.handicap += field & (1 << 17);
