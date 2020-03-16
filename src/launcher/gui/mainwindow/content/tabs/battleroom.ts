//
//
//
import { WidgetBase } from "../../../../common/widget";


// Not sure if it has to be a div
export class BattleRoom extends WidgetBase<HTMLDivElement>
{
    private matchinfo: MatchInfo;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));

        this.matchinfo = new MatchInfo(this.container);

        this.setup_dom();
    }

    private setup_dom()
    {
    }
}

class MatchInfo
{
    private container: HTMLDivElement
    private matchmap: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {
        this.container = document.createElement("div");
        this.matchmap  = document.createElement("div");

        parent.appendChild(this.container);
    }

    private setup_dom()
    {
        this.matchmap.id = "matchmap";
    }

}
