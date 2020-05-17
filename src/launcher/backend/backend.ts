//
// Backend Driver
//
// Switches mode and acts as a facade to the backend
//
import { mixin }     from "../../common/mixin";
import { Events }    from "../../common/events";

import { UberBackend }  from "./uberserver/uber";
import { LocalBackend } from "./autumnserver/autumn";

import { BackendEvents } from "./events";
import { OnlineMode }    from "./events";
import { OfflineMode }   from "./events";


export class Backend
{
    private server: null | LocalBackend | UberBackend;

    private static __instance: Backend;

    private constructor()
    {
        this.server = null;

        this.setup_listeners();
    }

    public static instance(): Backend
    {
        if (!Backend.__instance) {
            Backend.__instance = new Backend();
        }

        return Backend.__instance;
    }

    private setup_listeners()
    {
        this.register("mode", (mode) => { this.handle_modeswitch(mode); });
    }

    private handle_modeswitch(mode: OnlineMode | OfflineMode)
    {
        if (this.server != null) {
            this.server.disconnect();
        }

        switch (mode.mode)
        {
            case "online":
                switch (mode.type)
                {
                    case "uberserver":
                        this.server = new UberBackend(this, mode.host, mode.port);
                        break;
                }
                break;

            case "offline":
                this.server = new LocalBackend(this, mode.username);
                break;
        }
    }
}


export interface Backend extends Events<BackendEvents> {};

mixin(Backend, [new Events<BackendEvents>()]);