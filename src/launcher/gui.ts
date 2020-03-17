//
// Graphical User Interface
//

import { StartWindow }  from "./gui/start/mod";
import { MainWindow } from "./gui/mainwindow/mainwindow";
import { Battle } from "./model/battle";
import { User } from "./model/user";
import { BattleWidget } from "./gui/mainwindow/content/tabs/battlelist";
import { UserWidget } from "./gui/mainwindow/content/tabs/chat/players";


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

    constructor()
    {
        this.window = <HTMLDivElement>document.getElementById("content");

        this.start = new StartWindow(this.window);
        this.main  = new MainWindow(this.window);

        this._mode = GuiMode.StartLogin;
    }

    public create_user(): UserWidget
    {
        return this.main.content.chat.players.create_user();
    }

    public create_battle(): BattleWidget
    {
        return this.main.content.battlelist.create_battle();
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
