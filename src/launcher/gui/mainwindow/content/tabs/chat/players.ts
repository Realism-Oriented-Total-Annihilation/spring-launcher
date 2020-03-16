//
// Online players Display
//
import { WidgetBase } from "../../../../../common/widget";
import { User }       from "../../../../../model/user";



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

        this.add_header("Username");
        this.add_header("Country");

        this.table.appendChild(this.head);
        this.container.appendChild(this.table);
    }

    public add_player(user: User)
    {
        let uri = `./flags/${user.country.toLowerCase()}.png`;

        let player = document.createElement("tr");

        let td_name    = document.createElement("td");
        let td_country = document.createElement("td");

        td_name.innerText = user.name;

        td_country.style.width = "60px";
        td_country.style.background = `url(${uri})`;
        td_country.style.backgroundSize = `100% 100%`;

        player.appendChild(td_name);
        player.appendChild(td_country);

        this.table.appendChild(player);
    }

    private add_header(name: string)
    {
        let h = document.createElement("th");
        h.innerText = name;
        this.head.appendChild(h);
    }

    public inner(): HTMLDivElement
    {
        return this.container;
    }
}