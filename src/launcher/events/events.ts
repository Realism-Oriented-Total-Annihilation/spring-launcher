//
//
//
import { EventEmitter } from "events";

import { Tab }        from "../menu/tab";
import { ChatButton } from "../modules/chat/bar";

import { LoginCredentials }    from "./auth";
import { RegisterCredentials } from "./auth";
import { LocalCredentials }    from "./auth";


export class EventSubsystem
{
    private _bus: EventEmitter;

    public constructor()
    {
        this._bus = new EventEmitter();
    }

    // signals emittance
    public emit(event: "tab.selected", tab: Tab): EventSubsystem;

    public emit(event: "auth.login",    creds: LoginCredentials): EventSubsystem;
    public emit(event: "auth.register", creds: RegisterCredentials): EventSubsystem;
    public emit(event: "auth.offline",  creds: LocalCredentials): EventSubsystem;

    public emit(event: "chat.show", chtbtn: ChatButton): EventSubsystem;
    public emit(event: "chat.hide", chtbtn: ChatButton): EventSubsystem;

    public emit(event: "msg.sent", msg: string): EventSubsystem;
    public emit(event: "msg.recieved", msg: string): EventSubsystem;

    public emit(event: string, ...args: any[]): EventSubsystem
    {
        this._bus.emit(event, ...args);
        return this;
    }

    // listener registration
    public on(event: "tab.selected", listener: (tab: Tab) => void): EventSubsystem;

    public on(event: "auth.login",    listener: (creds: LoginCredentials) => void): EventSubsystem;
    public on(event: "auth.register", listener: (creds: RegisterCredentials) => void): EventSubsystem;
    public on(event: "auth.offline",  listener: (creds: LocalCredentials) => void): EventSubsystem;

    public on(event: "chat.show", listener: (chtbtn: ChatButton) => void): EventSubsystem;
    public on(event: "chat.hide", listener: (chtbtn: ChatButton) => void): EventSubsystem;

    public on(event: "msg.sent", listener: (msg: string) => void): EventSubsystem;
    public on(event: "msg.recieved", listener: (msg: string) => void): EventSubsystem;

    public on(event: string, listener: (...args: any[]) => void): EventSubsystem
    {
        this._bus.on(event, listener);
        return this;
    }
}
