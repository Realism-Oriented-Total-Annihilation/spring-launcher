//
// Login Interaction
//
import { Command } from "./cmds";


interface Request
{
    command:   Command;    // outgoing request command
    responses: Command[];  // commands that denote ok
    errors:    Command[];  // commands that denote error
}


class ReqLogin implements Request
{
    public command   = Command.LOGIN;
    public responses = [Command.ACCEPTED];
    public errors    = [Command.DENIED, Command.AGREEMENT];

    // constructor()
}
