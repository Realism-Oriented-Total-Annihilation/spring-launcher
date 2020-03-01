//
//
//
import { Socket } from "net";

import * as crypto from "crypto-js";

var md5    = crypto.MD5;
var base64 = crypto.enc.Base64;

import { sl } from "../../../renderer";

import { Event }               from "../../events/keys";
import { EvLoginCredentials }    from "../../events/auth";
import { EvRegisterCredentials } from "../../events/auth";

import * as cmd from "./cmds";

import { Message }     from "./msg";
import { MessageType } from "./cmds";

import { PtclLoginOk }        from "./ptcl";
import { PtctRegistrationOk } from "./ptcl";


export class UberServer
{
    private sock: Socket;

    constructor(host: string, port: number)
    {
        this.sock = new Socket();

        this.setup_socket();
        this.setup_wiring();

        this.sock.connect(port, host);
    }

    public login(creds: EvLoginCredentials)
    {
        this.send(MessageType.LOGIN,
            [creds.user, creds.password, "0", this.sock.localAddress],
            ["Spring Launcher"]
        );
    }

    public register(creds: EvRegisterCredentials)
    {
        this.send(MessageType.REGISTER,
            [creds.user, base64.stringify(md5(creds.password)), creds.email]
        );
    }

    private send(cmd: MessageType, words?: string[], sentences?: string[])
    {
        let raw = `${MessageType[cmd]}`;

        if (words) {
            raw += ` ${words.join(" ")}`;
        }

        if (sentences) {
            raw += `\t${sentences.join("\t")}`
        }

        raw += "\n";

        console.debug(`[server][>] ${raw}`);

        this.sock.write(raw);
    }

    private recv(raw: string)
    {
        console.debug(`[server][<] ${raw}`);

        let msg = new Message(raw);

        switch (msg.command)
        {
            case MessageType.ACCEPTED:             sl.events.emit(Event.RESPONSE_LOGIN_OK,           msg.into_login_ok()); break;
            case MessageType.DENIED:               sl.events.emit(Event.RESPONSE_LOGIN_ERROR,        msg.into_login_error()); break;
            case MessageType.REGISTRATIONACCEPTED: sl.events.emit(Event.RESPONSE_REGISTRATION_OK,    msg.into_registration_ok()); break;
            case MessageType.REGISTRATIONDENIED:   sl.events.emit(Event.RESPONSE_REGISTRATION_ERROR, msg.into_registration_error()); break;

            default:
                console.warn(`Protocol handling not yet implemented for: ${MessageType[msg.command]}`);
        }
    }

    private setup_socket()
    {
        this.sock.setEncoding("utf8");
    }

    private setup_wiring()
    {
        this.sock.addListener("ready", () => {
            this.setup_events(); sl.events.emit(Event.SERVER_READY);
        });

        this.sock.addListener("data", (data: string) => {
            this.recv(data);
        });
    }

    private setup_events()
    {
        this.sock.addListener("close", () => {
            sl.events.emit(Event.SERVER_CLOSED);
        });

        this.sock.addListener("error", () => {
            sl.events.emit(Event.SERVER_FAILED);
        });

        sl.events.on(Event.REQUEST_LOGIN,    (creds) => { this.login(creds); })
        sl.events.on(Event.REQUEST_REGISTER, (creds) => { this.register(creds); })
    }
}
