//
// Uber Lobby Server
//
import { Socket } from "net";

import { UberEvents } from "./events";

import { PtclBuffer } from "./handling/buffer";

import { IRequest }  from "./reqs/request";
import { parse }     from "./reps/response";
import { Response }  from "./reps/response";

import { Command }  from "./cmds";

import { ReqPing } from "./reqs/misc";


export class UberServer
{
    public on_incoming: (rep: Response) => void = () => {};

    private sock:   Socket;
    private timer:  NodeJS.Timeout;
    private buffer: PtclBuffer;

    // protected commands: UberEvents;
    protected timeout:  number;

    public constructor(host: string, port: number, timeout?: number)
    {
        this.sock     = new Socket();
        this.buffer   = new PtclBuffer();
        // this.commands = new UberEvents();

        this.timeout = timeout ? timeout : 5000;

        this.setup_socket();
        this.setup_wiring();

        this.sock.connect(port, host);

        this.timer = this.reset_timer();
    }

    public addr_local(): string
    {
        return this.sock.localAddress;
    }

    public request(cmd: IRequest)
    {
        let raw = Command[cmd.command];

        if (cmd.words()) {
            raw += ` ${cmd.words().join(" ")}`;
        }

        if (cmd.sentences()) {
            raw += ` ${cmd.sentences().join("\t")}`
        }

        console.debug(`[server][>] ${raw}`);

        raw += "\n";

        this.sock.write(raw);
        this.reset_timer();
    }

    private recv(data: string)
    {
        this.buffer.append(data);

        let lines = this.buffer.lines();

        for (let line of lines)
        {
            let rep = parse(line);

            if (rep)
            {
                console.info(`[server][<] ${Command[rep.command]}`);
                this.on_incoming(rep);
            }
        }
    }

    private setup_socket()
    {
        this.sock.setEncoding("utf8");
    }

    private setup_wiring()
    {
        this.sock.addListener("ready", () => {
            this.setup_events();
            this.reset_timer();
        });

        this.sock.addListener("data", (data: string) => {
            this.recv(data);
        });
    }

    private setup_events()
    {
        this.sock.addListener("close", () => { /* NOOP */ });
        this.sock.addListener("error", () => { /* NOOP */ });
    }

    private reset_timer(): NodeJS.Timeout
    {
        clearInterval(this.timer);

        this.timer = setInterval(
            () => { this.request(new ReqPing()); },
            30000
        );

        return this.timer;
    }
}
