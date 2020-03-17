//
// Uber Lobby Server (Online / WAN Games)
//
import { UberServer } from "./uberserver/server";

import { sl } from "../../renderer";

import { GuiMode } from "../gui";

import { Command }  from "./uberserver/cmds";
import { Response } from "./uberserver/reps/response";

import { ReqPing }       from "./uberserver/reqs/misc";
import { ReqLogin }      from "./uberserver/reqs/login";
import { ReqRegister }   from "./uberserver/reqs/login";
import { ReqConfirmAgreement } from "./uberserver/reqs/login";
import { RepAddUser, RepBattleOpened, RepJoinedBattle, RepLeftBattle, RepClientStatus } from "./uberserver/reps/misc";
import { User } from "../model/user";
import { Battle } from "../model/battle";


export class UberBackend
{
    private server: UberServer;

    private tmp_creds?: {user: string, passwd: string};

    constructor(host: string, port: number)
    {
        this.server = new UberServer(host, port);

        this.setup_wiring();
    }

    private ping()
    {
        this.server.request(new ReqPing());
    }

    private login(user: string, passwd: string)
    {
        this.server.request(new ReqLogin(user, passwd, this.server.addr_local()));
    }

    private register(user: string, passwd: string, email: string)
    {
        this.server.request(new ReqRegister(user, passwd, email));
        this.tmp_creds = {user, passwd};
    }

    private accept_terms(code?: string)
    {
        this.server.request(new ReqConfirmAgreement(code));
    }

    private handle_accepted(username: string)
    {
        sl.gui.mode(GuiMode.MainBattleList);
        require('electron').remote.getCurrentWindow().maximize();
    }

    private handle_denied(username: string)
    {
        sl.gui.mode(GuiMode.StartLogin);
        sl.gui.error("Invalid username or password");
    }

    private handle_registration_accepted()
    {
        if (this.tmp_creds)
        {
            this.server.request(new ReqLogin(this.tmp_creds.user, this.tmp_creds.passwd));
            delete this.tmp_creds;
        }
    }

    private handle_registration_denied(reason: string)
    {
        sl.gui.mode(GuiMode.StartRegister);
        sl.gui.error(reason);
    }

    private handle_confirm_agreement(terms: string)
    {
        sl.gui.mode(GuiMode.StartTerms);
    }

    private handle_pong()
    {
        // NOOP
    }

    private handle_add_user(_user: RepAddUser)
    {
        let user = new User(
            _user.userid,
            _user.username,
            _user.country,
            _user.lobbyid,
        );

        sl.backend.players.set(user.name, user);
    }

    private handle_add_battle(_battle: RepBattleOpened)
    {
        let battle = new Battle(
            _battle.title,
            _battle.battleid,
            _battle.founder,
            _battle.maxplayers,
            _battle.passworded,
            _battle.rank,
            _battle.map,
            _battle.gamename,
        );

        sl.backend.battles.set(_battle.battleid, battle);
    }

    private handle_joined_battle(info: RepJoinedBattle)
    {
        let battle = sl.backend.battles.get(info.battleid);
        let user   = sl.backend.players.get(info.username);

        if (!battle) {
            console.debug(`No battle with respective id ${info.battleid}`);
            return;
        }

        if (!user) {
            console.debug(`No user with respective name ${info.username}`);
            return;
        }

        battle.joined(user);
    }

    private handle_left_battle(info: RepLeftBattle)
    {
        let battle = sl.backend.battles.get(info.battleid);
        let user   = sl.backend.players.get(info.username);

        if (!battle) {
            console.debug(`No battle with respective id ${info.battleid}`);
            return;
        }

        if (!user) {
            console.debug(`No user with respective name ${info.username}`);
            return;
        }

        battle.left(user);
    }

    private handle_client_status(status: RepClientStatus)
    {
        let user = sl.backend.players.get(status.username);

        if (!user) {
            console.error(`No user with name ${status.username} found`);
            return;
        }

        // Update
        user.ingame       = status.ingame;
        user.afk          = status.afk;
        user.rank         = status.rank;
        user.moderator    = status.access_level;
        user.bot          = status.bot;

        user.update();
    }

    private handle(rep: Response): void
    {
        switch (rep.command)
        {
            case Command.ACCEPTED:             this.handle_accepted(rep.username); break;
            case Command.DENIED:               this.handle_denied(rep.reason); break;
            case Command.REGISTRATIONACCEPTED: this.handle_registration_accepted(); break;
            case Command.REGISTRATIONDENIED:   this.handle_registration_denied(rep.reason); break;
            case Command.AGREEMENT:            this.handle_confirm_agreement(rep.terms); break;
            case Command.PONG:                 this.handle_pong(); break;
            case Command.ADDUSER:              this.handle_add_user(rep); break;
            case Command.BATTLEOPENED:         this.handle_add_battle(rep); break;
            case Command.JOINEDBATTLE:         this.handle_joined_battle(rep); break;
            case Command.LEFTBATTLE:           this.handle_left_battle(rep); break;
            case Command.CLIENTSTATUS:         this.handle_client_status(rep); break;
        }
    }

    private setup_wiring()
    {
        this.server.on_incoming = (rep) => { this.handle(rep); } ;

        sl.gui.on_login       = (user, passwd)        => { this.login(user, passwd); };
        sl.gui.on_register    = (user, passwd, email) => { this.register(user, passwd, email); };
        sl.gui.on_acceptterms = (code)                => { this.accept_terms(code); };
    }
}
