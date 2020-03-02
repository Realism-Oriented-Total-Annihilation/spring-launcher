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
import { GameSelector } from "./modules/login/games";


export class Launcher
{
    public events: EventSubsystem;

    // Login
    public logincontent: HTMLDivElement;
    public login:        Login;

    // Game Selection
    public gameselectioncontent: HTMLDivElement;
    public gameselector:         GameSelector;

    // Lobby
    public lobbycontent: HTMLDivElement;

    public menu:    Menu;
    public chatbar: ChatBar;
    public chat:    Chat;

    public battlelist: BattleList;
    public battleroom: BattleRoom;
    public download:   Download;
    public profile:    Profile;
    public settings:   Settings;

    private backend: Backend;

    private window: HTMLDivElement;

    constructor()
    {
        this.window = <HTMLDivElement>document.getElementById("window");

        this.events = new EventSubsystem();

        this.backend = <any>null;


        // Login
        this.logincontent = document.createElement("div");
        this.login        = <any>null;

        // Game Selection
        this.gameselectioncontent = document.createElement("div");
        this.gameselector = <any> null;


        // Lobby
        this.lobbycontent = document.createElement("div");

        this.menu    = <any>null;
        this.chatbar = <any>null;
        this.chat    = <any>null;

        this.battlelist = <any>null;
        this.battleroom = <any>null;
        this.download   = <any>null;
        this.profile    = <any>null;
        this.settings   = <any>null;

        this.setup_dom();
    }

    public init()
    {
        this.backend = new Backend();

        // Login
        this.login = new Login(this.logincontent);

        // Game Selection
        this.gameselector = new GameSelector(this.gameselectioncontent);

        // Lobby
        this.menu       = new Menu(this.lobbycontent);
        this.chatbar    = new ChatBar(this.lobbycontent);
        this.chat       = new Chat(this.lobbycontent);
        this.battlelist = new BattleList(this.lobbycontent);
        this.battleroom = new BattleRoom(this.lobbycontent);
        this.download   = new Download(this.lobbycontent);
        this.profile    = new Profile(this.lobbycontent);
        this.settings   = new Settings(this.lobbycontent);

        this.setup_events();

        this.login.show();
    }

    public authenticate()
    {
        this.window.appendChild(this.logincontent);
    }

    public select_game()
    {
        this.window.removeChild(this.logincontent);
        this.window.appendChild(this.gameselectioncontent);
    }

    public launch_lobby()
    {
        this.window.removeChild(this.gameselectioncontent);
        this.window.appendChild(this.lobbycontent);
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
