//
// Main Window
//
import { Gui }     from "./gui";
import { GuiMode } from "./gui";

// import { Chat } from "./chat";

import { Backend }     from "./backend";
import { BackendMode } from "./backend";


export class Launcher
{
    public gui:     Gui;
    // public chat:    Chat;
    public backend: Backend;

    constructor()
    {
        this.gui     = <any>null;
        this.backend = <any>null;
    }

    public run()
    {
        this.gui     = new Gui();
        this.backend = new Backend();

        this.switch_online();
    }

    public switch_online()
    {
        this.gui.mode(GuiMode.StartLogin);
        this.backend.mode(BackendMode.Online);
    }

    public switch_offline()
    {
        this.gui.mode(GuiMode.StartLocal);
        this.backend.mode(BackendMode.Local);
    }
}
