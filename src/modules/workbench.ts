//
// Main Window
//

import { Topbar } from "./topbar";

export class Workbench
{
    private topbar: Topbar;

    private _workbench: HTMLDivElement;

    constructor()
    {
        this._workbench = <HTMLDivElement>document.getElementById("main");

        let dom_top = document.createElement("div");

        this.topbar = new Topbar(dom_top);

        // Events.emit("topbar.new", this.topbar);
        this.topbar.create_playbutton();

        let tabbar = this.topbar.create_tabbar();

        tabbar.create_tab("Home", 1);
        tabbar.create_tab("Profile", 2);
        tabbar.create_tab("Settings", 3);

        this._workbench.appendChild(dom_top);
    }
}