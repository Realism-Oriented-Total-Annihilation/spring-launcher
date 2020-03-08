//
// Backend Driver
//
// Switches mode and acts as a facade to the backend
//
import { IBackend } from "./backend/iface";

import { UberBackend }  from "./backend/uber";
import { LocalBackend } from "./backend/local";


export enum BackendMode
{
    Online,
    Local,
}


export class Backend implements IBackend
{
    private backend: IBackend;

    constructor()
    {
        this.backend = <any>null;
    }

    public mode(mode: BackendMode)
    {
        switch (mode)
        {
            case BackendMode.Online:
                this.backend = new UberBackend("localhost", 8255);
                break;

            case BackendMode.Local:
                this.backend = new LocalBackend();
                break;
        }
    }

    public async ping(): Promise<number>
    {
        return this.backend.ping();
    }

    public async login(user: string, passwd: string): Promise<void>
    {
        return this.backend.login(user, passwd);
    }

    public async register(user: string, passwd: string, email: string): Promise<void>
    {
        return this.backend.register(user, passwd, email);
    }

    public async accept_terms(code?: string): Promise<void>
    {
        return this.backend.accept_terms(code);
    }
}
