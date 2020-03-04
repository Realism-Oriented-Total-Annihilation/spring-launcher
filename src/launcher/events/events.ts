//
//
//
import { EventEmitter } from "events";

import { Tab }        from "../menu/tab";
import { ChatButton } from "../modules/chat/bar";

import { EvLoginCredentials }        from "./auth";
import { EvVerificationCode }        from "./auth";
import { EvRegistrationCredentials } from "./auth";
import { EvLocalCredentials }        from "./auth";

import { PtclLoginOk, PtclAgreement }         from "../backend/uberserver/ptcl";
import { PtclLoginErr }        from "../backend/uberserver/ptcl";
import { PtclRegistrationOk }  from "../backend/uberserver/ptcl";
import { PtclRegistrationErr } from "../backend/uberserver/ptcl";

import { Event } from "./keys";
import { EvServerSettings } from "./server";
import { EvGuiMode } from "./gui";

import { GameBase } from "../modules/games";


export class EventSubsystem
{
    private _bus: EventEmitter;

    public constructor()
    {
        this._bus = new EventEmitter();
    }

    // signals emittance
    public emit(event: Event.SELECT_MODE, mode: EvGuiMode): EventSubsystem;

    public emit(event: Event.TAB_SELECTED, tab: Tab): EventSubsystem;

    public emit(event: Event.CHAT_SHOW, chtbtn: ChatButton): EventSubsystem;
    public emit(event: Event.CHAT_HIDE, chtbtn: ChatButton): EventSubsystem;

    public emit(event: Event.MSG_SENT,     msg: string): EventSubsystem;
    public emit(event: Event.MSG_RECEIVED, msg: string): EventSubsystem;

    // public emit(event: Event.MODE_ONLINE, cfg: EvServerSettings): EventSubsystem;
    // public emit(event: Event.MODE_LOCAL): EventSubsystem;

    public emit(event: Event.GAME_SELECTED, game: GameBase): EventSubsystem;

    public emit(event: Event.SERVER_READY):  EventSubsystem;
    public emit(event: Event.SERVER_CLOSED): EventSubsystem;
    public emit(event: Event.SERVER_FAILED): EventSubsystem;

    public emit(event: Event.REQUEST_LOGIN,        creds: EvLoginCredentials): EventSubsystem;
    public emit(event: Event.REQUEST_REGISTRATION, creds: EvRegistrationCredentials): EventSubsystem;
    public emit(event: Event.REQUEST_OFFLINE,      creds: EvLocalCredentials): EventSubsystem;
    public emit(event: Event.REQUEST_AGREE_TERMS,  code:  EvVerificationCode): EventSubsystem;

    public emit(event: Event.RESPONSE_LOGIN_OK,           msg: PtclLoginOk): EventSubsystem;
    public emit(event: Event.RESPONSE_LOGIN_ERROR,        msg: PtclLoginErr): EventSubsystem;
    public emit(event: Event.RESPONSE_LOGIN_AGREEMENT,    msg: PtclAgreement): EventSubsystem;
    public emit(event: Event.RESPONSE_REGISTRATION_OK,    msg: PtclRegistrationOk): EventSubsystem;
    public emit(event: Event.RESPONSE_REGISTRATION_ERROR, msg: PtclRegistrationErr): EventSubsystem;
    public emit(event: Event.RESPONSE_PONG): EventSubsystem;

    public emit(event: Event, ...args: any[]): EventSubsystem
    {
        this._bus.emit(Event[event], ...args);
        return this;
    }

    // listener registration
    public on(event: Event.SELECT_MODE, listener: (mode: EvGuiMode) => void): EventSubsystem;

    public on(event: Event.TAB_SELECTED, listener: (tab: Tab) => void): EventSubsystem;

    public on(event: Event.CHAT_SHOW, listener: (chtbtn: ChatButton) => void): EventSubsystem;
    public on(event: Event.CHAT_HIDE, listener: (chtbtn: ChatButton) => void): EventSubsystem;

    public on(event: Event.MSG_SENT,     listener: (msg: string) => void): EventSubsystem;
    public on(event: Event.MSG_RECEIVED, listener: (msg: string) => void): EventSubsystem;

    // public on(event: Event.MODE_ONLINE, listener: (cfg: EvServerSettings) => void): EventSubsystem;
    // public on(event: Event.MODE_LOCAL,  listener: () => void): EventSubsystem;

    public on(event: Event.GAME_SELECTED,  listener: (game: GameBase) => void): EventSubsystem;

    public on(event: Event.SERVER_READY,  listener: () => void): EventSubsystem;
    public on(event: Event.SERVER_CLOSED, listener: () => void): EventSubsystem;
    public on(event: Event.SERVER_FAILED, listener: () => void): EventSubsystem;

    public on(event: Event.REQUEST_LOGIN,        listener: (creds: EvLoginCredentials) => void): EventSubsystem;
    public on(event: Event.REQUEST_REGISTRATION, listener: (creds: EvRegistrationCredentials) => void): EventSubsystem;
    public on(event: Event.REQUEST_OFFLINE,      listener: (creds: EvLocalCredentials) => void): EventSubsystem;
    public on(event: Event.REQUEST_AGREE_TERMS,  listener: (code:  EvVerificationCode) => void): EventSubsystem;

    public on(event: Event.RESPONSE_LOGIN_OK,           listener: (msg: PtclLoginOk) => void): EventSubsystem;
    public on(event: Event.RESPONSE_LOGIN_ERROR,        listener: (msg: PtclLoginErr) => void): EventSubsystem;
    public on(event: Event.RESPONSE_LOGIN_AGREEMENT,    listener: (msg: PtclAgreement) => void): EventSubsystem;
    public on(event: Event.RESPONSE_REGISTRATION_OK,    listener: (msg: PtclRegistrationOk) => void): EventSubsystem;
    public on(event: Event.RESPONSE_REGISTRATION_ERROR, listener: (msg: PtclRegistrationErr) => void): EventSubsystem;
    public on(event: Event.RESPONSE_PONG,               listener: () => void): EventSubsystem;

    public on(event: Event, listener: (...args: any[]) => void): EventSubsystem
    {
        this._bus.on(Event[event], listener);
        return this;
    }
}
