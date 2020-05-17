//
// Login/Registration/Terms Responses
//
import { IInbound } from "./in";

import { Command } from "../cmds";
import { PtclLine } from "../handling/line";


export class InAccepted implements IInbound
{
    public readonly command = Command.ACCEPTED;

    public readonly username: string

    constructor(reader: PtclLine)
    {
        this.username = reader.word()
            .string();
    }
}


export class InDenied implements IInbound
{
    public readonly command = Command.DENIED;

    public readonly reason: string

    constructor(reader: PtclLine)
    {
        this.reason = reader.word().string();
    }
}


export class InRegistrationAccepted implements IInbound
{
    public readonly command = Command.REGISTRATIONACCEPTED;
}


export class InRegistrationDenied implements IInbound
{
    public readonly command = Command.REGISTRATIONDENIED;

    public readonly reason: string;

    constructor(reader: PtclLine)
    {
        this.reason = reader.word().string();
    }
}


export class InAgreement implements IInbound
{
    public readonly command = Command.AGREEMENT;

    public readonly terms: string

    constructor(reader: PtclLine)
    {
        this.terms = reader.word().string();
    }
}
