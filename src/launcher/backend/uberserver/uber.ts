//
// Uberserver Backend
//
import { mixin } from "../../../common/mixin";

import { Backend } from "../backend";

import { UberServer }   from "./server";
import { UberProtocol } from "./protocol";
import { OnlineCredentials } from "../events";


export class UberBackend
{
    private events: Backend;
    private server: UberServer;

    constructor(events: Backend, host: string, port: number)
    {
        this.events = events;

        this.server = new UberServer(host, port);
        this.server.on_incoming = (rep) => { this.process_incoming(rep); };

        this.setup_listeners();
    }

    public disconnect()
    {
        // TODO
    }

    private setup_listeners()
    {
        this.events.register("login", (creds) => { this.handle_connect(creds); });
    }

    private handle_connect(creds: OnlineCredentials)
    {
        this.server.login(creds.username, creds.password);
    }

    private process_incoming(msg: Response)
    {

    }
}
