//
// Outbound Message Handler
//
import { IOutbound } from "./msgs/out";

import { OutPing } from "./msgs/out_misc";

import { OutLogin }            from "./msgs/out_login";
import { OutRegister }         from "./msgs/out_login";
import { OutConfirmAgreement } from "./msgs/out_login";


export class UberOutbound
{
    public outbound: (msg: IOutbound) => void = () => {};  // provided by UberBackend

    private out_creds?: {user: string, password: string}

    public out_ping()
    {
        this.outbound(new OutPing());
    }

    public out_login(user: string, password: string, local_address: string)
    {
        this.outbound(new OutLogin(user, password, local_address));
    }

    public out_register(user: string, password: string, email: string)
    {
        this.outbound(new OutRegister(user, password, email));
        this.out_creds = {user, password};
    }

    public out_accept_terms(code?: string)
    {
        this.outbound(new OutConfirmAgreement(code));
    }
}
