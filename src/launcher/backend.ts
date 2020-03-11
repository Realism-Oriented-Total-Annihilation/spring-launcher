//
// Backend Driver
//
// Switches mode and acts as a facade to the backend
//
import { UberBackend }  from "./backend/uber";
import { LocalBackend } from "./backend/local";


export enum BackendMode
{
    Online,
    Local,
}


export class Backend
{
    private backend: UberBackend | LocalBackend;

    constructor()
    {
        this.backend = <any>null;
    }

    public mode(mode: BackendMode)
    {
        switch (mode)
        {
            case BackendMode.Online:
                this.backend = new UberBackend("localhost", 8256);
                break;

            case BackendMode.Local:
                this.backend = new LocalBackend();
                break;
        }
    }
}
