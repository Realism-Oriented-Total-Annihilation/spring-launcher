//
//  Topbar in which you can select tabs or play
//

import { PlayButton } from "./playbutton";
import { Tabbar, Tab } from "./tabbar";

export class Topbar
{
    public bar: HTMLDivElement;

    constructor(container: HTMLDivElement)
    {
        this.bar = container;
        this.bar.id += "topbar";
    }

    public create_playbutton()
    {
        new PlayButton(this.bar)
    }

    public create_tabbar(): Tabbar
    {
        let tabbar = new Tabbar(this.bar);
        return tabbar;
    }
}