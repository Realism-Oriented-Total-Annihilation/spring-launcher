//
// Protocol Buffer
//
import { PtclLine } from "./line";

import { Inbound } from "../msgs/in";
import { CommandKey } from "../cmds";

import {
    InAccepted,
    InDenied,
    InRegistrationAccepted,
    InRegistrationDenied,
    InAgreement
} from "../msgs/in_login";

import {
    InPong,
    InAddUser,
    InBattleOpened,
    InJoinedBattle,
    InLeftBattle
} from "../msgs/in_misc";


export class PtclBuffer
{
    private buff: string;

    constructor()
    {
        this.buff = "";
    }

    public append(data: string)
    {
        this.buff += data;
    }

    public lines(): PtclLine[]
    {
        let lines = this.buff.split("\n");
        let msgs  = [];

        this.buff = <string>lines.pop();

        for (let line of lines) {
            msgs.push(new PtclLine(line));
        }

        return msgs;
    }

    public parse(): Inbound[]
    {
        let lines = this.lines();
        let msgs  = [];

        for (let line of lines)
        {
            let name = <CommandKey>line.word().string();

            switch (name)
            {
                case "ACCEPTED":             msgs.push(new InAccepted(line));
                case "DENIED":               msgs.push(new InDenied(line));
                case "REGISTRATIONACCEPTED": msgs.push(new InRegistrationAccepted());
                case "REGISTRATIONDENIED":   msgs.push(new InRegistrationDenied(line));
                case "AGREEMENT":            msgs.push(new InAgreement(line));
                case "PONG":                 msgs.push(new InPong());
                case "ADDUSER":              msgs.push(new InAddUser(line));
                case "BATTLEOPENED":         msgs.push(new InBattleOpened(line));
                case "JOINEDBATTLE":         msgs.push(new InJoinedBattle(line));
                case "LEFTBATTLE":           msgs.push(new InLeftBattle(line));
                case "CLIENTSTATUS":         msgs.push(new InLeftBattle(line));

                default:
                    console.warn(`Uberserver protocol message not yet implemented for: ${name}`);
            }
        }

        return msgs;
    }
}
