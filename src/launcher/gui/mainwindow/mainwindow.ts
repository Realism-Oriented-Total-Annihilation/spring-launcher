//
// Main application Window
//
import { WidgetBase } from "../../common/widget";

import { Menu }    from "./menu/menu";
import { Content } from "./content/content";
import { GuiMode } from "../gui";


export class MainWindow extends WidgetBase<HTMLDivElement>
{
    public menu:    Menu;
    public content: Content;

    private static _instance: MainWindow;

    private constructor()
        {
        super(document.createElement("div"), { mode: "flex" })

        this.menu    = new Menu(this.container);
        this.content = Content.instance();

        this.setup_dom();
        this.setup_wiring();
    }

    public static instance(): MainWindow
    {
        if (!MainWindow._instance) {
            MainWindow._instance = new MainWindow()
        }

        return MainWindow._instance;
    }

    public show()
    {
        this.menu?.show();
        this.content?.show();

        super.show();
    }

    public hide()
    {
        this.menu?.hide();
        this.content?.hide();

        super.hide();
    }

    public mode(mode: GuiMode)
    {
        switch (mode)
        {
            case GuiMode.MainBattleList:
                this.content.show_battlelist();
                break;

            case GuiMode.MainBattleRoom:
                this.content.show_battleroom();
                break;

            case GuiMode.MainDownload:
                this.content.show_download();
                break;

            case GuiMode.MainProfile:
                this.content.show_profile();
                break;

            case GuiMode.MainSettings:
                this.content.show_settings();
                break;

            case GuiMode.MainChat:
                this.content.show_chat();
                break;
        }
    }

    private setup_dom()
    {
        this.container.id = "window";
    }

    private setup_wiring()
    {
        this.menu.on_select = (mode) => { this.mode(mode); };
    }
}
