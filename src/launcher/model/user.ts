//
// User (player) model
//

import { sl } from "../../renderer";


export class User
{
    public readonly id:      string;
    public readonly name:    string;
    public readonly country: string;
    public readonly client:  string;

    constructor(id: string, name: string, country: string, client: string)
    {
        this.id      = id;
        this.name    = name;
        this.country = country;
        this.client  = client;
    }

    public display()
    {
        sl.gui.display_user(this);
    }
}

