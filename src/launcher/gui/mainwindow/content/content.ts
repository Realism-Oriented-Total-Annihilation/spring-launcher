//
// Content middle container
//
import { WidgetBase } from "../../../common/widget";
import { BattleList } from "./tabs/battlelist";
import { BattleRoom } from "./tabs/battleroom";
import { Download } from "./tabs/download";
import { Profile } from "./tabs/profile";
import { Settings } from "./tabs/settings";
import { Chat } from "./tabs/chat/chat";
import { MainWindow } from "../mainwindow";


export class Content extends WidgetBase<HTMLDivElement>
{
    public battlelist:  BattleList;
    public battleroom:  BattleRoom;
    public download:    Download;
    public profile:     Profile;
    public settings:    Settings;
    public chat:        Chat;

    private static _instance: Content;

    // private constructor(parent: HTMLElement)
    private constructor()
    {
        super(document.createElement("div"), { mode: "flex" })

        this.battlelist  = BattleList.instance();
        this.battleroom  = new BattleRoom(this.container);
        this.download    = new Download(this.container);
        this.profile     = new Profile(this.container);
        this.settings    = new Settings(this.container);
        this.chat        = new Chat(this.container);

        this.setup_dom();
    }

    public static instance()
    {
        if (!Content._instance)
        {
            Content._instance = new Content()
        }

        return Content._instance
    }

    public append<T extends Node>(item: T)
    {
        this.container.appendChild(item)
    }

    private setup_dom()
    {
        this.container.id = "content-container";
        MainWindow.instance().inner().appendChild(this.container);
    }

    private hideall()
    {
        this.battlelist.hide();
        this.battleroom.hide();
        this.download.hide();
        this.profile.hide();
        this.settings.hide();
        this.chat.hide();
    }

    public show_battlelist()
    {
        this.hideall();
        this.battlelist.show();
    }

    public show_battleroom()
    {
        this.hideall();
        this.battleroom.show();
    }

    public show_download()
    {
        this.hideall();
        this.download.show();
    }

    public show_profile()
    {
        this.hideall();
        this.profile.show();
    }

    public show_settings()
    {
        this.hideall();
        this.settings.show();
    }

    public show_chat()
    {
        this.hideall();
        this.chat.show();
    }
}