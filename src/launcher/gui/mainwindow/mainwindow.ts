//
// Main application Window
//
import { WidgetBase } from "../../common/widget";

import { Menu }    from "./menu/menu";
import { Content } from "./content/content";
// import { Chat }    from "./chat/chat";
// import { ChatBar } from "./chat/bar";
import { GuiMode } from "../gui";


export class MainWindow extends WidgetBase<HTMLDivElement>
{
    public menu:    Menu;
    public content: Content;

    // private chat:    Chat;
    // private chatbar: ChatBar;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" })

        this.menu    = new Menu(this.container);
        this.content = new Content(this.container);
        // this.chat    = new Chat(this.container);
        // this.chatbar = new ChatBar(this.container);

        this.setup_dom();
        this.setup_wiring();
    }

    public show()
    {
        this.menu?.show();
        this.content?.show();
        // this.chat?.show();
        // this.chatbar?.show();

        super.show();
    }

    public hide()
    {
        this.menu?.hide();
        this.content?.hide();
        // this.chat?.hide();
        // this.chatbar?.hide();

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
