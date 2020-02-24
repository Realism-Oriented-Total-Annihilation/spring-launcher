//
// Main Window
//
import { EventSubsystem } from "./events";

import { LeftBar } from "./menu/menu";

import { Chat }    from "./chat/chat";
import { ChatBar } from "./chat/bar";

export class Workbench
{
    public events: EventSubsystem;

    private leftbar: LeftBar;
    private chatbar: ChatBar;
    private chat:    Chat;

    private _workbench: HTMLDivElement;

    constructor()
    {
        this._workbench = <HTMLDivElement>document.getElementById("main");

        this.events = new EventSubsystem();

        this.leftbar = <any>null;
        this.chatbar = <any>null;
        this.chat    = <any>null;
    }

    public init()
    {
        this.leftbar = new LeftBar(this._workbench);  // Leftbar(dom_left);
        this.chatbar = new ChatBar(this._workbench);  // Chatbar(dom_chatbar);
        this.chat    = new Chat(this._workbench);  // Chat(dom_chat);
    }
}
