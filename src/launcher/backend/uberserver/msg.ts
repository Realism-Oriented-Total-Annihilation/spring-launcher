//
//
//
import { MessageType }     from "./cmds";
import { MessageTypeKeys } from "./cmds";

import { PtclLoginOk, PtclAgreement }         from "./ptcl";
import { PtclLoginErr }        from "./ptcl";
import { PtclRegistrationOk }  from "./ptcl";
import { PtclRegistrationErr } from "./ptcl";


export class Message
{
    public readonly command: MessageType;

    private reader: MsgReader;

    constructor(raw: string)
    {
        this.reader  = new MsgReader(raw);
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

    public into_login_agreement(): PtclAgreement
    {
        let words = [];
        let last  = "";

        while (!this.reader.is_empty())
        {
            let next = this.reader.word();

            words.push(next);
            last = next;
        }

        let terms = words.join(" ");

        let rmidx = terms.search("\nAGREEMENTEND");
        terms = terms.slice(0, rmidx);

        return {terms: terms}
    }

    public into_registration_ok(): PtclRegistrationOk
    {
        return {}
    }

    public into_registration_error(): PtclRegistrationErr
    {
        return {reason: this.reader.sentence()}
    }

    public into_pong(): void
    {
        // NOOP
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
        let idx = this.raw.search(" ");

        if (idx < 0 && this.raw.length > 0)
        {
            let head = this.raw;
            this.raw = "";

            return head;
        }
        else if (idx >= 0)
        {
            let head = this.raw.slice(0, idx);
            let tail = this.raw.slice(idx + 1, this.raw.length);

            this.raw = tail;
            return head;
        }
        else {
            throw "Error while parsing incoming message while expecting a word argument"
        }
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

    public is_empty(): boolean
    {
        return this.raw == "";
    }
}
