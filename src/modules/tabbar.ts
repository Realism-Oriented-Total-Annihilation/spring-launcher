//
// Tabs bar
//

export class Tabbar
{
    container: HTMLDivElement;

    constructor(topbar: HTMLDivElement)
    {
        this.container     = document.createElement("div");
        this.container.id += "tabbar_section";

        topbar.appendChild(this.container);

        // return this.container;
    }

    public create_tab(name: string, index: number)
    {
        let tab = new Tab(name, index);
        tab.get_width();
        this.container.appendChild(tab.inner());
    }
}

// Functionality unimplemented
export class Tab
{
    tabs: HTMLDivElement[];

    index: number;
    tab:  HTMLDivElement;
    name: HTMLAnchorElement;

    constructor(name: string, index: number)
    {
        this.tabs = new Array();

        this.index = index;

        this.tab = document.createElement("div");

        this.name = document.createElement("a");

        this.name.style.color = "white"
        this.name.innerText   = name;

        this.tab.appendChild(this.name);
        this.tab.id            += `tab_${name}`;
        this.tab.style.height   = "80px";
        this.tab.style.backgroundColor = "rgb(0, 122, 204)";
        this.tab.style.float = "left";

        this.tabs.push(this.tab);
    }

    public inner(): HTMLDivElement
    {
        return this.tab;
    }

    //  FIXME
    public get_width()
    {
        if (this.tabs.length == 5)
        {
            this.tab.style.width = "20%"
        } if (this.tabs.length == 4)
        {
            this.tab.style.width = "25%"
        } if (this.tabs.length == 3)
        {
            this.tab.style.width = "33%"
        } if (this.tabs.length == 2)
        {
            this.tab.style.width = "50%"
        } if (this.tabs.length == 1)
        {
            this.tab.style.width = "100%"
        }
    }
}