//
// Local Server Instance (Offline and LAN Games)
//
import { IBackend } from "./iface";


export class LocalBackend
{
    private user: string | null;

    constructor()
    {
        this.user = null;
    }

    async ping(): Promise<number>
    {
        return 0;
    }

    async login(user: string, passwd: string): Promise<void>
    {
        this.user = user;
    }

    async register(user: string, passwd: string, email: string): Promise<void>
    {
        // NOOP
    }

    async accept_terms(code?: string): Promise<void>
    {
        // NOOP
    }
}
