//
// Backend Driver
//
// Switches mode and acts as a facade to the backend
//
import { UberBackend }  from "./backend/uber";
import { LocalBackend } from "./backend/local";
import { RepAddUser } from "./backend/uberserver/reps/misc";


export enum BackendMode
{
    Online,
    Local,
}


export class Backend
{
    private backend: UberBackend | LocalBackend;

    public users: Array<RepAddUser>;

    constructor()
    {
        this.backend = <any>null;
        this.users = [];
    }

    public mode(mode: BackendMode)
    {
        switch (mode)
        {
            case BackendMode.Online:
                this.backend = new UberBackend("localhost", 8256);
                // this.backend = new UberBackend("78.46.100.157", 8200);
                break;

            case BackendMode.Local:
                this.backend = new LocalBackend();
                break;
        }
    }
}
