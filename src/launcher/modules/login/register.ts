//
//
//
import { sl } from "../../../renderer";

import { Event } from "../../events/keys";

import { WidgetBase } from "../../widgets/base";
import { InputField } from "../../widgets/input";
import { EvGuiMode } from "../../events/gui";


export class FormRegister extends WidgetBase<HTMLFormElement>
{
    private field_user:    InputField;
    private field_passwd:  InputField;
    private field_confirm: InputField;
    private field_email:   InputField;
    private field_button:  InputField;
    // private verify:        FormAgreeTerms;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("form"));

        this.container.id        = "register-form";
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

        this.field_confirm = new InputField(this.container, {
            class:       "login-input",
            type:        "password",
            placeholder: "Confirm Password",
            required:    true
        });

        this.field_email = new InputField(this.container, {
            class:       "login-input",
            type:        "email",
            placeholder: "E-Mail Address",
            required:    true
        });

        this.field_button = new InputField(this.container, {
            class: "login-button",
            type:  "submit",
            value: "Register"
        });

        this.setup_wiring();
        this.setup_events();
    }

    private setup_wiring()
    {
        this.container.onsubmit = (ev) =>
        {
            let user    = this.field_user.value;
            let passwd  = this.field_passwd.value;
            let confirm = this.field_confirm.value;
            let email   = this.field_email.value;

            if (passwd != confirm) {
                // TODO error out with native required error message
            } else {
                sl.events.on(Event.RESPONSE_REGISTRATION_OK, () =>
                {
                    sl.events.emit(Event.REQUEST_LOGIN, {
                        user:     user,
                        password: passwd,
                    });
                });

                sl.events.emit(Event.REQUEST_REGISTRATION, {
                    user:     user,
                    password: passwd,
                    email:    email
                });
            }

            this.loading();

            this.container.reset();
            ev.preventDefault();
        }
    }

    private setup_events()
    {
        sl.events.on(Event.SELECT_MODE, (mode) =>
        {
            switch (mode)
            {
                case EvGuiMode.LOGIN_REGISTER:
                    this.show();
                    break;

                default:
                    this.hide();
            }
        });
    }

    private loading()
    {
        let loader = document.createElement("div");

        loader.className = "loader";

        loader.style.position = "fixed";
        loader.style.right    = "4px";
        loader.style.bottom   = "159px";

        this.container.appendChild(loader);
    }
}
