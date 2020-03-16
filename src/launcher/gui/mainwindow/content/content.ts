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


export class Content extends WidgetBase<HTMLDivElement>
{
    private parent: HTMLElement;

    public battlelist:  BattleList;
    public battleroom:  BattleRoom;
    public download:    Download;
    public profile:     Profile;
    public settings:    Settings;
    public chat:        Chat;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" })
        this.parent = parent;

        this.battlelist  = new BattleList(this.container);
        this.battleroom  = new BattleRoom(this.container);
        this.download    = new Download(this.container);
        this.profile     = new Profile(this.container);
        this.settings    = new Settings(this.container);
        this.chat        = new Chat(this.container);

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.id = "content-container";
        this.parent.appendChild(this.container);
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