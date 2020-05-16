//
// Uber Lobby Server (Online / WAN Games)
//
import { UberServer } from "./server";

import { GuiMode } from "../../gui/gui";

import { Command }  from "./cmds";
import { Response } from "./incoming/response";

import { ReqPing }       from "./outgoing/misc";
import { ReqLogin }      from "./outgoing/login";
import { ReqRegister }   from "./outgoing/login";
import { ReqConfirmAgreement } from "./outgoing/login";
import { RepAddUser, RepBattleOpened, RepJoinedBattle, RepLeftBattle, RepClientStatus } from "./incoming/misc";

import { User }     from "../../delme_model/user";
import { Battle }   from "../../delme_model/battle";
import { Backend }  from "../backend";


export class UberProtocol
{
    private backend: Backend;

    private server: UberServer;

    private tmp_creds?: {user: string, passwd: string};

    constructor(backend: Backend, host: string, port: number)
    {
        this.backend = backend;

        this.server = new UberServer(host, port);

        this.setup_listeners();
        this.setup_wiring();
    }

    public disconnect()
    {
        // TODO
    }

    private setup_listeners()
    {
        this.backend.register("connection.params", (params) => { this.process_connection_parameters(params); });

        this.backend.emit("backend.ready");
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

    private process_accepted(username: string)
    {
        sl.gui.mode(GuiMode.MainBattleList);
        require('electron').remote.getCurrentWindow().maximize();
    }

    private process_denied(username: string)
    {
        sl.gui.mode(GuiMode.StartLogin);
        sl.gui.error("Invalid username or password");
    }

    private process_registration_accepted()
    {
        if (this.tmp_creds)
        {
            this.server.request(new ReqLogin(this.tmp_creds.user, this.tmp_creds.passwd));
            delete this.tmp_creds;
        }
    }

    private process_registration_denied(reason: string)
    {
        sl.gui.mode(GuiMode.StartRegister);
        sl.gui.error(reason);
    }

    private process_confirm_agreement(terms: string)
    {
        sl.gui.mode(GuiMode.StartTerms);
    }

    private process_pong()
    {
        // NOOP
    }

    private process_add_user(_user: RepAddUser)
    {
        let user = new User(
            _user.userid,
            _user.username,
            _user.country,
            _user.lobbyid,
        );

        sl.backend.players.set(user.name, user);
    }

    private process_add_battle(_battle: RepBattleOpened)
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

    private process_joined_battle(info: RepJoinedBattle)
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

    private process_left_battle(info: RepLeftBattle)
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

    private process_client_status(status: RepClientStatus)
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

    private process(rep: Response): void
    {
        switch (rep.command)
        {
            case Command.ACCEPTED:             this.process_accepted(rep.username); break;
            case Command.DENIED:               this.process_denied(rep.reason); break;
            case Command.REGISTRATIONACCEPTED: this.process_registration_accepted(); break;
            case Command.REGISTRATIONDENIED:   this.process_registration_denied(rep.reason); break;
            case Command.AGREEMENT:            this.process_confirm_agreement(rep.terms); break;
            case Command.PONG:                 this.process_pong(); break;
            case Command.ADDUSER:              this.process_add_user(rep); break;
            case Command.BATTLEOPENED:         this.process_add_battle(rep); break;
            case Command.JOINEDBATTLE:         this.process_joined_battle(rep); break;
            case Command.LEFTBATTLE:           this.process_left_battle(rep); break;
            case Command.CLIENTSTATUS:         this.process_client_status(rep); break;
        }
    }

    private setup_wiring()
    {
        this.server.on_incoming = (rep) => { this.process(rep); } ;

        sl.gui.on_login       = (user, passwd)        => { this.login(user, passwd); };
        sl.gui.on_register    = (user, passwd, email) => { this.register(user, passwd, email); };
        sl.gui.on_acceptterms = (code)                => { this.accept_terms(code); };
    }
}
