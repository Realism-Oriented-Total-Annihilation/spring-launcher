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

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" });

        this.topdiv  = document.createElement("div");
        this.pathbar = new PathBar(this.topdiv);

        this.bottomdiv      = document.createElement("div");
        this.catcontainer  = document.createElement("div");
        this.maincontainer = document.createElement("div");

        this.setup_dom();
    }

    private create_cat(name: string)
    {
        let cat = document.createElement("div");

        cat.className = "settingscat";
        cat.innerHTML = name;

        cat.addEventListener("click", () => {
            // header.select();
        })
        this.catcontainer.appendChild(cat);
    }

    private create_header(name: string)
    {
        let header = document.createElement("div");

        header.className = "settingsheader";
        header.innerHTML = name;

        header.addEventListener("click", () => {
            // header.select();
        })
        this.catcontainer.appendChild(header);
    }

    private setup_dom()
    {
        this.container.id = "settingsdiv";

        this.topdiv.id = "settingstop";

        this.bottomdiv.id = "settingsbot";
        this.catcontainer.id = "catcontainer";
        this.maincontainer.id = "maincontainer";

        this.create_header("Launcher");
        this.create_cat("General");
        this.create_cat("Chat");
        this.create_cat("Sound");
        this.create_cat("Graphics");

        this.create_header("Ingame")
        this.create_cat("Hotkeys");
        this.create_cat("Sound");
        this.create_cat("Game");
        this.create_cat("Replays");
        this.create_cat("Graphics");

        this.bottomdiv.appendChild(this.catcontainer);
        this.bottomdiv.appendChild(this.maincontainer);

        this.container.appendChild(this.topdiv);
        this.container.appendChild(this.bottomdiv);

        // select general as default
    }
}

class PathBar
{
    public container: HTMLDivElement;

    private headerdiv: HTMLDivElement;
    public header: "Launcher" | "Ingame";

    private slash: HTMLDivElement;

    private part: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {
        this.container = document.createElement("div");

        this.headerdiv = document.createElement("div");
        this.part      = document.createElement("div");
        this.slash      = document.createElement("div");

        this.header = "Launcher";

        parent.appendChild(this.container);

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.id = "settingspath";

        this.slash.innerHTML = "/"

        if (this.header = "Launcher")
        {
            this.create_part("General");
            this.create_part("Chat");
            this.create_part("Sound");
            this.create_part("Graphics");
        }

        this.container.appendChild(this.part);
    }

    private setup_wiring()
    {

    }

    public create_part(name: string)
    {
        this.part.innerHTML = "";

        let part = document.createElement("div");
        part.style.width = "60px"
        part.style.display = "none";

        part.innerHTML = name;
        this.part.appendChild(part);
    }

    private show(part: HTMLDivElement)
    {
        part.style.display = "block";
    }
}