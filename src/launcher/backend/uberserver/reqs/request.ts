//
// Request Interface
//
import { Command } from "../cmds";


export abstract class IRequest
{
    public abstract readonly command: Command;

    public words(): string[] {
        return [];
    }

    public sentences(): string[] {
        return [];
    }
}
