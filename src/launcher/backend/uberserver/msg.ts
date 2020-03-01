//
//
//
import { MessageType }     from "./cmds";
import { MessageTypeKeys } from "./cmds";

import { PtclLoginOk }         from "./ptcl";
import { PtclLoginErr }        from "./ptcl";
import { PtctRegistrationOk }  from "./ptcl";
import { PtctRegistrationErr } from "./ptcl";


export class Message
{
    public readonly command: MessageType;

    private reader: MsgReader;

    constructor(raw: string)
    {
        this.reader = new MsgReader(raw);

        this.command = MessageType[<MessageTypeKeys>this.reader.word()];

        if (! this.command) {
            throw `Unable to parse command from incoming server message: ${raw}`;
        }
    }

    public into_login_ok(): PtclLoginOk
    {
        return {username: this.reader.word()};
    }

    public into_login_error(): PtclLoginErr
    {
        return {reason: this.reader.sentence()};
    }

    public into_registration_ok(): PtctRegistrationOk
    {
        return {}
    }

    public into_registration_error(): PtctRegistrationErr
    {
        return {reason: this.reader.sentence()}
    }
}


class MsgReader
{
    private raw: string;

    constructor(raw: string)
    {
        this.raw = raw.trim();
    }

    public word(): string
    {
        let parts = this.raw.split(" ", 1);

        if (parts.length > 1) {
            this.raw = parts[1].trim();
        }

        if (parts.length > 0) {
            return parts[0];
        }

        throw "Error while parsing incoming message while expecting a word argument"
    }

    public sentence(): string
    {
        let parts = this.raw.split("\t", 1);

        if (parts.length > 1) {
            this.raw = parts[1].trim();
        }

        if (parts.length > 0) {
            return parts[0];
        }

        throw "Error while parsing incoming message while expecting a word argument"
    }
}
