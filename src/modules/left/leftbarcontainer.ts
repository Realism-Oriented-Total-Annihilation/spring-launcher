//
// Left side tab bar
//
import * as fs   from "fs";
import * as path from "path";
import { workbench } from "../main";


export class LeftbarContainer
{
    flexbox: HTMLDivElement;

    public active:  Tab | null;

    tabs: Tab[];

    constructor(container: HTMLDivElement, id: string)
    {
        this.flexbox = document.createElement("div");
        this.flexbox.id = `${id}`;

        this.active = null;

        this.tabs = new Array();

        container.appendChild(this.flexbox);
    }

    public create_tab(name: string)
    {
        let tab = new Tab(this.flexbox, name);

        this.tabs.push(tab);
    }
}

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

        parent.appendChild(this.tab);

        this.setup_dom();
        this.setup_wiring();
    }

    public select()
    {
        this.light.className = "light-active";

        this.svg.style.fill = "rgba(255, 255, 255, 1)"
        this.svg.style.stroke = "rgba(255, 255, 255, 1)"
    }

    public unselect()
    {
        this.light.className = "light";

        if (this.svg.style.fill == "rgba(255, 255, 255, .4)")
        {
            this.svg.style.fill = "rgba(255, 255, 255, 1)";
            this.svg.style.stroke = "rgba(255, 255, 255, 1)";
        } else {
            this.svg.style.fill = "rgba(255, 255, 255, .4)";
            this.svg.style.stroke = "rgba(255, 255, 255, .4)";
        }
    }

    private setup_dom()
    {
        this.tab.className     = "tab"
        this.light.className   = "light";
        this.logodiv.className = "tablogodiv";

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
