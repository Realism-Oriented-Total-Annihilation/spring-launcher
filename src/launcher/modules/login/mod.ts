//
//  Login screen dialog
//
import { sl } from "../../../renderer";

import { WidgetBase } from "../../widgets/base";

import { Event }      from "../../events/keys";
import { EvGuiMode }  from "../../events/gui";

import { FormSelector } from "./selector";
import { FormLogin }    from "./login";
import { FormRegister } from "./register";
import { FormLocal }    from "./local";
import { FormTerms }    from "./terms";


export class LoginModule extends WidgetBase<HTMLDivElement>
{
    private springlogo: HTMLDivElement;

    private changebutton: HTMLButtonElement;

    private form_selector: FormSelector;
    private form_login:    FormLogin;
    private form_register: FormRegister;
    private form_offline:  FormLocal;
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
        this.form_offline  = new FormLocal(this.container);
        this.form_terms    = new FormTerms(this.container);

        this.container.appendChild(this.changebutton);

        this.setup_dom();
        this.setup_wiring();
        this.setup_events();
    }

    private setup_dom()
    {
        this.container.id    = "login";
        this.springlogo.id   = "login-logo";
        this.changebutton.id = "login-toggle";

        this.changebutton.innerText = "Local Mode";
    }

    private setup_wiring()
    {
        this.changebutton.addEventListener("click", () =>
        {
            switch (this.changebutton.innerText)
            {
                case "Online Mode":
                    sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_ONLINE);
                    this.changebutton.innerText = "Local Mode";
                    break;

                case "Local Mode":
                    sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_OFFLINE);
                    this.changebutton.innerText = "Online Mode";
                    break;

                default:
                    break;
            }
        });
    }

    private setup_events()
    {
        sl.events.on(Event.SELECT_MODE, (mode) =>
        {
            switch (mode)
            {
                case EvGuiMode.LOGIN_ONLINE:
                case EvGuiMode.LOGIN_REGISTER:
                case EvGuiMode.LOGIN_OFFLINE:
                case EvGuiMode.LOGIN_TERMS:
                    this.show();
                    break;

                default:
                    this.hide();
            }
        })
    }
}
