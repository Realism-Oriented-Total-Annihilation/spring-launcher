//
//  Login screen dialog
//
import { sl } from "../../../launcher";

import { WidgetBase } from "../../widgets/base";
import { InputField } from "../../widgets/input";
import { Event } from "../../events/keys";


export class Login extends WidgetBase
{
    private springlogo: HTMLDivElement;

    private changebutton: HTMLButtonElement;

    private form_selector: FormSelector;
    private form_login:    FormLogin;
    private form_register: FormRegister;
    private form_offline:  FormLocal;

    constructor(parent: HTMLDivElement)
    {
        super(parent);

        this.springlogo   = document.createElement("div");
        this.changebutton = document.createElement("button");

        this.container.appendChild(this.springlogo);

        this.form_selector = new FormSelector(this.container);
        this.form_login    = new FormLogin(this.container);
        this.form_register = new FormRegister(this.container);
        this.form_offline    = new FormLocal(this.container);

        this.container.appendChild(this.changebutton);

        this.setup_dom();
        this.setup_wiring();

        this.form_selector.show();
        this.form_login.show();

        this.setup_events();
    }

    private toggle_mode()
    {
        this.form_login.hide();
        this.form_register.hide();
        this.form_offline.hide()

        let mode = this.changebutton.innerText;

        switch (mode)
        {
            case "Online Mode":
                this.changebutton.innerText = "Local Mode";

                this.form_selector.show_online();
                this.form_login.show();
                break;

            case "Local Mode":
                this.changebutton.innerText = "Online Mode";

                this.form_selector.show_offline()
                this.form_offline.show();
                break;
        }
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
        this.changebutton.addEventListener("click", () => {
            this.toggle_mode();
        });

        this.form_selector.on_login(() => {
            this.form_login.show();
            this.form_register.hide();
        });

        this.form_selector.on_register(() => {
            this.form_login.hide();
            this.form_register.show();
        });
    }

    private setup_events()
    {
        // TODO
    }
}


class FormSelector extends WidgetBase
{
    private lbl_login:    HTMLLabelElement;
    private lbl_register: HTMLLabelElement;
    private lbl_offline:  HTMLLabelElement;

    constructor(parent: HTMLElement)
    {
        super(parent, {mode: "flex"});

        this.lbl_login    = document.createElement("label");
        this.lbl_register = document.createElement("label");
        this.lbl_offline  = document.createElement("label");

        this.setup_dom();
        this.setup_wiring();

        this.show_online();
    }

    private setup_dom()
    {
        this.container.id = "login-selector-container";

        this.lbl_login.className = "login-selector active";
        this.lbl_login.innerHTML = "Login";

        this.lbl_register.className = "login-selector";
        this.lbl_register.innerHTML = "Register";

        this.lbl_offline.className = "login-selector active";
        this.lbl_offline.innerHTML = "LAN Username";

        this.container.appendChild(this.lbl_login);
        this.container.appendChild(this.lbl_register);
        this.container.appendChild(this.lbl_offline);
    }

    public show_online()
    {
        this.lbl_login.style.display    = "inline-block";
        this.lbl_register.style.display = "inline-block";
        this.lbl_offline.style.display  = "none";
    }

    public show_offline()
    {
        this.lbl_login.style.display    = "none";
        this.lbl_register.style.display = "none";
        this.lbl_offline.style.display  = "inline-block";
    }

    public on_login(listener: () => void)
    {
        this.lbl_login.addEventListener("click", () => { listener(); });
    }

    public on_register(listener: () => void)
    {
        this.lbl_register.addEventListener("click", () => { listener(); });
    }

    private setup_wiring()
    {
        this.lbl_login.addEventListener("click", () => {
            this.lbl_login.className    = "login-selector active";
            this.lbl_register.className = "login-selector";
        });

        this.lbl_register.addEventListener("click", () => {
            this.lbl_login.className    = "login-selector";
            this.lbl_register.className = "login-selector active";
        });
    }
}


class FormLogin extends WidgetBase
{
    private field_user:   InputField;
    private field_passwd: InputField;
    private field_button: InputField;

    constructor(parent: HTMLElement)
    {
        super(parent, {type: "form"});

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

        this.setup_events();
    }

    private setup_events()
    {
        this.container.onsubmit = (ev) => {
            let user   = this.field_user.value;
            let passwd = this.field_passwd.value;

            sl.events.emit(Event.REQUEST_LOGIN, {
                user:     user,
                password: passwd
            });

            ev.preventDefault();
        }
    }
}


class FormRegister extends WidgetBase
{
    private field_user:    InputField;
    private field_passwd:  InputField;
    private field_confirm: InputField;
    private field_email:   InputField;
    private field_button:  InputField;

    constructor(parent: HTMLElement)
    {
        super(parent, {type: "form"});

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
    }

    private setup_wiring()
    {
        this.container.onsubmit = (ev) => {
            let user    = this.field_user.value;
            let passwd  = this.field_passwd.value;
            let confirm = this.field_confirm.value;
            let email   = this.field_email.value;

            if (passwd != confirm) {
                // TODO error out
            } else {
                sl.events.emit(Event.REQUEST_REGISTER, {
                    user:     user,
                    password: passwd,
                    email:    email
                });
            }

            ev.preventDefault();
        }
    }
}


class FormLocal extends WidgetBase
{
    private field_user:   InputField;
    private field_button: InputField;

    constructor(parent: HTMLElement)
    {
        super(parent, {type: "form"});

        this.container.className = "login-form";

        this.field_user = new InputField(this.container, {
            class:       "login-input",
            type:        "text",
            placeholder: "Username",
            required:    true
        });

        this.field_button = new InputField(this.container, {
            class: "login-button",
            type:  "submit",
            value: "Done"
        });

        this.setup_wiring();
    }

    private setup_wiring()
    {
        this.container.onsubmit = (ev) => {
            let user = this.field_user.value;

            sl.events.emit(Event.REQUEST_OFFLINE, {
                user: user,
            });

            ev.preventDefault();
        }
    }
}
