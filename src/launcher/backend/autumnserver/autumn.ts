//
// Backend allowing for LAN/Offline Games
//
// Currently limited to just offline. Down the road it should harness a server instance which would allow for
// LAN games as well.
//
import { Backend } from "../backend";


export class LocalBackend
{
    private username: string | null;

    private backend: Backend;

    constructor(backend: Backend, username: string)
    {
        this.username = username;

        this.backend = backend;

        this.setup_listeners();
    }

    public disconnect()
    {
        // NOOP
    }

    private setup_listeners()
    {

    }
}
