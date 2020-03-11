//
//
//
import { WidgetBase } from "../widgets/base";


// Not sure if it has to be a div
export class BattleList extends WidgetBase<HTMLDivElement>
{
    private list: HTMLTableElement;
    private head: HTMLTableRowElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));

        this.list = document.createElement("table");
        this.head = document.createElement("tr");

        this.setup_dom();
        // this.setup_events();
    }

    private setup_dom()
    {
        this.container.id = "battlelist";
        this.list.id      = "battletable";

        this.container.appendChild(this.list);
    }

    private add_header(name: string)
    {
        let h = document.createElement("th");
        h.innerText = name;
        this.head.appendChild(h);
    }

    // In the future will have to be public and called by backend
    private add_battle(name: string, players: number, max: number, game: string, map: string)
    {
        let battle = document.createElement("tr");

        this.add_td(battle, name);
        this.add_td(battle, `${players}/${max}`);
        this.add_td(battle, game);
        this.add_td(battle, map);

        this.list.appendChild(battle);
    }

    private add_td(parent: HTMLTableRowElement, content: string)
    {
        let td = document.createElement("td");
        td.innerText = content;
        parent.appendChild(td);
    }

    // private setup_events()
    // {
    //     sl.events.on(Event.RESPONSE_BATTLE_OPENED, (battle) => {
    //         this.add_battle(
    //             battle.title,
    //             0,
    //             battle.maxplayers,
    //             battle.gamename,
    //             battle.map
    //         )
    //     });
    // }
}
