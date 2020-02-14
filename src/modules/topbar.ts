//
//  Topbar in which you can select tabs or play
//

import { PlayButton } from "./playbutton";

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
        let playbtn = new PlayButton(this.bar)
    }
}