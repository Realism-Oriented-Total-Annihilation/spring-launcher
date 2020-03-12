//
// Content middle container
//
import { WidgetBase } from "../../../widgets/base";
import { BattleList } from "./tabs/battlelist";
import { BattleRoom } from "./tabs/battleroom";
import { Download } from "./tabs/download";
import { Profile } from "./tabs/profile";
import { Settings } from "./tabs/settings";


export class Content extends WidgetBase<HTMLDivElement>
{
    parent: HTMLElement;

    private battlelist:  BattleList;
    private battleroom:  BattleRoom;
    private download:    Download;
    private profile:     Profile;
    private settings:    Settings;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div"))
        this.parent = parent;

        this.setup_dom();

        this.battlelist  = <any>null;
        this.battleroom  = <any>null;
        this.download    = <any>null;
        this.profile     = <any>null;
        this.settings    = <any>null;
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
    }

    public show_battlelist()
    {
        if (this.battlelist == null) {
            this.battlelist = new BattleList(this.container);
        } else {
            this.hideall();
            this.battlelist.show();
        }
    }

    public show_battleroom()
    {
        if (this.battleroom == null) {
            this.battleroom = new BattleRoom(this.container);
        } else {
            this.hideall();
            this.battleroom.show();
        }
    }

    public show_download()
    {
        if (this.download == null) {
            this.download = new Download(this.container);
        } else {
            this.hideall();
            this.download.show();
        }
    }

    public show_profile()
    {
        if (this.profile == null) {
            this.profile = new Profile(this.container);
        } else {
            this.hideall();
            this.profile.show();
        }
    }

    public show_settings()
    {
        if (this.settings == null) {
            this.settings = new Settings(this.container);
        } else {
            this.hideall();
            this.settings.show();
        }
    }
}