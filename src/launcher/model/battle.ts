//
// Battle Data Model
//
import { sl } from "../../renderer";

import { User } from "./user";

import { BattleListRowWidget } from "../gui/mainwindow/content/tabs/battlelist";


export class Battle
{
    public readonly title:      string;
    public readonly id:         string;
    public readonly founder:    string;
    public readonly maxplayers: string;
    public readonly passworded: string;
    public readonly rank:       string;
    public readonly map:        string;
    public readonly game:       string;
    // public readonly channel:        string;

    public readonly players: Map<string, User>;

    private battlelist_row:  BattleListRowWidget;
    // private battlelist_info: BattleListInfoWidget;

    // private battleroom_widget: BattleRoomWidget;
    // private battleroom_map:      BattleRoomMapWidget;
    // private battleroom_settings: BattleRoomSettingsWidget;

    public constructor(title: string, id: string, founder: string, maxplayers: string, passworded: string, rank: string, map: string, game: string)
    {
        this.title      = title;
        this.id         = id;
        this.founder    = founder;
        this.maxplayers = maxplayers;
        this.passworded = passworded;
        this.rank       = rank;
        this.map        = map;
        this.game       = game;

        this.players = new Map();

        this.battlelist_row = sl.gui.create_battle();

        this.update();
    }

    public close()
    {
        // sl.gui.remove_battle(this);
        sl.backend.battles.delete(this.id);
    }

    public joined(user: User)
    {
        this.players.set(user.name, user);
        this.update();
    }

    public left(user: User)
    {
        this.update()
    }

    private update()
    {
        this.battlelist_row.title   = this.title;
        this.battlelist_row.players = `${this.players.size}/${this.maxplayers}`;
        this.battlelist_row.game    = this.game;
        this.battlelist_row.map     = this.map;
        this.battlelist_row.founder = this.founder;
        this.battlelist_row.country = sl.backend.players.get(this.founder)?.country;
    }
}
