//
//
//
import { Socket } from "net";

import { sl } from "../../../launcher";

import { Event }               from "../../events/keys";
import { LoginCredentials }    from "../../events/auth";
import { RegisterCredentials } from "../../events/auth";

import * as cmd from "./cmds";

import { Message }     from "./msg";
import { MessageType } from "./cmds";

import { PtclAccepted }             from "./ptcl";
import { PtctRegistrationAccepted } from "./ptcl";


export class Server
{
    private sock: Socket;

    constructor(host: string, port: number)
    {
        this.sock = new Socket();

        this.setup_socket();
        this.setup_wiring();

        this.sock.connect(port, host);
    }

    public login(creds: LoginCredentials)
    {
        this.send(MessageType.LOGIN,
            [creds.user, creds.password, "0", this.sock.localAddress],
            ["Spring Launcher"]
        );
    }

    public register(creds: RegisterCredentials)
    {
        this.send(MessageType.REGISTER,
            [creds.user, creds.password, creds.email]
        );
    }

    private send(cmd: MessageType, words?: string[], sentences?: string[])
    {
        let raw = `${cmd}`;

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
            case MessageType.ACCEPTED:             sl.events.emit(Event.RESPONSE_ACCEPTED,   msg.into_accepted()); break;
            case MessageType.REGISTRATIONACCEPTED: sl.events.emit(Event.RESPONSE_REGISTERED, msg.into_registered()); break;

            default:
                console.warn(`Protocol message not yet implemented for: ${msg}`);
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
        sl.events.on(Event.REQUEST_REGISTER, (creds) => { this.login(creds); })
    }
}
