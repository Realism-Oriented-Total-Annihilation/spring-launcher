//
// Common Backend Entrypoint
//
import { IServer } from "./server";

import { sl } from "../../renderer";

import { Event } from "../events/keys";

import { UberServer }  from "./uberserver/server";
import { LocalServer } from "./local/server";
import { EvGuiMode } from "../events/gui";


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
        sl.events.on(Event.SELECT_MODE, (mode) =>
        {
            switch (mode)
            {
                case EvGuiMode.LOGIN_ONLINE:
                    this.server = new UberServer("localhost", 8200);
                    break;

                case EvGuiMode.LOGIN_OFFLINE:
                    this.server = new LocalServer();
                    break;

                default:
                    break;
            }
        });
    }
}
