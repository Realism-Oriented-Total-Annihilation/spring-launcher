//
// Uber Lobby Server (Online / WAN Games)
//
import { UberServer } from "./uberserver/server";


export class UberBackend
{
    private server: UberServer;

    constructor(host: string, port: number)
    {
        this.server = new UberServer(host, port);
    }

    async ping(): Promise<number>
    {
        return 0;
    }

    async login(user: string, passwd: string): Promise<void>
    {
        let req = new ReqLogin(user, passwd);


    }

    async register(user: string, passwd: string, email: string): Promise<void>
    {

    }

    async accept_terms(code?: string): Promise<void>
    {

    }
}
