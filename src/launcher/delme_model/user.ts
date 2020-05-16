//
// User (player) model
//
import { sl } from "../../renderer";

import { UserWidget } from "../gui/mainwindow/content/tabs/chat/players";


export class User
{
    public readonly id:      string;
    public readonly name:    string;
    public readonly country: string;
    public readonly client:  string;

    // Status
    public ingame:    boolean;
    public afk:       boolean;
    public rank:      number;
    public moderator: boolean;
    public bot:       boolean;

    private widget: UserWidget;

    constructor(id: string, name: string, country: string, client: string)
    {
        this.id      = id;
        this.name    = name;
        this.country = country;
        this.client  = client;

        // Status
        this.ingame    = false;
        this.afk       = false;
        this.rank      = 0;
        this.moderator = false;
        this.bot       = false;

        this.widget = sl.gui.create_user();

        this.update();
    }

    public update()
    {
        this.widget.rank   = sl.backend.players.get(this.name)?.rank;
        this.widget.name   = this.name;
        this.widget.country = this.country
    }
}