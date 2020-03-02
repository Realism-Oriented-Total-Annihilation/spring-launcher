//
//  Login screen dialog
//
import { sl } from "../../../renderer";

import { Event } from "../../events/keys";

import { WidgetBase } from "../../widgets/base";
import { InputField } from "../../widgets/input";


export class Login extends WidgetBase<HTMLDivElement>
{
    private springlogo: HTMLDivElement;

    private changebutton: HTMLButtonElement;

    private form_selector: FormSelector;
    private form_login:    FormLogin;
    private form_register: FormRegister;
    private form_offline:  FormLocal;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));

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


class FormSelector extends WidgetBase<HTMLDivElement>
{
    private lbl_login:    HTMLLabelElement;
    private lbl_register: HTMLLabelElement;
    private lbl_offline:  HTMLLabelElement;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div") , {mode: "flex"});

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

        sl.events.emit(Event.MODE_ONLINE, {host: "localhost", port: 8200});
    }

    public show_offline()
    {
        this.lbl_login.style.display    = "none";
        this.lbl_register.style.display = "none";
        this.lbl_offline.style.display  = "inline-block";

        sl.events.emit(Event.MODE_LOCAL);
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


class FormLogin extends WidgetBase<HTMLFormElement>
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

            // Pass the ball to game selector
            sl.events.on(Event.RESPONSE_LOGIN_OK, () => {
                sl.select_game();
            })

            this.loading();
            this.container.reset();
            ev.preventDefault();
        }

        sl.events.on(Event.RESPONSE_LOGIN_AGREEMENT, (agreement) => {
            let text = document.createElement("label");

            text.innerText = agreement.terms;

            this.container.appendChild(text);
        });
    }

    private loading()
    {
        let loader = document.createElement("div");
        loader.className = "loader";
        loader.style.position = "fixed";
        loader.style.right = "5px";
        loader.style.bottom = "288px";
        this.container.appendChild(loader);
    }
}


class FormRegister extends WidgetBase<HTMLFormElement>
{
    private field_user:    InputField;
    private field_passwd:  InputField;
    private field_confirm: InputField;
    private field_email:   InputField;
    private field_button:  InputField;
    private verify:        FormAgreeTerms;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("form"));

        this.container.className = "login-form";
        this.container.id = "register-form";

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

        this.verify = new FormAgreeTerms(parent);

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
                // Once registration succeeded, we want to login
                sl.events.on(Event.RESPONSE_REGISTRATION_OK, () => {
                    // sl.login.
                    this.hide();
                    this.verify.show();

                    // sl.events.emit(Event.REQUEST_LOGIN, {
                    //     user:     user,
                    //     password: passwd,
                    // })
                });

                // Request registration
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

    private loading()
    {
        let loader = document.createElement("div");
        loader.className = "loader";
        loader.style.position = "fixed";
        loader.style.right = "4px";
        loader.style.bottom = "159px";
        this.container.appendChild(loader);
    }
}


class FormLocal extends WidgetBase<HTMLFormElement>
{
    private field_user:   InputField;
    private field_button: InputField;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("form")); // {type: "form"}

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

            this.loading();
            this.container.reset();
            ev.preventDefault();
        }
    }

    private loading()
    {
        let loader = document.createElement("div");

        loader.className = "loader";

        loader.style.position = "fixed";
        loader.style.right    = "4px";
        loader.style.top      = "320px";

        this.container.appendChild(loader);
    }
}

export class FormAgreeTerms extends WidgetBase<HTMLFormElement>
{
    private label_info: HTMLDivElement;

    private field_code:   InputField;
    private field_button: InputField;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("form"), {mode: "inline-block"}); // {type: "form"}

        this.label_info = document.createElement("div");

        this.setup_dom();

        this.field_code = new InputField(this.container, {
            class:       "login-input",
            type:        "text",
            placeholder: "Verification code",
            required:    false
        });

        this.field_button = new InputField(this.container, {
            class: "login-button",
            type:  "submit",
            value: "Done"
        });

        this.setup_wiring();
        this.hide();
    }

    private setup_dom()
    {
        this.container.className = "login-form";
        this.label_info.id = "verification-info";
        this.label_info.innerHTML = "We have sent you a verification code, please check your e-mail!"

        this.container.appendChild(this.label_info);
    }

    private setup_wiring()
    {
        this.container.onsubmit = (ev) => {
            let code = this.field_code.value;

            sl.events.emit(Event.REQUEST_AGREE_TERMS, {
                code: code,
            });

            ev.preventDefault();
        }
    }
}
