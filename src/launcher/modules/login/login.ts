//
//
//
import { sl } from "../../../renderer";

import { Event } from "../../events/keys";

import { WidgetBase } from "../../widgets/base";
import { InputField } from "../../widgets/input";
import { EvGuiMode } from "../../events/gui";


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
        this.setup_events();
    }

    private setup_wiring()
    {
        this.container.onsubmit = (ev) =>
        {
            let user   = this.field_user.value;
            let passwd = this.field_passwd.value;

            sl.events.on(Event.RESPONSE_LOGIN_OK, () => {
                sl.events.emit(Event.SELECT_MODE, EvGuiMode.GAME_SELECT);
            })

            sl.events.on(Event.RESPONSE_LOGIN_AGREEMENT, () => {
                sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_TERMS);
            })

            sl.events.emit(Event.REQUEST_LOGIN, {
                user:     user,
                password: passwd
            });

            this.loading();

            ev.preventDefault();
            this.container.reset();
        };
    }

    private setup_events()
    {
        sl.events.on(Event.SELECT_MODE, (mode) =>
        {
            switch (mode)
            {
                case EvGuiMode.LOGIN_ONLINE:
                    this.show();
                    break;

                default:
                    this.hide();
            }
        })
    }

    private loading()
    {
        let loader = document.createElement("div");

        loader.className = "loader";

        loader.style.position = "fixed";
        loader.style.right    = "5px";
        loader.style.bottom   = "288px";

        this.container.appendChild(loader);
    }
}
