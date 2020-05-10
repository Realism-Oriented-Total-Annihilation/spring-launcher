//
//
//
import { WidgetBase } from "../../../../common/widget";
import { VizEvents, ListenerHandle } from "../../../../backend/uberserver/events";


export class BattleRoom extends WidgetBase<HTMLDivElement>
{
    private players_chat:  HTMLDivElement;
    private matchplayers: MatchPlayers;
    private matchchat:    MatchChat;

    private matchinfo:    MatchInfo;

    private events = VizEvents.instance();

    private handle_add_battle: ListenerHandle;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" });

        this.players_chat = document.createElement("div");

        this.matchplayers = new MatchPlayers(this.players_chat);
        this.matchchat    = new MatchChat(this.players_chat);
        this.container.appendChild(this.players_chat);

        this.matchinfo = new MatchInfo(this.container);

        this.handle_add_battle = <any>null;

        this.setup_dom();
    }

    private setup_dom()
    {
        this.players_chat.id = "battleroom_leftdiv";
        this.container.id    = "battleroom";
    }

    private setup_registring()
    {
        this.handle_add_battle = this.events.register("newbattle", ({}) => {
            // functionality
        })
    }

    private setup_listening()
    {
        this.handle_add_battle.listen();
    }


    public show()
    {
        this.matchplayers.show();
        this.matchchat.show();
        this.matchinfo.show();
        super.show();
    }
}

export class BattleroomSettingsWidget extends WidgetBase<HTMLDivElement>
{
    // private max_units: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"))

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.id = "battleroomsettingsdiv";  // FIXME
    }
}

class PlayerWidget extends WidgetBase<HTMLTableRowElement>
{
    public td_ready:    HTMLTableDataCellElement;
    public td_color:    HTMLTableDataCellElement;
    public td_rank:     HTMLTableDataCellElement;
    public td_username: HTMLTableDataCellElement;
    public td_faction:  HTMLTableDataCellElement;
    public td_team:     HTMLTableDataCellElement;
    public td_country:  HTMLTableDataCellElement;

    constructor(parent: HTMLTableSectionElement)
    {
        super(parent, document.createElement("tr"))

        this.td_ready    = document.createElement("td");
        this.td_color    = document.createElement("td");
        this.td_rank     = document.createElement("td");
        this.td_username = document.createElement("td");
        this.td_faction  = document.createElement("td");
        this.td_team     = document.createElement("td");
        this.td_country  = document.createElement("td");

        this.container.appendChild(this.td_ready);
        this.container.appendChild(this.td_color);
        this.container.appendChild(this.td_rank);
        this.container.appendChild(this.td_username);
        this.container.appendChild(this.td_faction);
        this.container.appendChild(this.td_team);
        this.container.appendChild(this.td_country);

        this.setup_dom();
        this.setup_wiring();
        this.show();
    }

    private setup_dom()
    {
        this.container.className = "battleplayer";
    }

    private setup_wiring()
    {
        let team = 0;

        this.td_team.onmousedown = (ev) => {
            let team = parseInt(this.td_team.innerText);

            switch (ev.button)
            {
                case 0: // Left Button
                    team++;
                    break;

                case 2: // Right Button
                    team--;
                    break;
            }

            team = team % 11;

            this.td_team.innerText = `${team}`;
        }

        this.td_color.addEventListener("click", () => {
            // Open color pallete
        })

        this.td_faction.addEventListener("click", () => {
            switch (this.td_faction.id) {
                case "armpic":
                    // set faction
                    break;
                case "corepic":
                    // set faction
                    break;
                case "":
                    // set faction

                    break;
                default:
                    break;
            }
        })
    }

    public set name(name: string)
    {
        this.td_username.innerText = name;
    }

    public set country(country: string | undefined)
    {
        let uri = `./flags/${country?.toLowerCase()}.png`;

        this.td_country.style.width          = "60px";
        this.td_country.style.background     = `url(${uri})`;
        this.td_country.style.backgroundSize = `100% 100%`;
    }

