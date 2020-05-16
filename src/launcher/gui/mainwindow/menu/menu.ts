//
//  Leftbar in which you can select tabs or play
//
import { WidgetBase } from "../../../common/widget";

import { TabContainer } from "./container";
import { Tab } from "./tab";
import { GuiMode } from "../../gui";


export class Menu extends WidgetBase<HTMLDivElement>
{
    public on_select: (mode: GuiMode) => void = () => {};

    private top:    TabContainer;
    private center: TabContainer;
    private bottom: TabContainer;

    private tabs: Array<Tab>;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex"});

        // ORDER IS IMPORTANT!! FLEX PROPERTY...
        this.top    = new TabContainer(this.container, "top");
        this.center = new TabContainer(this.container, "center");
        this.bottom = new TabContainer(this.container, "bottom");

        this.tabs = [];

        this.setup_dom();
        this.setup_wiring();
    }

    public setup_dom()
    {
        this.container.id = "menu";

        this.top.create_tab("profile", this.tabs)

        let battlelist = this.center.create_tab("battlelist",  this.tabs);
        battlelist.select();

        this.center.create_tab("battleroom", this.tabs);
        this.center.create_tab("download", this.tabs);
        this.center.create_tab("chat",     this.tabs);

        this.bottom.create_tab("settings", this.tabs);
    }

    public setup_wiring()
    {
        for (let _tab of this.tabs)
        {
            _tab.on_select = (clicked) =>
            {
                // select/unselect tabs acording to currently placed click
                for (let tab of this.tabs) {
                    if (clicked.name == tab.name) {
                        clicked.select();
                    } else {
                        tab.unselect();
                    }
                }

                // fire the mode change
                switch (clicked.name)
                {
                    case "profile":
                        this.on_select(GuiMode.MainProfile)
                        break;

                    case "battlelist":
                        this.on_select(GuiMode.MainBattleList)
                        break;

                    case "battleroom":
                        this.on_select(GuiMode.MainBattleRoom)
                        break;

                    case "download":
                        this.on_select(GuiMode.MainDownload)
                        break;

                    case "settings":
                        this.on_select(GuiMode.MainSettings)
                        break;

                    case "chat":
                        this.on_select(GuiMode.MainChat)
                        break;

                    default:
                        throw "Programming error: unhandled tab selection";
                }
            }
        }
    }
}
