//
// Main Window
//
import { EventSubsystem } from "./events";

import { Menu } from "./menu/menu";

import { Chat }    from "./modules/chat/chat";
import { ChatBar } from "./modules/chat/bar";

// modules
import { Profile }    from "./modules/profile";
import { Login }      from "./modules/login/login";
import { BattleList } from "./modules/battlelist";
import { BattleRoom } from "./modules/battleroom";
import { Download }   from "./modules/download";
import { Settings }   from "./modules/settings";


export class Workbench
{
    public events: EventSubsystem;

    private leftbar: Menu;
    private chatbar: ChatBar;
    private chat:    Chat;

    private module_battlelist: BattleList;
    private module_battleroom: BattleRoom;
    private module_download:   Download;
    private module_login:      Login;
    private module_profile:    Profile;
    private module_settings:   Settings;

    private window:  HTMLDivElement;
    private loginwindow: HTMLDivElement;
    private content: HTMLDivElement;

    constructor()
    {
        this.window  = <HTMLDivElement>document.getElementById("window");
        this.loginwindow = <HTMLDivElement>document.getElementById("loginwindow");
        this.content = <HTMLDivElement>document.createElement("div");

        this.events = new EventSubsystem();

        this.leftbar = <any>null;
        this.chatbar = <any>null;
        this.chat    = <any>null;

        this.module_battlelist = <any>null;
        this.module_battleroom = <any>null;
        this.module_download   = <any>null;
        this.module_login      = <any>null;
        this.module_profile    = <any>null;
        this.module_settings   = <any>null;

        this.setup_dom();
    }

    public authenticate()
    {
        this.module_login = new Login(this.loginwindow);
        this.window.style.display = "none";
        this.module_login.show();
    }

    public init()
    {
        this.leftbar = new Menu(this.window);

        this.window.appendChild(this.content);  // placeholder

        this.chatbar = new ChatBar(this.window);
        this.chat    = new Chat(this.window);

        this.module_battlelist = new BattleList(this.content);
        this.module_battleroom = new BattleRoom(this.content);
        this.module_download   = new Download(this.content);

        this.module_profile    = new Profile(this.content);
        this.module_settings   = new Settings(this.content);


    }

    private setup_dom()
    {
        this.content.id = "content";
    }
}
