//
// Left side tab bar
//
import { Tab } from "./tab";


export class TabContainer
{
    private container: HTMLDivElement;

    private tabs: Tab[];

    constructor(parent: HTMLElement, position: "top" | "center" | "bottom")
    {
        this.container = document.createElement("div");

        this.tabs = new Array();

        this.setup_dom(position);

        parent.appendChild(this.container);
    }

    public create_tab(name: string)
    {
        let tab = new Tab(this.container, name);

        this.tabs.push(tab);
    }

    private setup_dom(pos: string)
    {
        this.container.className = `tab-container ${pos}`;
    }
}
