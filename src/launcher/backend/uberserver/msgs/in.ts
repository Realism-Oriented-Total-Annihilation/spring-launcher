//
//
//
import { PtclLine } from "../handling/line";

import { Command }    from "../cmds";
import { CommandKey } from "../cmds";

import { InAccepted }             from "./in_login";
import { InDenied }               from "./in_login";
import { InRegistrationAccepted } from "./in_login";
import { InRegistrationDenied }   from "./in_login";
import { InAgreement }            from "./in_login";

import { InPong }         from "./in_misc";
import { InAddUser }      from "./in_misc";
import { InBattleOpened } from "./in_misc";
import { InJoinedBattle } from "./in_misc";
import { InLeftBattle }   from "./in_misc";
import { InClientStatus } from "./in_misc";


export type Inbound =
      InAccepted
    | InDenied
    | InRegistrationAccepted
    | InRegistrationDenied
    | InAgreement
    | InPong
    | InAddUser
    | InBattleOpened
    | InJoinedBattle
    | InLeftBattle
    | InClientStatus
;


export interface IInbound
{
    command: Command;
}
