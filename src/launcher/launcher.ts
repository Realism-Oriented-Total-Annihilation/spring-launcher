//
// Main Window
//
import { EventSubsystem } from "./events/events";

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
import { Backend }    from "./backend/backend";


export class Launcher
{
    public events: EventSubsystem;

    private menu:    Menu;
    private chatbar: ChatBar;
    private chat:    Chat;

    private module_battlelist: BattleList;
    private module_battleroom: BattleRoom;
    private module_download:   Download;
    private module_login:      Login;
    private module_profile:    Profile;
    private module_settings:   Settings;

    private backend: Backend;

    private window: HTMLDivElement;

    constructor()
    {
        this.window = <HTMLDivElement>document.getElementById("window");

        this.events = new EventSubsystem();

        this.backend = <any>null;

        this.menu    = <any>null;
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

    public init()
    {
        this.backend = new Backend();

        this.menu = new Menu(this.window);

        this.chatbar = new ChatBar(this.window);
        this.chat    = new Chat(this.window);

        this.module_login      = new Login(this.window);
        this.module_battlelist = new BattleList(this.window);
        this.module_battleroom = new BattleRoom(this.window);
        this.module_download   = new Download(this.window);
        this.module_profile    = new Profile(this.window);
        this.module_settings   = new Settings(this.window);
    }

    public authenticate()
    {
        this.module_login.show();
    }

    private setup_dom()
    {
        this.window.id = "content";
    }
}
