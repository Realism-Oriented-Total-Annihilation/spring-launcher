//
//
//
import { WidgetBase } from "../../../../common/widget";


// Not sure if it has to be a div
export class BattleRoom extends WidgetBase<HTMLDivElement>
{

    private players_chat:  HTMLDivElement;
    private matchplayers: MatchPlayers;
    private matchchat:    MatchChat;

    private matchinfo:    MatchInfo;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" });

        this.players_chat = document.createElement("div");

        this.matchplayers = new MatchPlayers(this.players_chat);
        this.matchchat    = new MatchChat(this.players_chat);
        this.container.appendChild(this.players_chat);

        this.matchinfo = new MatchInfo(this.container);

        this.setup_dom();
    }

    private setup_dom()
    {
        this.players_chat.id = "battleroom_leftdiv";
        this.container.id    = "battleroom";
    }

    public show()
    {
        this.matchplayers.show();
        this.matchchat.show();
        this.matchinfo.show();
        super.show();
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
        this.show();
    }

    private setup_dom()
    {
        this.container.className = "battleplayer";
    }

    public set name(name: string) {
        this.td_username.innerText = name;
    }

    public set country(country: string | undefined) {
        let uri = `./flags/${country?.toLowerCase()}.png`;

        this.td_country.style.width          = "60px";
        this.td_country.style.background     = `url(${uri})`;
        this.td_country.style.backgroundSize = `100% 100%`;
    }
    public set rank(rank: string | undefined) {
        let uri = `./flags/${rank?.toLowerCase()}.png`;

        this.td_rank.style.width          = "60px";
        this.td_rank.style.background     = `url(${uri})`;
        this.td_rank.style.backgroundSize = `100% 100%`;
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
    }

    public create_player()
    {
        new PlayerWidget(this.tbody);
    }

    private setup_dom()
    {
        this.container.id = "matchtable";
    }

    private load_headers()
    {
        let th_ready    = document.createElement("th");
        th_ready.innerText    = "Ready";
        this.thead.appendChild(th_ready);
        let th_color    = document.createElement("th");
        th_color.innerText    = "Color";
        this.thead.appendChild(th_color);
        let th_rank     = document.createElement("th");
        th_rank.innerText     = "Rank";
        this.thead.appendChild(th_rank);
        let th_username = document.createElement("th");
        th_username.innerText = "Username";
        this.thead.appendChild(th_username);
        let th_faction  = document.createElement("th");
        th_faction.innerText  = "Faction";
        this.thead.appendChild(th_faction);
        let th_team     = document.createElement("th");
        th_team.innerText     = "Team";
        this.thead.appendChild(th_team);
        let th_country  = document.createElement("th");
        th_country.innerText  = "Country";
        this.thead.appendChild(th_country);

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