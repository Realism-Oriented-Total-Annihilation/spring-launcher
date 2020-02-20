//
// Main Window
//

import { Sidebar } from "./sidebar";

export class Workbench
{
    private sidebar: Sidebar;

    private _workbench: HTMLDivElement;

    constructor()
    {
        this._workbench = <HTMLDivElement>document.getElementById("main");

        let dom_left = document.createElement("div");

        this.sidebar = new Sidebar(dom_left);

        // Events.emit("Sidebar.new", this.Sidebar);

        let tabbar = this.sidebar.create_tabbar();

        tabbar.create_tab("Home", "");
        tabbar.create_tab("Profile", "");
        tabbar.create_tab("Settings", "../logos/settingsoff.svg");

        this._workbench.appendChild(dom_left);
    }
}