//
// Uberserver Backend
//
import { mixin } from "../../../common/mixin";

import { Backend } from "../backend";

import { UberSocket }   from "./server";
import { UberInbound } from "./inbound";
import { UberOutbound } from "./outbound";


export class UberBackend
{
    private events: Backend;

    private host: string;
    private port: number;

    private timer:   NodeJS.Timeout;
    // private timeout: number;

    constructor(events: Backend, host: string, port: number)
    {
        this.events = events;

        this.host = host;
        this.port = port;

        this.timer   = this.reset_timer();
        // this.timeout = 5000;                // timeout ? timeout : 5000;

        this.setup_listeners();
        this.setup_wiring();
        this.setup_socket();

        this.socket.connect(this.port, this.host);
    }

    private setup_listeners()
    {
        this.events.register("login", (creds) => { this.out_login(creds.username, creds.password, this.socket.localAddress);  });
    }

    private setup_wiring()
    {
        this.handle_inbound = this.inbound;
        this.outbound       = this.handle_outbound;

        this.socket.addListener("close", () => { /* NOOP */ });
        this.socket.addListener("error", () => { /* NOOP */ });

        this.socket.addListener("ready", ()             => { this.reset_timer(); });
        this.socket.addListener("data",  (data: string) => { this.socket_receive(data); });
    }

    private setup_socket()
    {
        this.socket.setEncoding("utf8");
    }

    public reset_timer(): NodeJS.Timeout
    {
        clearInterval(this.timer);

        this.timer = setInterval(
            () => { this.out_ping(); },
            30000
        );

        return this.timer;
    }
}


export interface UberBackend extends UberInbound, UberOutbound, UberSocket {}

mixin(UberBackend, [UberInbound, UberOutbound, UberSocket]);
