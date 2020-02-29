//
//
//
import { Socket } from "net";

import { sl } from "../../launcher";

import { LoginCredentials, RegisterCredentials } from "../events/auth";

import * as cmd from "./cmds";
import { MessageType } from "./cmds";

import {
    PtclAccepted,
    PtctRegistrationAccepted
} from "./ptcl";


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
        this.handle_outgoing("LOGIN",
            [creds.user, creds.password, "0", this.sock.localAddress],
            ["Spring Launcher"]
        );
    }

    public register(creds: RegisterCredentials)
    {
        this.handle_outgoing("REGISTER",
            [creds.user, creds.password, creds.email]
        );
    }

    private handle_outgoing(cmd: MessageType, words?: string[], sentences?: string[])
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

    private handle_incoming(raw: string)
    {
        console.debug(`[server][<] ${raw}`);

        let msg = new Message(raw);

        switch (msg.command)
        {
            case "ACCEPTED":             sl.events.emit("server.msg.accepted",   msg.into_accepted()); break;
            case "REGISTRATIONACCEPTED": sl.events.emit("server.msg.registered", msg.into_registered()); break;

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
            this.setup_events(); sl.events.emit("server.sock.ready");
        });

        this.sock.addListener("data", (data: string) => {
            this.handle_incoming(data);
        });
    }

    private setup_events()
    {
        this.sock.addListener("close", () => {
            sl.events.emit("server.sock.closed");
        });

        this.sock.addListener("error", () => {
            sl.events.emit("server.sock.failed");
        });

        sl.events.on("auth.login",    (creds) => { this.login(creds); })
        sl.events.on("auth.register", (creds) => { this.login(creds); })
    }
}


class Message
{
    public readonly raw:       string;
    public readonly command:   MessageType;
    public readonly words:     string[];
    public readonly sentences: string[];

    constructor(raw: string)
    {
        this.raw = raw;

        let args = raw.split("\t", 1);

        this.words     = args[0].split("\n");
        this.sentences = args[1].split("\t");

        this.command = cmd.from_string(this.words[0]);
        this.words.splice(0, 1);  // remove command from top
    }

    public into_accepted(): PtclAccepted
    {
        return {username: this.words[0]};
    }

    public into_registered(): PtctRegistrationAccepted
    {
        return {}
    }
}
