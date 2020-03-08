//
// Uber Lobby Server
//
import { Socket } from "net";

import { UberEvents } from "./events";

import { PtclBuffer } from "./handling/buffer";



export class UberServer
{
    private sock:    Socket;
    private timer:   NodeJS.Timeout;
    private buffer:  PtclBuffer;
    private timeout: number;
    private commands: UberEvents;

    public constructor(host: string, port: number, timeout?: number)
    {
        this.sock     = new Socket();
        this.buffer   = new PtclBuffer();
        this.commands = new UberEvents();

        this.timeout = timeout ? timeout : 5000;

        this.setup_socket();
        this.setup_wiring();

        this.sock.connect(port, host);

        this.timer = this.reset_timer();
    }

    // public static instance()
    // {
    //     if (!this._instance) {
    //         throw "Accessing UberServer singleton instance before being built!";
    //     }

    //     return this._instance;
    // }

    public addr_local(): string
    {
        return this.sock.localAddress;
    }

    protected send(cmd: Request)
    {
        let raw = PtclCommand[cmd.command];

        if (cmd.words()) {
            raw += ` ${cmd.words().join(" ")}`;
        }

        if (cmd.sentences()) {
            raw += `\t${cmd.sentences().join("\t")}`
        }

        console.debug(`[server][>] ${raw}`);

        raw += "\n";

        this.reset_timer();
        this.sock.write(raw);
    }

    protected recv(data: string)
    {
        this.buffer.append(data);

        let lines = this.buffer.lines();

        for (let line of lines)
        {
            let cmd = PtclRespMsg.from_line(line);

            if (cmd) {
                this.commands.emit(PtclCommand[cmd.command], cmd);
            }
        }
    }

    protected async query<C extends PtclResponse>(req: PtclRequest, timeout?: number): Promise<C>
    {
        let tout = timeout ? timeout : this.timeout;

        return new Promise((resolve, reject) =>
        {
            if (req.response_ok)
            {
                this.commands.once(PtclCommand[req.response_ok], (rep) =>
                {
                    setTimeout(() => { reject(); }, timeout);
                    resolve(rep);
                });
            }

            if (req.response_err)
            {
                this.commands.once(PtclCommand[req.response_err], (rep) =>
                {
                    setTimeout(() => { reject(); }, timeout);
                    reject(rep);
                });
            }

            this.send(req);
        });
    }

    private setup_socket()
    {
        this.sock.setEncoding("utf8");
    }

    private setup_wiring()
    {
        this.sock.addListener("ready", () => {
            // this.setup_events(); this.events.emit(Event.SERVER_READY);
        });

        this.sock.addListener("data", (data: string) => {
            this.recv(data);
        });
    }

    private setup_events()
    {
        // this.sock.addListener("close", () => { this.events.emit(Event.SERVER_CLOSED); });
        // this.sock.addListener("error", () => { this.events.emit(Event.SERVER_FAILED); });

        // this.events.on(Event.REQUEST, (cmd) => { this.send(cmd); });
    }

    private reset_timer(): NodeJS.Timeout
    {
        clearInterval(this.timer);

        this.timer = setInterval(
            () => { this.send(new RequestPing()); },
            30000
        );

        return this.timer;
    }
}
