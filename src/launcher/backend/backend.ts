//
// Common Backend Entrypoint
//
import { IServer } from "./server";

import { sl } from "../../renderer";

import { Event } from "../events/keys";

import { UberServer }  from "./uberserver/server";
import { LocalServer } from "./local/server";


export class Backend
{
    private server: IServer | null;

    constructor()
    {
        this.server = null;

        this.setup_events();
    }

    private setup_events()
    {
        sl.events.on(Event.MODE_LOCAL, () => {
            this.server = new LocalServer();
        });

        sl.events.on(Event.MODE_ONLINE, (cfg) => {
            this.server = new UberServer(cfg.host, cfg.port);
        });
    }
}
