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
    public backend: Backend;
    // public chat:    Chat;
    private static _instance: Launcher

    private constructor()
    {
        this.gui     = Gui.instance();
        this.backend = Backend.instance();

        this.switch_online();
    }

    public static instance(): Launcher
    {
        if (!Launcher._instance) {
            Launcher._instance = new Launcher()
        }

        return Launcher._instance;
    }
    // public run()
    // {
    //     // this.backend = new Backend();
    // }

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
