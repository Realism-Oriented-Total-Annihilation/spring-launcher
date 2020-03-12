//
// Graphical User Interface
//

import { StartWindow }  from "./gui/start/mod";
import { MainWindow } from "./gui/mainwindow/mainwindow";


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

    constructor()
    {
        this.window = <HTMLDivElement>document.getElementById("content");

        this.start = <any>null;
        this.main  = <any>null;

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

        switch (mode)
        {
            case GuiMode.StartLogin:
            case GuiMode.StartRegister:
            case GuiMode.StartLocal:
            case GuiMode.StartTerms:
                if (this.start == null) { this.start = new StartWindow(this.window); }
                // this.main.hide();
                this.start.mode(mode);
                this.start.show();
                break;

            case GuiMode.MainBattleList:
            case GuiMode.MainBattleRoom:
            case GuiMode.MainDownload:
            case GuiMode.MainProfile:
            case GuiMode.MainSettings:
                if (this.main == null) { this.main = new MainWindow(this.window); }
                // this.start.hide();
                this.main.show();
                this.main.mode(mode);
                break;
        }
    }
}
