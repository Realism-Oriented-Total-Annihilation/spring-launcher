//
// Battlelist tab classes
//
import { WidgetBase } from "../../../../common/widget";


export class BattleWidget extends WidgetBase<HTMLTableRowElement>
{
    private column_name:    HTMLTableDataCellElement;
    private column_players: HTMLTableDataCellElement;
    private column_game:    HTMLTableDataCellElement;
    private column_map:     HTMLTableDataCellElement;
    private column_founder: HTMLTableDataCellElement;
    private column_country: HTMLTableDataCellElement;

    constructor(parent: HTMLTableElement)
    {
        super(parent, document.createElement("tr"), { mode: "table-row" });

        this.column_name    = document.createElement("td");
        this.column_players = document.createElement("td");
        this.column_game    = document.createElement("td");
        this.column_map     = document.createElement("td");
        this.column_founder = document.createElement("td");
        this.column_country = document.createElement("td");

        this.container.appendChild(this.column_name);
        this.container.appendChild(this.column_players);
        this.container.appendChild(this.column_game);
        this.container.appendChild(this.column_map);
        this.container.appendChild(this.column_founder);
        this.container.appendChild(this.column_country);

        this.show();
    }

    public set title(title: string) {
        this.column_name.innerText = title;
    }

    public set players(players: string)
    {
        this.column_players.innerText = players;
    }

    public set game(game: string) {
        this.column_game.innerText = game;
    }

    public set map(map: string) {
        this.column_map.innerText = map;
    }

    public set founder(founder: string) {
        this.column_founder.innerText = founder;
    }

    public set country(country: string | undefined) {
        let uri = `./flags/${country?.toLowerCase()}.png`;

        this.column_country.style.width          = "60px";
        this.column_country.style.background     = `url(${uri})`;
        this.column_country.style.backgroundSize = `100% 100%`;
    }
}


export class BattleList extends WidgetBase<HTMLDivElement>
{
    private table: HTMLTableElement;
    private head:  HTMLTableRowElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));

        this.table = document.createElement("table");
        this.head  = document.createElement("tr");

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.id = "battlelist";
        this.table.id     = "battletable";

        this.add_header("Battle Name");
        this.add_header("Players");
        this.add_header("Game");
        this.add_header("Map");
        this.add_header("Host");
        this.add_header("Country");

        this.table.appendChild(this.head);
        this.container.appendChild(this.table);
    }

    private add_header(name: string)
    {
        let h = document.createElement("th");
        h.innerText = name;
        this.head.appendChild(h);
    }

    public create_battle(): BattleWidget
    {
        let battle = new BattleWidget(this.table);

        this.update();

        return battle;
    }

    private update()
    {
        let idx = 0;

        for (let row of this.table.rows)
        {
            if (row.style.display == "none") {
                continue;
            }

            if (idx % 2 == 0) {
                row.className = "tr-even";
            } else {
                row.className = "tr-odd";
            }

            idx++;
        }
    }
}
