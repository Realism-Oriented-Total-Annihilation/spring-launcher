//
//  Login screen dialog
//
import { ModuleBase } from "./module";


export class Login extends ModuleBase
{
    private register:  HTMLLabelElement;
    private login:     HTMLLabelElement;

    private username:  HTMLInputElement;
    private email:     HTMLInputElement;
    private password:  HTMLInputElement;

    private loginbtn:  HTMLButtonElement;
    private cancelbtn: HTMLButtonElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent);

        this.register = document.createElement("label");
        this.login    = document.createElement("label");

        this.username = document.createElement("input");
        this.email    = document.createElement("input");
        this.password = document.createElement("input");

        this.loginbtn  = document.createElement("button");
        this.cancelbtn = document.createElement("button");

        this.setup_dom();
    }

    private setup_dom()
    {
        this.register.id = "register";
        this.login.id    = "login";

        this.username.id = "username";
        this.email.id    = "email";
        this.password.id = "password";

        this.loginbtn.id  = "loginbtn";
        this.cancelbtn.id = "cancelbtn";

        this.container.appendChild(this.register);
        this.container.appendChild(this.login);
        this.container.appendChild(this.username);
        this.container.appendChild(this.email);
        this.container.appendChild(this.password);
        this.container.appendChild(this.loginbtn);
        this.container.appendChild(this.cancelbtn);
    }
}
