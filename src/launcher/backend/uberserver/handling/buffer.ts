//
// Protocol Buffer
//
import { PtclLine } from "./line";


export class PtclBuffer
{
    private buff: string;

    constructor()
    {
        this.buff = "";
    }

    public append(data: string)
    {
        this.buff += data;
    }

    public lines(): PtclLine[]
    {
        let lines = this.buff.split("\n");
        let msgs  = [];

        this.buff = <string>lines.pop();

        for (let line of lines) {
            msgs.push(new PtclLine(line));
        }

        return msgs;
    }
}
