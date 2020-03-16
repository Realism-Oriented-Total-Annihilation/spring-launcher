//
//
//
import { PtclLine } from "../handling/line";

import { Command }    from "../cmds";
import { CommandKey } from "../cmds";

import { RepAccepted }             from "./login";
import { RepDenied }               from "./login";
import { RepRegistrationAccepted } from "./login";
import { RepRegistrationDenied }   from "./login";
import { RepAgreement }            from "./login";

import { RepPong, RepAddUser, RepBattleOpened, RepJoinedBattle } from "./misc";


export type Response =
      RepAccepted
    | RepDenied
    | RepRegistrationAccepted
    | RepRegistrationDenied
    | RepAgreement
    | RepPong
    | RepAddUser
    | RepBattleOpened
    | RepJoinedBattle
;


export interface IResponse
{
    command: Command;
}


export function parse(line: PtclLine): Response | undefined
{
    let name = <CommandKey>line.word().string();

    switch (name)
    {
        case "ACCEPTED":             return new RepAccepted(line);
        case "DENIED":               return new RepDenied(line);
        case "REGISTRATIONACCEPTED": return new RepRegistrationAccepted();
        case "REGISTRATIONDENIED":   return new RepRegistrationDenied(line);
        case "AGREEMENT":            return new RepAgreement(line);
        case "PONG":                 return new RepPong();
        case "ADDUSER":              return new RepAddUser(line);
        case "BATTLEOPENED":         return new RepBattleOpened(line);
        case "JOINEDBATTLE":         return new RepJoinedBattle(line);

        default:
            console.warn(`Uberserver protocol message not yet implemented for: ${name}`);
    }
}
