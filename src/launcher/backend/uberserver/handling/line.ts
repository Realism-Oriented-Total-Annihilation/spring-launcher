//
//
//
import { PtclWord } from "./word";


export class PtclLine
{
    private raw: string;

    constructor(raw: string)
    {
        this.raw = raw;
    }

    public word(): PtclWord
    {
        let idx = this.raw.search(" ");

        if (idx < 0 && this.raw.length > 0)
        {
            let head = this.raw;
            this.raw = "";

            return new PtclWord(head);
        }
        else if (idx >= 0)
        {
            let head = this.raw.slice(0, idx);
            let tail = this.raw.slice(idx + 1, this.raw.length);

            this.raw = tail;
            return new PtclWord(head);
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
