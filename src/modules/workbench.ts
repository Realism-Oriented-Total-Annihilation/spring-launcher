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

        this._workbench.appendChild(dom_top);
    }
}