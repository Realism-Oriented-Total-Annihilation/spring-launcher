//
// Menu Tab functionality
//
import * as fs   from "fs";
import * as path from "path";

import { workbench } from "../main";


export class Tab
{
    tab:     HTMLDivElement;
    light:   HTMLDivElement;
    logodiv: HTMLDivElement;

    svg: SVGSVGElement;

    name: string

    constructor(parent: HTMLDivElement, name: string)
    {
        this.name = name;

        this.tab     = document.createElement("div");
        this.light   = document.createElement("div");
        this.logodiv = document.createElement("div");

        this.logodiv.innerHTML = fs.readFileSync(
            path.join(__dirname, `../../icons/${this.name.toLowerCase()}.svg`),
            {encoding: "UTF8"}
        );

        this.svg = this.logodiv.getElementsByTagName("svg")[0];

        this.setup_dom();
        this.setup_wiring();

        parent.appendChild(this.tab);
    }

    public select()
    {
        this.tab.className = "tab active";
    }

    public unselect()
    {
        this.tab.className = "tab";
    }

    private setup_dom()
    {
        this.tab.className     = "tab"
        this.light.className   = "tab-light";
        this.logodiv.className = "tab-logo";

        this.svg.id = "icon";

        this.tab.appendChild(this.light);
        this.tab.appendChild(this.logodiv);
    }

    private setup_wiring()
    {
        workbench.events.on("tab.selected", (tab: Tab) => {
            if (tab === this) {
                this.select();
            } else {
                this.unselect();
            }
        });

        this.tab.addEventListener("click", () => {
            workbench.events.emit("tab.selected", this);
        })
    }
}
