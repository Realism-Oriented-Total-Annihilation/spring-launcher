//
// Online players Display
//
import { WidgetBase } from "../../../../../common/widget";


export class UserWidget extends WidgetBase<HTMLTableRowElement>
{
    private column_rank:    HTMLTableDataCellElement;
    private column_name:    HTMLTableDataCellElement;
    private column_country: HTMLTableDataCellElement;

    constructor(parent: HTMLTableElement)
    {
        super(parent, document.createElement("tr"), { mode: "table-row" })

        this.column_rank    = document.createElement("td");
        this.column_name    = document.createElement("td");
        this.column_country = document.createElement("td");

        this.container.appendChild(this.column_rank);
        this.container.appendChild(this.column_name);
        this.container.appendChild(this.column_country);

        this.show();
    }

    public set rank(_rank: number | undefined)
    {
        let rank = `${_rank}`

        let uri = `./ranks/${rank.toLowerCase()}.png`;

        this.column_rank.style.width          = "20px";
        this.column_rank.style.background     = `url(${uri})`;
        this.column_rank.style.backgroundSize = `100% 100%`;
    }

    public set name(name: string) {
        this.column_name.innerText = name;
    }

    public set country(country: string | undefined) {
        let uri = `./flags/${country?.toLowerCase()}.png`;

        this.column_country.style.width          = "60px";
        this.column_country.style.background     = `url(${uri})`;
        this.column_country.style.backgroundSize = `100% 100%`;
    }
}

export class ChatPlayers extends WidgetBase<HTMLDivElement>
{
    public on_newuser: (username: string, country: string) => void = () => {};

    private table: HTMLTableElement;
    private head:  HTMLTableRowElement;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" })

        this.table = document.createElement("table");
        this.head = document.createElement("tr");

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.id = "chatplayers";
        this.table.id     = "playerstable";


        let rank =  this.add_header("");
        rank.style.width = "20px";

        this.add_header("Username");
        this.add_header("Country");

        this.table.appendChild(this.head);
        this.container.appendChild(this.table);
    }

    public create_user(): UserWidget
    {
        let user = new UserWidget(this.table);

        this.update();

        return user;
    }

    private add_header(name: string): HTMLTableHeaderCellElement
    {
        let h = document.createElement("th");
        h.innerText = name;

        this.head.appendChild(h);

        return h;
    }

    public inner(): HTMLDivElement
    {
        return this.container;
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