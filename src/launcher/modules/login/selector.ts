//
//
//
import { sl } from "../../../renderer";

import { Event } from "../../events/keys";

import { WidgetBase } from "../../widgets/base";
import { EvGuiMode } from "../../events/gui";


export class FormSelector extends WidgetBase<HTMLDivElement>
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
        this.setup_events();
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

    private show_online()
    {
        this.lbl_login.className    = "login-selector active";
        this.lbl_register.className = "login-selector";
        this.lbl_offline.className  = "login-selector";

        this.lbl_login.style.display    = "inline-block";
        this.lbl_register.style.display = "inline-block";
        this.lbl_offline.style.display  = "none";
    }

    private show_register()
    {
        this.lbl_login.className    = "login-selector";
        this.lbl_register.className = "login-selector active";
        this.lbl_offline.className  = "login-selector";

        this.lbl_login.style.display    = "inline-block";
        this.lbl_register.style.display = "inline-block";
        this.lbl_offline.style.display  = "none";
    }

    private show_offline()
    {
        this.lbl_login.className    = "login-selector";
        this.lbl_register.className = "login-selector";
        this.lbl_offline.className  = "login-selector active";

        this.lbl_login.style.display    = "none";
        this.lbl_register.style.display = "none";
        this.lbl_offline.style.display  = "inline-block";
    }

    private setup_wiring()
    {
        this.lbl_login.addEventListener("click", () => {
            sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_ONLINE);
        });

        this.lbl_register.addEventListener("click", () => {
            sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_REGISTER);
        });

        this.lbl_offline.addEventListener("click", () => {
            sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_OFFLINE);
        });
    }

    private setup_events()
    {
        sl.events.on(Event.SELECT_MODE, (mode) =>
        {
            // switch our mode
            switch (mode)
            {
                case EvGuiMode.LOGIN_ONLINE:
                    this.show_online();
                    break;

                case EvGuiMode.LOGIN_REGISTER:
                    this.show_register();
                    break;

                case EvGuiMode.LOGIN_OFFLINE:
                    this.show_offline();
                    break;
            }

            // hide/show ourself
            switch (mode)
            {
                case EvGuiMode.LOGIN_ONLINE:
                case EvGuiMode.LOGIN_REGISTER:
                case EvGuiMode.LOGIN_OFFLINE:
                    this.show();
                    break;

                default:
                    this.hide();
            }
        });
    }
}
