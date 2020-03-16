//
// Graphical User Interface
//

import { StartWindow }  from "./gui/start/mod";
import { MainWindow } from "./gui/mainwindow/mainwindow";
import { RepAddUser } from "./backend/uberserver/reps/misc";


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
    // public on_newuser:     (username: string, country: string)           => void = () => {};

    constructor()
    {
        this.window = <HTMLDivElement>document.getElementById("content");

        this.start = new StartWindow(this.window);
        this.main  = new MainWindow(this.window);

        this._mode = GuiMode.StartLogin;
    }

    public display_user(name: string, country: string, client: string)
    {
        this.main.content.chat.players.add_player(name, country, client);
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
