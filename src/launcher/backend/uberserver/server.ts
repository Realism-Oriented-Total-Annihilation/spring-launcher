//
// Uber Lobby Server
//
import { Socket } from "net";

import { PtclBuffer } from "./handling/buffer";

import { Command } from "./cmds";

import { Inbound }   from "./msgs/in";
import { IOutbound } from "./msgs/out";


export class UberSocket
{
    public handle_inbound: (msg: Inbound) => void = () => {};

    public  socket: Socket     = new Socket();
    private buffer: PtclBuffer = new PtclBuffer();

    public handle_outbound(cmd: IOutbound)
    {
        let raw = Command[cmd.command];

        if (cmd.words()) {
            raw += ` ${cmd.words().join(" ")}`;
        }

        if (cmd.sentences()) {
            raw += ` ${cmd.sentences().join("\t")}`
        }

        console.debug(`[server][>] ${raw}`);

        raw += "\n";

        this.socket.write(raw);
    }

    public socket_receive(data: string)
    {
        this.buffer.append(data);

        for (let msg of this.buffer.parse())
        {
            console.debug(`[server][<] ${Command[msg.command]}`);
            this.handle_inbound(msg);
        }
    }
}
