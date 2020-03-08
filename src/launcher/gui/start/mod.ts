//
//  Login screen dialog
//
import { WidgetBase } from "../../widgets/base";

import { FormSelector } from "./selector";
import { FormLogin }    from "./login";
import { FormRegister } from "./register";
import { FormLocal }    from "./local";
import { FormTerms }    from "./terms";


export class StartModule extends WidgetBase<HTMLDivElement>
{
    private springlogo: HTMLDivElement;

    private changebutton: HTMLButtonElement;

    private form_selector: FormSelector;
    private form_login:    FormLogin;
    private form_register: FormRegister;
    private form_local:    FormLocal;
    private form_terms:    FormTerms;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));

        this.springlogo   = document.createElement("div");
        this.changebutton = document.createElement("button");

        this.container.appendChild(this.springlogo);

        this.form_selector = new FormSelector(this.container);
        this.form_login    = new FormLogin(this.container);
        this.form_register = new FormRegister(this.container);
        this.form_local    = new FormLocal(this.container);
        this.form_terms    = new FormTerms(this.container);

        this.container.appendChild(this.changebutton);

        this.setup_dom();
        this.setup_wiring();

        this.mode(StartMode.Login);
    }

    public mode(mode: StartMode)
    {
        this.form_login.hide();
        this.form_register.hide();
        this.form_local.hide();
        this.form_terms.hide();

        switch (mode)
        {
            case StartMode.Login:
                this.form_login.show();
                break;

            case StartMode.Register:
                this.form_register.show();
                break;

            case StartMode.Local:
                this.form_terms.show();
                break;

            case StartMode.Terms:
                this.form_local.show();
                break;
        }
    }

    private setup_dom()
    {
        this.container.id    = "login";
        this.springlogo.id   = "login-logo";
        this.changebutton.id = "login-toggle";

        this.changebutton.innerText = "Local Mode";

        this.form_selector.show();
    }

    private setup_wiring()
    {
        this.changebutton.addEventListener("click", () =>
        {
            switch (this.changebutton.innerText)
            {
                case "Online Mode":
                    this.show_online()
                    break;

                case "Local Mode":
                    this.show_local()
                    break;
            }
        });

        this.form_selector.on_online(() => {
            this.mode(StartMode.Login);
        });

        this.form_selector.on_register(() => {
            this.mode(StartMode.Register);
        });

        this.form_selector.on_local(() => {
            this.mode(StartMode.Local);
        });
    }

    private show_online()
    {
        this.changebutton.innerText = "Local Mode";

        this.form_register.hide();
        this.form_local.hide();
        this.form_terms.hide();

        this.form_login.show();

        this.form_selector.select_login();
    }

    private show_local()
    {
        this.changebutton.innerText = "Online Mode";

        this.form_login.hide();
        this.form_register.hide();
        this.form_terms.hide();

        this.form_local.show();

        this.form_selector.select_local();
    }
}


export enum StartMode
{
    Login,
    Register,
    Local,
    Terms,
}
