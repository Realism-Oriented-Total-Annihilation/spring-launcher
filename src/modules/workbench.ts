//
// Main Window
//
import { EventSubsystem } from "./events";
import { Leftbar } from "./left/leftbar";
import { Rightbar } from "./right/rightbar";

export class Workbench
{
    public events: EventSubsystem;

    private leftbar:   Leftbar;
    // private rightbar:  Rightbar;

    private _workbench: HTMLDivElement;

    constructor()
    {
        this._workbench = <HTMLDivElement>document.getElementById("main");

        let dom_left = document.createElement("div");
        // let dom_right = document.createElement("div");


        this.leftbar  = new Leftbar(dom_left);
        // this.rightbar = new Rightbar(dom_right);
        this.events   = new EventSubsystem();

        // Events.emit("Leftbar.new", this.Leftbar);

        this._workbench.appendChild(dom_left);
        // this._workbench.appendChild(dom_right);
    }

    public run()
    {
        this.leftbar.paint();
    }
}
