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
import { sl } from "../renderer";
import { Event } from "./events/keys";


export class Launcher
{
    public events: EventSubsystem;

    public menu:    Menu;
    public chatbar: ChatBar;
    public chat:    Chat;

    public battlelist: BattleList;
    public battleroom: BattleRoom;
    public download:   Download;
    public login:      Login;
    public profile:    Profile;
    public settings:   Settings;

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

        this.battlelist = <any>null;
        this.battleroom = <any>null;
        this.download   = <any>null;
        this.login      = <any>null;
        this.profile    = <any>null;
        this.settings   = <any>null;

        this.setup_dom();
    }

    public init()
    {
        this.backend = new Backend();

        this.menu = new Menu(this.window);

        this.chatbar = new ChatBar(this.window);
        this.chat    = new Chat(this.window);

        this.login      = new Login(this.window);
        this.battlelist = new BattleList(this.window);
        this.battleroom = new BattleRoom(this.window);
        this.download   = new Download(this.window);
        this.profile    = new Profile(this.window);
        this.settings   = new Settings(this.window);

        this.setup_events();
    }

    public authenticate()
    {
        this.login.show();
    }

    private setup_dom()
    {
        this.window.id = "content";
    }

    private setup_events()
    {
        sl.events.on(Event.RESPONSE_LOGIN_OK, () => {
            this.login.hide();
        })
    }
}
