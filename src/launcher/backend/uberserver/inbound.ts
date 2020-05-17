//
// Inbound Message Handler
//
import { Command } from "./cmds";

import { Inbound }        from "./msgs/in";
import { InAddUser }      from "./msgs/in_misc";
import { InBattleOpened } from "./msgs/in_misc";
import { InJoinedBattle } from "./msgs/in_misc";
import { InLeftBattle }   from "./msgs/in_misc";
import { InClientStatus } from "./msgs/in_misc";


export class UberInbound
{
    public inbound(msg: Inbound)
    {
        switch (msg.command)
        {
            case Command.ACCEPTED:             this.in_accepted(msg.username); break;
            case Command.DENIED:               this.in_denied(msg.reason); break;
            case Command.REGISTRATIONACCEPTED: this.in_registration_accepted(); break;
            case Command.REGISTRATIONDENIED:   this.in_registration_denied(msg.reason); break;
            case Command.AGREEMENT:            this.in_confirm_agreement(msg.terms); break;
            case Command.PONG:                 this.in_pong(); break;
            case Command.ADDUSER:              this.in_add_user(msg); break;
            case Command.BATTLEOPENED:         this.in_add_battle(msg); break;
            case Command.JOINEDBATTLE:         this.in_joined_battle(msg); break;
            case Command.LEFTBATTLE:           this.in_left_battle(msg); break;
            case Command.CLIENTSTATUS:         this.in_client_status(msg); break;
        }
    }

    public in_accepted(username: string)
    {
        // sl.gui.mode(GuiMode.MainBattleList);
        // require('electron').remote.getCurrentWindow().maximize();
    }

    public in_denied(username: string)
    {
        // sl.gui.mode(GuiMode.StartLogin);
        // sl.gui.error("Invalid username or password");
    }

    public in_registration_accepted()
    {
        // if (this.tmp_creds)
        // {
        //     this.server.request(new OutLogin(this.tmp_creds.user, this.tmp_creds.passwd));
        //     delete this.tmp_creds;
        // }
    }

    public in_registration_denied(reason: string)
    {
        // sl.gui.mode(GuiMode.StartRegister);
        // sl.gui.error(reason);
    }

    public in_confirm_agreement(terms: string)
    {
        // sl.gui.mode(GuiMode.StartTerms);
    }

    public in_pong()
    {
        // NOOP
    }

    public in_add_user(_user: InAddUser)
    {
        // let user = new User(
        //     _user.userid,
        //     _user.username,
        //     _user.country,
        //     _user.lobbyid,
        // );

        // sl.backend.players.set(user.name, user);
    }

    public in_add_battle(_battle: InBattleOpened)
    {
        // let battle = new Battle(
        //     _battle.title,
        //     _battle.battleid,
        //     _battle.founder,
        //     _battle.maxplayers,
        //     _battle.passworded,
        //     _battle.rank,
        //     _battle.map,
        //     _battle.gamename,
        // );

        // sl.backend.battles.set(_battle.battleid, battle);
    }

    public in_joined_battle(info: InJoinedBattle)
    {
        // let battle = sl.backend.battles.get(info.battleid);
        // let user   = sl.backend.players.get(info.username);

        // if (!battle) {
        //     console.debug(`No battle with respective id ${info.battleid}`);
        //     return;
        // }

        // if (!user) {
        //     console.debug(`No user with respective name ${info.username}`);
        //     return;
        // }

        // battle.joined(user);
    }

    public in_left_battle(info: InLeftBattle)
    {
        // let battle = sl.backend.battles.get(info.battleid);
        // let user   = sl.backend.players.get(info.username);

        // if (!battle) {
        //     console.debug(`No battle with respective id ${info.battleid}`);
        //     return;
        // }

        // if (!user) {
        //     console.debug(`No user with respective name ${info.username}`);
        //     return;
        // }

        // battle.left(user);
    }

    public in_client_status(status: InClientStatus)
    {
        // let user = sl.backend.players.get(status.username);

        // if (!user) {
        //     console.error(`No user with name ${status.username} found`);
        //     return;
        // }

        // // Update
        // user.ingame       = status.ingame;
        // user.afk          = status.afk;
        // user.rank         = status.rank;
        // user.moderator    = status.access_level;
        // user.bot          = status.bot;

        // user.update();
    }
}
