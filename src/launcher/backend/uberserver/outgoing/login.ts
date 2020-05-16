//
// Login/Registration/Terms Requests
//
import * as crypto from "crypto-js";

var md5    = crypto.MD5;
var base64 = crypto.enc.Base64;

import { Command }  from "../cmds";
import { IRequest } from "./request";


export class ReqLogin extends IRequest
{
    public readonly command = Command.LOGIN;

    public readonly user:     string;
    public readonly password: string;
    public readonly host:     string;

    constructor(user: string, password: string, host?: string)
    {
        super();

        this.user     = user;
        this.password = password;
        this.host     = host ? host : "*";
    }

    public words(): string[] {
        return [this.user, base64.stringify(md5(this.password)), "0", this.host];
    }

    public sentences(): string[] {
        return ["Spring Launcher"];
    }
}


export class ReqRegister extends IRequest
{
    public readonly command = Command.REGISTER;

    public readonly user:     string;
    public readonly password: string;
    public readonly email:    string;

    constructor(user: string, password: string, email: string)
    {
        super();

        this.user     = user;
        this.password = password;
        this.email    = email;
    }

    public words(): string[] {
        return [this.user, base64.stringify(md5(this.password)), this.email];
    }
}


export class ReqConfirmAgreement extends IRequest
{
    public readonly command = Command.CONFIRMAGREEMENT;

    public readonly code?: string

    constructor(code?: string)
    {
        super();

        this.code = code;
    }

    public words(): string[]
    {
        return this.code ? [this.code] : [];
    }
}
