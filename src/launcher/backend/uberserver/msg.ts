//
//
//
import { MessageType }     from "./cmds";
import { MessageTypeKeys } from "./cmds";

import { PtclAccepted }             from "./ptcl";
import { PtctRegistrationAccepted } from "./ptcl";


export class Message
{
    public readonly raw:       string;
    public readonly command:   MessageType;
    public readonly words:     string[];
    public readonly sentences: string[];

    constructor(raw: string)
    {
        this.raw = raw;

        let args = raw.split("\t", 1);

        this.words     = args[0].split("\n");
        this.sentences = args[1].split("\t");

        let cmd = <MessageTypeKeys>this.words[0]
        this.command = MessageType[cmd];

        if (! this.command) {
            throw `Unknown incoming command from server: ${cmd}`;
        }

        this.words.splice(0, 1);  // remove command from top
    }

    public into_accepted(): PtclAccepted
    {
        return {username: this.words[0]};
    }

    public into_registered(): PtctRegistrationAccepted
    {
        return {}
    }
}
