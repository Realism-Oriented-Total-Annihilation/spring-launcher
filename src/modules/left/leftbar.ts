//
//  Leftbar in which you can select tabs or play
//
import { LeftbarContainer } from "./leftbarcontainer";


export class Leftbar
{
    public bar: HTMLDivElement;

    constructor(container: HTMLDivElement)
    {
        this.bar     = container;
        container.id = "leftbar";
    }

    public create_container(id: string): LeftbarContainer
    {
        let leftbarcontainer = new LeftbarContainer(this.bar, id);
        return leftbarcontainer;
    }

    public paint()
    {
        // ORDER IS IMPORTANT!! FLEX PROPERTY...
        let topbar    = this.create_container("topbar");
        let tabbar    = this.create_container("tabbar");
        let bottombar = this.create_container("bottombar");

        topbar.create_tab("Profile");
        tabbar.create_tab("Battlelist");
        tabbar.create_tab("Download");
        bottombar.create_tab("Settings");
    }
}