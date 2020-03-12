//
// Left side tab bar
//
import { Tab } from "./tab";


export class TabContainer
{
    private container: HTMLDivElement;

    constructor(parent: HTMLElement, position: "top" | "center" | "bottom")
    {
        this.container = document.createElement("div");

        this.setup_dom(position);

        parent.appendChild(this.container);
    }

    public create_tab(name: string, tabs: Array<Tab>)
    {
        let tab = new Tab(this.container, name);

        tabs.push(tab);
    }

    private setup_dom(pos: string)
    {
        this.container.className = `tab-container ${pos}`;
    }
}
