//
// Main Window
//
import { EventSubsystem } from "./events/events";

import { Menu } from "./menu/menu";

import { Chat }    from "./modules/chat/chat";
import { ChatBar } from "./modules/chat/bar";

// modules
import { Profile }     from "./modules/profile";
import { LoginModule } from "./modules/login/mod";
import { BattleList }  from "./modules/battlelist";
import { BattleRoom }  from "./modules/battleroom";
import { Download }    from "./modules/download";
import { Settings }    from "./modules/settings";
import { Backend }     from "./backend/backend";
import { sl } from "../renderer";
import { Event } from "./events/keys";
import { GameSelector } from "./modules/games";
import { EvGuiMode } from "./events/gui";


export class Launcher
{
    public events: EventSubsystem;

    public menu:    Menu;
    public chatbar: ChatBar;
    public chat:    Chat;

    public login:      LoginModule;
    public games:      GameSelector;
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

        this.events  = new EventSubsystem();
        this.backend = <any>null;

        this.menu    = <any>null;
        this.chatbar = <any>null;
        this.chat    = <any>null;

        this.login      = <any>null;
        this.games      = <any>null;
        this.battlelist = <any>null;
        this.battleroom = <any>null;
        this.download   = <any>null;
        this.profile    = <any>null;
        this.settings   = <any>null;

        this.setup_dom();
    }

    public run()
    {
        this.backend  = new Backend();
        this.download = new Download(this.window);

        this.setup_events();

        sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_ONLINE);
    }

    private setup_dom()
    {
        this.window.id = "content";
    }

    private setup_events()
    {
        // lazy loading of sections
        sl.events.on(Event.SELECT_MODE, (mode) =>
        {
            switch (mode)
            {
                case EvGuiMode.LOGIN_ONLINE:
                    if (this.login == null) {
                        this.login = new LoginModule(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_ONLINE);
                    }
                    break;

                case EvGuiMode.LOGIN_REGISTER:
                    if (this.login == null) {
                        this.login = new LoginModule(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_REGISTER);
                    }
                    break;

                case EvGuiMode.LOGIN_OFFLINE:
                    if (this.login == null) {
                        this.login = new LoginModule(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_OFFLINE);
                    }
                    break;

                case EvGuiMode.LOGIN_TERMS:
                    if (this.login == null) {
                        this.login = new LoginModule(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_TERMS);
                    }
                    break;

                case EvGuiMode.GAME_SELECT:
                    if (this.games == null) {
                        this.games = new GameSelector(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.GAME_SELECT);
                    }
                    break;

                case EvGuiMode.BATTLE_LIST:
                    if (this.battlelist == null) {
                        this.battlelist = new BattleList(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.BATTLE_LIST);
                    }
                    break;

                case EvGuiMode.BATTLE_ROOM:
                    if (this.battleroom == null) {
                        this.battleroom = new BattleRoom(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.BATTLE_ROOM);
                    }
                    break;

                case EvGuiMode.PROFILE:
                    if (this.profile == null) {
                        this.profile = new Profile(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.PROFILE);
                    }
                    break;

                case EvGuiMode.SETTINGS:
                    if (this.settings == null) {
                        this.settings = new Settings(this.window);
                        sl.events.emit(Event.SELECT_MODE, EvGuiMode.SETTINGS);
                    }
                    break;
            }
        });
    }
}
