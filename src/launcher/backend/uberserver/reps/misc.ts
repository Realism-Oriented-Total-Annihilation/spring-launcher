//
// Pong/...
//
import { IResponse } from "./response";

import { Command } from "../cmds";


export class RepPong implements IResponse
{
    public readonly command = Command.PONG;
}
