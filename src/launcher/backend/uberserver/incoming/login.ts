//
// Login/Registration/Terms Responses
//
import { IResponse } from "./response";

import { Command } from "../cmds";
import { PtclLine } from "../handling/line";


export class RepAccepted implements IResponse
{
    public readonly command = Command.ACCEPTED;

    public readonly username: string

    constructor(reader: PtclLine)
    {
        this.username = reader.word()
            .string();
    }
}


export class RepDenied implements IResponse
{
    public readonly command = Command.DENIED;

    public readonly reason: string

    constructor(reader: PtclLine)
    {
        this.reason = reader.word().string();
    }
}


export class RepRegistrationAccepted implements IResponse
{
    public readonly command = Command.REGISTRATIONACCEPTED;
}


export class RepRegistrationDenied implements IResponse
{
    public readonly command = Command.REGISTRATIONDENIED;

    public readonly reason: string;

    constructor(reader: PtclLine)
    {
        this.reason = reader.word().string();
    }
}


export class RepAgreement implements IResponse
{
    public readonly command = Command.AGREEMENT;

    public readonly terms: string

    constructor(reader: PtclLine)
    {
        this.terms = reader.word().string();
    }
}
