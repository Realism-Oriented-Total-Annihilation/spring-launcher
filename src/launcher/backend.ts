//
// Backend Driver
//
// Switches mode and acts as a facade to the backend
//
import { UberBackend }  from "./backend/uber";
import { LocalBackend } from "./backend/local";

import { User }   from "./model/user";
import { Battle } from "./model/battle";


export enum BackendMode
{
    Online,
    Local,
}

type UserId   = string;
type BattleId = string;

export class Backend
{
    private server: UberBackend | LocalBackend;

    public players: Map<UserId,   User>;
    public battles: Map<BattleId, Battle>;

    private static _instance: Backend;

    private constructor()
    {
        this.server = <any>null;

        this.players   = new Map();
        this.battles = new Map();
    }

    public static instance(): Backend
    {
        if (!Backend._instance) {
            Backend._instance = new Backend();
        }

        return Backend._instance;
    }

    public mode(mode: BackendMode)
    {
        switch (mode)
        {
            case BackendMode.Online:
                // this.server = new UberBackend("localhost", 8200);
                this.server = new UberBackend("78.46.100.157", 8200);
                break;

            case BackendMode.Local:
                this.server = new LocalBackend();
                break;
        }
    }
}
