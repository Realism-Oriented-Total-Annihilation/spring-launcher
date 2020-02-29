//
//
//
import { EventEmitter } from "events";

import { Tab }        from "../menu/tab";
import { ChatButton } from "../modules/chat/bar";

import { LoginCredentials }    from "./auth";
import { RegisterCredentials } from "./auth";
import { LocalCredentials }    from "./auth";

import { PtclAccepted } from "../backend/uberserver/ptcl";
import { PtctRegistrationAccepted } from "../backend/uberserver/ptcl";

import { Event } from "./keys";


export class EventSubsystem
{
    private _bus: EventEmitter;

    public constructor()
    {
        this._bus = new EventEmitter();
    }

    // signals emittance
    public emit(event: Event.TAB_SELECTED, tab: Tab): EventSubsystem;

    public emit(event: Event.CHAT_SHOW, chtbtn: ChatButton): EventSubsystem;
    public emit(event: Event.CHAT_HIDE, chtbtn: ChatButton): EventSubsystem;

    public emit(event: Event.MSG_SENT,     msg: string): EventSubsystem;
    public emit(event: Event.MSG_RECEIVED, msg: string): EventSubsystem;

    public emit(event: Event.SERVER_READY):  EventSubsystem;
    public emit(event: Event.SERVER_CLOSED): EventSubsystem;
    public emit(event: Event.SERVER_FAILED): EventSubsystem;

    public emit(event: Event.REQUEST_LOGIN,    creds: LoginCredentials): EventSubsystem;
    public emit(event: Event.REQUEST_REGISTER, creds: RegisterCredentials): EventSubsystem;
    public emit(event: Event.REQUEST_OFFLINE,  creds: LocalCredentials): EventSubsystem;

    public emit(event: Event.RESPONSE_ACCEPTED,   msg: PtclAccepted): EventSubsystem;
    public emit(event: Event.RESPONSE_REGISTERED, msg: PtctRegistrationAccepted): EventSubsystem;

    public emit(event: Event, ...args: any[]): EventSubsystem
    {
        console.trace(event, ...args);

        this._bus.emit(Event[event], ...args);
        return this;
    }

    // listener registration
    public on(event: Event.TAB_SELECTED, listener: (tab: Tab) => void): EventSubsystem;

    public on(event: Event.CHAT_SHOW, listener: (chtbtn: ChatButton) => void): EventSubsystem;
    public on(event: Event.CHAT_HIDE, listener: (chtbtn: ChatButton) => void): EventSubsystem;

    public on(event: Event.MSG_SENT,     listener: (msg: string) => void): EventSubsystem;
    public on(event: Event.MSG_RECEIVED, listener: (msg: string) => void): EventSubsystem;

    public on(event: Event.SERVER_READY,  listener: () => void): EventSubsystem;
    public on(event: Event.SERVER_CLOSED, listener: () => void): EventSubsystem;
    public on(event: Event.SERVER_FAILED, listener: () => void): EventSubsystem;

    public on(event: Event.REQUEST_LOGIN,    listener: (creds: LoginCredentials) => void): EventSubsystem;
    public on(event: Event.REQUEST_REGISTER, listener: (creds: RegisterCredentials) => void): EventSubsystem;
    public on(event: Event.REQUEST_OFFLINE,  listener: (creds: LocalCredentials) => void): EventSubsystem;

    public on(event: Event.RESPONSE_ACCEPTED,   listener: (msg: PtclAccepted) => void): EventSubsystem;
    public on(event: Event.RESPONSE_REGISTERED, listener: (msg: PtctRegistrationAccepted) => void): EventSubsystem;

    public on(event: Event, listener: (...args: any[]) => void): EventSubsystem
    {
        console.trace(event, listener);

        this._bus.on(Event[event], listener);
        return this;
    }
}
