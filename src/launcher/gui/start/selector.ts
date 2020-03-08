//
//
//
import { WidgetBase } from "../../widgets/base";


export class FormSelector extends WidgetBase<HTMLDivElement>
{
    private lbl_login:    HTMLLabelElement;
    private lbl_register: HTMLLabelElement;
    private lbl_local:    HTMLLabelElement;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div") , {mode: "flex"});

        this.lbl_login    = document.createElement("label");
        this.lbl_register = document.createElement("label");
        this.lbl_local    = document.createElement("label");

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.id = "login-selector-container";

        this.lbl_login.className = "login-selector active";
        this.lbl_login.innerHTML = "Login";

        this.lbl_register.className = "login-selector";
        this.lbl_register.innerHTML = "Register";

        this.lbl_local.className = "login-selector active";
        this.lbl_local.innerHTML = "LAN Username";

        this.container.appendChild(this.lbl_login);
        this.container.appendChild(this.lbl_register);
        this.container.appendChild(this.lbl_local);

        this.setup_wiring();

        this.select_login();
    }

    private setup_wiring()
    {
        this.lbl_login.addEventListener("click", () => {
            this.select_login();
        });

        this.lbl_register.addEventListener("click", () => {
            this.select_register();
        });

        this.lbl_local.addEventListener("click", () => {
            this.select_local();
        });
    }

    public select_login()
    {
        this.lbl_login.className    = "login-selector active";
        this.lbl_register.className = "login-selector";
        this.lbl_local.className    = "login-selector";

        this.lbl_login.style.display    = "inline-block";
        this.lbl_register.style.display = "inline-block";
        this.lbl_local.style.display    = "none";
    }

    public select_register()
    {
        this.lbl_login.className    = "login-selector";
        this.lbl_register.className = "login-selector active";
        this.lbl_local.className    = "login-selector";

        this.lbl_login.style.display    = "inline-block";
        this.lbl_register.style.display = "inline-block";
        this.lbl_local.style.display    = "none";
    }

    public select_local()
    {
        this.lbl_login.className    = "login-selector";
        this.lbl_register.className = "login-selector";
        this.lbl_local.className    = "login-selector active";

        this.lbl_login.style.display    = "none";
        this.lbl_register.style.display = "none";
        this.lbl_local.style.display    = "inline-block";
    }

    public on_online(listener: () => void)
    {
        this.lbl_login.addEventListener("click", () => {
            listener();
        });
    }

    public on_register(listener: () => void)
    {
        this.lbl_register.addEventListener("click", () => {
            listener();
        });
    }

    public on_local(listener: () => void)
    {
        this.lbl_local.addEventListener("click", () => {
            listener();
        });
    }
}
