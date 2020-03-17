//
//
//
import { WidgetBase } from "../../../../common/widget";

import { Chat } from "./chat/chat";


// Not sure if it has to be a div
export class BattleRoom extends WidgetBase<HTMLDivElement>
{
    private matchchat: Chat;
    private matchinfo: MatchInfo;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));

        this.matchchat = new Chat(this.container);
        this.matchinfo = new MatchInfo(this.container);

        this.setup_dom();
    }

    private setup_dom()
    {

    }
}

class MatchInfo extends WidgetBase<HTMLDivElement>
{
    private map: HTMLDivElement;
    private parameters: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));

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
    }
}
