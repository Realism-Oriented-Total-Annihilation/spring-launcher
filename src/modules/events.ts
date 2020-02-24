// //
// //
// //
import { EventEmitter } from "events";
import { Tab } from "./menu/tab";
import { ChatButton } from "./chat/bar";

// enum _EventKey
// {
//     ""
// }

export class EventSubsystem
{
    private _bus: EventEmitter;

    public constructor()
    {
        this._bus = new EventEmitter();
    }

    // signals emittance
    public emit(event: "tab.selected", tab: Tab): EventSubsystem;

    public emit(event: "chat.show", chtbtn: ChatButton): EventSubsystem;
    public emit(event: "chat.hide", chtbtn: ChatButton): EventSubsystem;

    public emit(event: string, ...args: any[]): EventSubsystem
    {
        this._bus.emit(event, ...args);
        return this;
    }

    // listener registration
    public on(event: "tab.selected", listener: (tab: Tab) => void): EventSubsystem;

    public on(event: "chat.show", listener: (chtbtn: ChatButton) => void): EventSubsystem;
    public on(event: "chat.hide", listener: (chtbtn: ChatButton) => void): EventSubsystem;

    public on(event: string, listener: (...args: any[]) => void): EventSubsystem
    {
        this._bus.on(event, listener);
        return this;
    }
}
