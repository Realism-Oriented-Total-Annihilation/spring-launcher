//
// Graphical User Interface
//
import { Menu }    from "./menu/menu";
import { Chat }    from "./gui/chat/chat";
import { ChatBar } from "./gui/chat/bar";

import { Profile }      from "./gui/profile";
import { GameSelector } from "./gui/games";
import { StartModule }  from "./gui/start/mod";
import { BattleList }   from "./gui/battlelist";
import { BattleRoom }   from "./gui/battleroom";
import { Download }     from "./gui/download";
import { Settings }     from "./gui/settings";


export enum GuiMode
{
    StartLogin,
    StartRegister,
    StartLocal,
    StartTerms,
    GamesWindow,
    BattleList,
    BattleRoom,
    Download,
    Profile,
    Settings,
}


export class Gui
{
    private _mode: GuiMode;

    private start:       StartModule;
    private gameswindow: GameSelector;
    private battlelist:  BattleList;
    private battleroom:  BattleRoom;
    private download:    Download;
    private profile:     Profile;
    private settings:    Settings;

    private menu:    Menu;
    private chatbar: ChatBar;
    private chat:    Chat;

    private window: HTMLDivElement;

    public on_login:       (user: string, passwd: string)                => void = () => {};
    public on_register:    (user: string, passwd: string, email: string) => void = () => {};
    public on_acceptterms: (code?: string)                               => void = () => {};

    constructor()
    {
        this.window = <HTMLDivElement>document.getElementById("content");

        this.start       = <any>null;
        this.gameswindow = <any>null;
        this.battlelist  = <any>null;
        this.battleroom  = <any>null;
        this.download    = <any>null;
        this.profile     = <any>null;
        this.settings    = <any>null;

        this.menu    = <any>null;
        this.chatbar = <any>null;
        this.chat    = <any>null;

        this._mode = GuiMode.StartLogin;
    }

    public error(msg: string)
    {
        switch (this._mode)
        {
            case GuiMode.StartLogin:
            case GuiMode.StartRegister:
            case GuiMode.StartLocal:
            case GuiMode.StartTerms:
                this.start.error(msg);
                break;

            default:
                console.error(msg);
        }
    }

    public mode(mode: GuiMode)
    {
        this._mode = mode;

        this.start?.hide();
        this.gameswindow?.hide();
        this.battlelist?.hide();
        this.battleroom?.hide();
        this.download?.hide();
        this.profile?.hide();
        this.settings?.hide();

        let show_menus = false;

        switch (mode)
        {
            case GuiMode.StartLogin:
            case GuiMode.StartRegister:
            case GuiMode.StartLocal:
            case GuiMode.StartTerms:
                if (this.start == null) {
                    this.start = new StartModule(this.window);
                }
                this.start.mode(mode);
                this.start.show();
                show_menus = false;
                break;

            case GuiMode.GamesWindow:
                if (this.gameswindow == null) {
                    this.gameswindow = new GameSelector(this.window);
                }
                this.gameswindow.show();
                show_menus = false;
                break;

            case GuiMode.BattleList:
                if (this.battlelist == null) {
                    this.battlelist = new BattleList(this.window);
                }
                this.battlelist.show();
                show_menus = true;
                break;

            case GuiMode.BattleRoom:
                if (this.battleroom == null) {
                    this.battleroom = new BattleRoom(this.window);
                }
                this.battleroom.show();
                show_menus = true;
                break;

            case GuiMode.Download:
                if (this.download == null) {
                    this.download = new Download(this.window);
                }
                this.download.show();
                show_menus = true;
                break;

            case GuiMode.Profile:
                if (this.profile == null) {
                    this.profile = new Profile(this.window);
                }
                this.profile.show();
                show_menus = true;
                break;

            case GuiMode.Settings:
                if (this.settings == null) {
                    this.settings = new Settings(this.window);
                }
                this.settings.show();
                show_menus = true;
                break;
        }

        if (show_menus)
        {
            if (this.menu == null)    { this.menu    = new Menu(this.window); }
            if (this.chatbar == null) { this.chatbar = new ChatBar(this.window); }
            if (this.chat == null)    { this.chat    = new Chat(this.window); }

            this.menu.show();
            this.chatbar.show();
            this.chat.show();
        } else {
            this.menu?.hide();
            this.chatbar?.hide();
            this.chat?.hide();
        }
    }
}
