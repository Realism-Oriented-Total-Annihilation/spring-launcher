//
// Left side tab bar
//
import * as fs   from "fs";
import * as path from "path";


export class Tabbar
{
    flexbox: HTMLDivElement;

    private active:  Tab | null;

    tabs: HTMLDivElement[];

    constructor(container: HTMLDivElement)
    {
        this.flexbox = document.createElement("div");
        this.flexbox.id = "tabbar";

        this.active = null;

        this.tabs = new Array();

        container.appendChild(this.flexbox);
    }

    public create_tab(name: string, logo: string)
    {
        let tab   = new Tab(name, logo);
        let inner = tab.inner();

        this.tabs.push(inner);
        this.flexbox.appendChild(inner);

        inner.addEventListener("click", () => { this.active?.unglow_selected(), this.select_tab(tab); })
    }

    private select_tab(tab: Tab)
    {
        this.active = tab;

        tab.glow_selected();
        // Events.emit("module.selected", tab)
    }

}

export class Tab
{
    tab:     HTMLDivElement;
    light:   HTMLDivElement;
    logodiv: HTMLDivElement;

    name: string

    constructor(name: string, logodata: string)
    {
        this.tab     = document.createElement("div");
        this.light   = document.createElement("div");
        this.logodiv = document.createElement("div");

        this.name = name;

        this.tab.className     = "tab"
        this.light.className   = "light";
        this.logodiv.className = "tablogodiv";

        let logopath = path.join(__dirname, "../icons/settings.svg");

        let data = fs.readFileSync(logopath, {encoding: "UTF8"});
        this.logodiv.innerHTML = data;

        let svg = this.logodiv.getElementsByTagName("svg")[0];
        svg.id = "icon";

        this.tab.appendChild(this.logodiv);
        this.tab.appendChild(this.light);
        this.tab.appendChild(this.logodiv);
    }

    public inner(): HTMLDivElement
    {
        return this.tab;
    }

    public glow_selected()
    {
        this.light.className = "light-active";
    }

    public unglow_selected()
    {
        this.light.className = "light";
    }
}