//
//
//
import { sl } from "../../../renderer";

import { WidgetBase } from "../../common/widget";
import { InputField } from "../../common/input";


export class FormLogin extends WidgetBase<HTMLFormElement>
{
    private field_user:   InputField;
    private field_passwd: InputField;
    private field_button: InputField;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("form"));

        this.container.className = "login-form";

        this.field_user = new InputField(this.container, {
            class:       "login-input",
            type:        "text",
            placeholder: "Username",
            required:    true
        });

        this.field_passwd = new InputField(this.container, {
            class:       "login-input",
            type:        "password",
            placeholder: "Password",
            required:    true
        });

        this.field_button = new InputField(this.container, {
            class: "login-button",
            type:  "submit",
            value: "Login"
        });

        this.setup_wiring();
        // this.setup_events();
    }

    private async setup_wiring()
    {
        this.container.onsubmit = async (ev) => { await this.do_submit(ev); };
    }

    private async do_submit(ev: Event)
    {
        let user   = this.field_user.value;
        let passwd = this.field_passwd.value;

        this.show_loading(true);
        sl.gui.on_login(user, passwd);

        ev.preventDefault();
        this.container.reset();  // DELME
    }

    private show_loading(active: boolean)
    {
        let loader = document.createElement("div");

        loader.className = "loader";

        loader.style.position = "fixed";
        loader.style.right    = "5px";
        loader.style.bottom   = "288px";

        this.container.appendChild(loader);
    }
}
