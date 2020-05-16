//
// Graphical User Interface
//

import { StartWindow }  from "./start/mod";
import { MainWindow } from "./mainwindow/mainwindow";
import { BattleListRowWidget } from "./mainwindow/content/tabs/battlelist";
import { UserWidget } from "./mainwindow/content/tabs/chat/players";
import { ProfileWidget } from "./mainwindow/content/tabs/profile";


export enum GuiMode
{
    StartLogin,
    StartRegister,
    StartLocal,
    StartTerms,

    MainGamesWindow,
    MainBattleList,
    MainBattleRoom,
    MainDownload,
    MainProfile,
    MainSettings,
    MainChat,
}


export class Gui
{
    private _mode: GuiMode;

    private start: StartWindow;
    private main:  MainWindow;

    private window: HTMLDivElement;

    public on_login:       (user: string, passwd: string)                => void = () => {};
    public on_register:    (user: string, passwd: string, email: string) => void = () => {};
    public on_acceptterms: (code?: string)                               => void = () => {};
    public on_msgsend:     (msg: string)                                 => void = () => {};

    private static _instance: Gui;

    private constructor()
    {
        this.window = <HTMLDivElement>document.getElementById("content");

        this.start = new StartWindow(this.window);
        this.main  = new MainWindow(this.window);

        this._mode = GuiMode.StartLogin;
    }

    public static instance(): Gui
    {
        if (!Gui._instance) {
            Gui._instance = new Gui();
        }

        return Gui._instance;
    }

    public create_user(): UserWidget
    {
        return this.main.content.chat.players.create_user();
    }

    public create_battle(): BattleListRowWidget
    {
        return this.main.content.battlelist.create_battle();
    }

    public create_profile(): ProfileWidget
    {
        return this.main.content.profile.create_profile();
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

        switch (mode)
        {
            case GuiMode.StartLogin:
            case GuiMode.StartRegister:
            case GuiMode.StartLocal:
            case GuiMode.StartTerms:
                this.main.hide();
                this.start.mode(mode);
                this.start.show();
                break;

            case GuiMode.MainBattleList:
            case GuiMode.MainBattleRoom:
            case GuiMode.MainDownload:
            case GuiMode.MainProfile:
            case GuiMode.MainSettings:
            case GuiMode.MainChat:
                this.start.hide();
                this.main.show();
                this.main.mode(mode);
                break;
        }
    }
}
