//
//  Leftbar in which you can select tabs or play
//
import { TabContainer } from "./container";


export class LeftBar
{
    public container: HTMLDivElement;

    private top:    TabContainer;
    private center: TabContainer;
    private bottom: TabContainer;

    constructor(parent: HTMLDivElement)
    {
        this.container = document.createElement("div");

        // ORDER IS IMPORTANT!! FLEX PROPERTY...
        this.top    = new TabContainer(this.container, "top");
        this.center = new TabContainer(this.container, "center");
        this.bottom = new TabContainer(this.container, "bottom");

        this.setup_dom();

        parent.appendChild(this.container);
    }

    public setup_dom()
    {
        this.container.id = "menu";

        this.top.create_tab("Profile");
        this.center.create_tab("Battlelist");
        this.center.create_tab("Download");

        this.bottom.create_tab("Settings");
    }
}
