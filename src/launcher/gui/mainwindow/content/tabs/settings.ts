//
//
//
import { WidgetBase } from "../../../../common/widget";


export class Settings extends WidgetBase<HTMLDivElement>
{
    private topdiv: HTMLDivElement
    private pathbar: PathBar;

    private bottomdiv: HTMLDivElement;
    private catcontainer: HTMLDivElement;
    private maincontainer: HTMLDivElement;

    // Launcher
    private head_launcher: Category;
    private l_general:  Category;
    private l_chat:     Category;
    private l_sound:    Category;
    private l_graphics: Category;

    // Ingame
    private head_ingame: Category;
    private in_hotkeys:  Category;
    private in_sound:    Category;
    private in_game:     Category;
    private in_replays:  Category;
    private in_graphics: Category;

    private cats: Array<Category>;


    private headers: Array<HTMLDivElement>;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" });

        this.topdiv  = document.createElement("div");
        this.pathbar = new PathBar(this.topdiv);

        this.cats = new Array();

        this.bottomdiv     = document.createElement("div");
        this.catcontainer  = document.createElement("div");
        this.maincontainer = document.createElement("div");

        this.head_launcher  = new Category(this.catcontainer, "Launcher",  { mode: "header" });

        this.l_general  = new Category(this.catcontainer, "General",  { mode:"category" }, this.cats);
        this.l_chat     = new Category(this.catcontainer, "Chat",     { mode:"category" }, this.cats);
        this.l_sound    = new Category(this.catcontainer, "Sound",    { mode:"category" }, this.cats);
        this.l_graphics = new Category(this.catcontainer, "Graphics", { mode:"category" }, this.cats);

        this.head_ingame = new Category(this.catcontainer, "Ingame", { mode: "header"});

        this.in_hotkeys  = new Category(this.catcontainer, "Hotkeys",  { mode:"category" }, this.cats);
        this.in_sound    = new Category(this.catcontainer, "Sound",    { mode:"category" }, this.cats);
        this.in_game     = new Category(this.catcontainer, "Game",     { mode:"category" }, this.cats);
        this.in_replays  = new Category(this.catcontainer, "Replays",  { mode:"category" }, this.cats);
        this.in_graphics = new Category(this.catcontainer, "Graphics", { mode:"category" }, this.cats);

        this.headers     = new Array();

        this.l_general.select();

        this.setup_wiring();
        this.setup_dom();
    }

    private setup_wiring()
    {
        for (let _cat of this.cats)
        {
            _cat.on_select = (clicked) =>
            {
                for (let tab of this.cats) {
                    if (clicked.name == tab.name) {
                        clicked.select();
                    } else {
                        tab.unselect();
                    }
                }

                switch (clicked)
                {
                    case this.l_general:
                        this.pathbar.create_part("Launcher / General");
                        break;

                    case this.l_chat:
                        this.pathbar.create_part("Launcher / Chat");
                        break;

                    case this.l_sound:
                        this.pathbar.create_part("Launcher / Sound");
                        break;

                    case this.l_graphics:
                        this.pathbar.create_part("Launcher / Graphics");
                        break;

                    case this.in_hotkeys:
                        this.pathbar.create_part("Ingame / Hotkeys")
                        break;

                    case this.in_sound:
                        this.pathbar.create_part("Ingame / Sound")
                        break;

                    case this.in_game:
                        this.pathbar.create_part("Ingame / Game")
                        break;

                    case this.in_replays:
                        this.pathbar.create_part("Ingame / Replays")
                        break;

                    case this.in_graphics:
                        this.pathbar.create_part("Ingame / Graphics")
                        break;
                }
            }
        }
    }

    private setup_dom()
    {
        this.container.id = "settingsdiv";

        this.topdiv.id = "settingstop";

        this.bottomdiv.id     = "settingsbot";
        this.catcontainer.id  = "catcontainer";
        this.maincontainer.id = "maincontainer";

        this.bottomdiv.appendChild(this.catcontainer);
        this.bottomdiv.appendChild(this.maincontainer);

        this.container.appendChild(this.topdiv);
        this.container.appendChild(this.bottomdiv);
    }
}

class PathBar
{
    private container: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {

        this.container = document.createElement("div");

        parent.appendChild(this.container);

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.innerHTML = "Launcher / General";
        this.container.id = "settingspath";
    }

    public create_part(name: string)
    {
        this.container.innerHTML = name;
    }
}


interface CategoryOptions
{
    mode: "header" | "category";
}


class Category extends WidgetBase<HTMLDivElement>
{
    public on_select: (cat: Category) => void = () => {};

    public readonly name: string

    constructor(parent: HTMLDivElement, name: string, options: CategoryOptions, array?: Array<Category>)
    {
        super(parent, document.createElement("div"))

        this.name = name;
        this.container.innerHTML = name;

        switch (options.mode) {
            case "header":
                this.container.className = "settingsheader";
            break;

            case "category":
                this.container.className = "settingscat";
                array?.push(this);
            break;
        }
        this.show();
        this.setup_wiring();
    }

    public inner()
    {
        return this.container;
    }

    private setup_wiring()
    {
        this.container.addEventListener("click", () => {
            this.on_select(this);
        })
    }

    public select()
    {
        this.container.className = "catactive";
    }

    public unselect()
    {
        this.container.className = "settingscat"
    }
}