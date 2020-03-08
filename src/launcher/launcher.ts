//
// Main Window
//
import { Gui }     from "./gui";
import { GuiMode } from "./gui";

import { StartMode } from "./gui/start/mod";

import { Backend }     from "./backend";
import { BackendMode } from "./backend";


export class Launcher
{
    public gui:     Gui;
    public backend: Backend;

    constructor()
    {
        this.gui     = new Gui();
        this.backend = new Backend();;

        this.switch_online();
    }

    public switch_online()
    {
        this.gui.mode(GuiMode.Start);
        this.backend.mode(BackendMode.Online);
    }

    public switch_offline()
    {
        this.gui.mode(GuiMode.Start);
        this.gui.start.mode(StartMode.Local);

        this.backend.mode(BackendMode.Local);
    }
}
