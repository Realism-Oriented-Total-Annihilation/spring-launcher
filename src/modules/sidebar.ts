//
//  Sidebar in which you can select tabs or play
//

import { Tabbar, Tab } from "./tabbar";

export class Sidebar
{
    public bar: HTMLDivElement;

    constructor(container: HTMLDivElement)
    {
        this.bar     = container;
        container.id = "sidebar";
    }

    public create_tabbar(): Tabbar
    {
        let tabbar = new Tabbar(this.bar);
        return tabbar;
    }
}