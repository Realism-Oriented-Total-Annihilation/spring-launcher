//
// Menu Tab functionality
//
import * as fs   from "fs";
import * as path from "path";
import { sl } from "../../../../renderer";
import { GuiMode } from "../../../gui";


export class Tab
{
    public readonly name: string

    public on_select: (tab: Tab) => void = () => {};

    private tab:     HTMLDivElement;
    private light:   HTMLDivElement;
    private logodiv: HTMLDivElement;

    private svg: SVGSVGElement;

    constructor(parent: HTMLDivElement, name: string)
    {
        this.name = name;

        this.tab     = document.createElement("div");
        this.light   = document.createElement("div");
        this.logodiv = document.createElement("div");

        this.logodiv.innerHTML = fs.readFileSync(
            path.join(__dirname, `../../icons/${this.name}.svg`),
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

    public inner(): HTMLDivElement
    {
        return this.tab;
    }

    private setup_wiring()
    {
        this.tab.addEventListener("click", () => {
            this.on_select(this);
        })
    }
}