    public set rank(rank: string | undefined)
    {
        let uri = `./flags/${rank?.toLowerCase()}.png`;

        this.td_rank.style.width          = "60px";
        this.td_rank.style.background     = `url(${uri})`;
        this.td_rank.style.backgroundSize = `100% 100%`;
    }

    public set ready(ready: boolean)
    {
        if (ready) {
            this.td_ready.id = "readypic";
        }
    }

    public set color(color: string)
    {
        this.td_color.style.backgroundColor = `${color}`;
    }

    public set faction(fac: "arm" | "noe" | "?")
    {
        switch (fac) {
            case "arm":
                this.td_faction.id = "armpic";
                break;

            case "noe":
                this.td_faction.id = "armpic";
                break;

            case "?":
                this.td_faction.innerText = "?";
                this.td_faction.id = "";

            default:
                this.td_faction.innerText = "?";
                this.td_faction.id = "";
                break;
        }
    }

    public set team(team: number)
    {
        this.td_team.innerText = `${team}`
    }
}


class MatchPlayers extends WidgetBase<HTMLTableElement>
{
    private thead: HTMLTableSectionElement;
    private tbody: HTMLTableSectionElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("table"))

        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");

        this.load_headers();
        this.container.appendChild(this.thead);
        this.container.appendChild(this.tbody);

        this.setup_dom();
        this.update();
    }

    public create_player()
    {
        new PlayerWidget(this.tbody);
        this.update();
    }

    private setup_dom()
    {
        this.container.id = "matchtable";
    }

    private load_headers()
    {
        let header = document.createElement("tr");

        header.id = "matchheader";

        let th_ready    = document.createElement("th");
        let th_color    = document.createElement("th");
        let th_rank     = document.createElement("th");
        let th_username = document.createElement("th");
        let th_faction  = document.createElement("th");
        let th_team     = document.createElement("th");
        let th_country  = document.createElement("th");

        th_ready.innerText    = "Ready";
        th_color.innerText    = "Color";
        th_rank.innerText     = "Rank";
        th_username.innerText = "Username";
        th_faction.innerText  = "Faction";
        th_team.innerText     = "Team";
        th_country.innerText  = "Country";

        header.appendChild(th_ready);
        header.appendChild(th_color);
        header.appendChild(th_rank);
        header.appendChild(th_username);
        header.appendChild(th_faction);
        header.appendChild(th_team);
        header.appendChild(th_country);

        this.thead.appendChild(header);
    }

    private update()
    {
        let idx = 0;

        for (let row of this.container.rows)
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


class MatchInfo extends WidgetBase<HTMLDivElement>
{
    private map:        HTMLDivElement;
    private parameters: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" });

        this.map        = document.createElement("div");
        this.parameters = document.createElement("div");

        this.container.appendChild(this.map);
        this.container.appendChild(this.parameters);

        this.setup_dom();
    }

    private setup_dom()
    {
        this.map.id        = "mapdiv";
        this.parameters.id = "paramdiv";
        this.container.id  = "matchinfodiv";
    }
}


export class MatchChat extends WidgetBase<HTMLDivElement>
{
    private chatfield: HTMLDivElement;
    private inputbar:  HTMLDivElement;
    private textarea:  HTMLTextAreaElement;
    private sendbtn:   HTMLButtonElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" })

        this.chatfield = document.createElement("div");
        this.inputbar  = document.createElement("div");
        this.textarea  = document.createElement("textarea");
        this.sendbtn   = document.createElement("button");

        this.inputbar.appendChild(this.textarea);
        this.inputbar.appendChild(this.sendbtn);

        this.container.appendChild(this.chatfield);
        this.container.appendChild(this.inputbar);

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.id = "matchchat";
        this.chatfield.id = "matchchatfield";
        this.inputbar.id  = "matchchatinputbar";
        this.textarea.id  = "matchchattextarea";
        this.sendbtn.id   = "matchchatbtn";

        this.sendbtn.innerText = "Send";
    }

    public create_msg(raw: string, owner: "self" | "other")
    {
        let msg = document.createElement("div");
        msg.innerText = raw;

        if (owner = "self") {
            msg.className = "selfmsg";
        } else {
            msg.className = "othermsg";
        }

        this.chatfield.appendChild(msg);
    }
}