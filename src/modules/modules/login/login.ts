//
//  Login screen dialog
//
import { ModuleBase } from "../module";


export class Login extends ModuleBase
{
    private authenticate: HTMLDivElement;

    private springlogo: HTMLDivElement;

    // Selector:   Login | Register
    private selector: HTMLDivElement;
    private login:    HTMLLabelElement;
    private register: HTMLLabelElement;

    // Login
    private loginform: HTMLFormElement;
    private logindiv:  HTMLDivElement;
    private userdiv:   HTMLDivElement
    private username:  HTMLInputElement;
    private passdiv:   HTMLDivElement;
    private password:  HTMLInputElement;
    private loginbtn:  HTMLInputElement;

    // Register
    private registerform: HTMLFormElement;
    private registerdiv:  HTMLDivElement;
    private newuserdiv:   HTMLDivElement
    private newusername:  HTMLInputElement;
    private emaildiv:     HTMLDivElement;
    private email:        HTMLInputElement;
    private newpassdiv:   HTMLDivElement;
    private newpassword:  HTMLInputElement;
    private registerbtn:  HTMLInputElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent);

        this.authenticate = document.createElement("div");

        this.springlogo = document.createElement("div");

        // Selector:   Login | Register
        this.selector = document.createElement("div");
        this.login    = document.createElement("label");
        this.register = document.createElement("label");

        // Login
        this.loginform = document.createElement("form");
        this.logindiv     = document.createElement("div");
        this.userdiv      = document.createElement("div");
        this.username     = document.createElement("input");
        this.passdiv      = document.createElement("div");
        this.password     = document.createElement("input");
        this.loginbtn     = document.createElement("input");

        // Register
        this.registerform = document.createElement("form");
        this.registerdiv  = document.createElement("div");
        this.newuserdiv   = document.createElement("div");
        this.newusername  = document.createElement("input");
        this.emaildiv     = document.createElement("div");
        this.email        = document.createElement("input");
        this.newpassdiv   = document.createElement("div");
        this.newpassword  = document.createElement("input");
        this.registerbtn  = document.createElement("input");

        this.setup_dom();
        this.togglelogin();
    }

    private setup_dom()
    {
        this.authenticate.id = "authenticate";

        this.springlogo.id  = "springlogo";

        // Selector:   Login | Register
        this.selector.id = "selectordiv";

        this.login.innerHTML = "Login";
        this.login.className = "selector";
        this.login.addEventListener("click", () => {this.togglelogin()});

        this.register.innerHTML = "Register";
        this.register.className = "selector";
        this.register.addEventListener("click", () => {this.toggleregister()});

        // Login
        this.logindiv.className   = "formdiv";

        this.userdiv.id           = "userdiv";
        this.username.id          = "username";
        this.username.type        = "text";
        this.username.className   = "input";
        this.username.required    = true;
        this.username.placeholder = "Username";

        this.passdiv.id           = "passdiv"
        this.password.id          = "password";
        this.password.type        = "password";
        this.password.className   = "input";
        this.password.required    = true;
        this.password.placeholder = "Password";

        this.loginbtn.className   = "btn";
        this.loginbtn.value       = "Login";
        this.loginbtn.type        = "submit"

        // Register
        this.registerdiv.className   = "formdiv";

        this.newuserdiv.id           = "newuserdiv";
        this.newusername.id          = "newusername";
        this.newusername.type        = "text";
        this.newusername.className   = "input";
        this.newusername.required    = true;
        this.newusername.placeholder = "Username";


        this.emaildiv.id       = "emaildiv";

        this.email.id          = "email";
        this.email.type        = "text";
        this.email.className   = "input";
        this.email.required    = true;
        this.email.placeholder = "E-mail Address";

        this.newpassdiv.id           = "newpassdiv"

        this.newpassword.id          = "newpassword";
        this.newpassword.type        = "password";
        this.newpassword.className   = "input";
        this.newpassword.required    = true;
        this.newpassword.placeholder = "Password";

        this.registerbtn.className = "btn";
        this.registerbtn.value     = "Register"
        this.registerbtn.type      = "submit"


        this.authenticate.appendChild(this.springlogo);

        // Selector:   Login | Register
        this.selector.appendChild(this.login);
        this.selector.appendChild(this.register);
        this.authenticate.appendChild(this.selector);

        // Login
        this.logindiv.appendChild(this.userdiv);
        this.logindiv.appendChild(this.username);
        this.logindiv.appendChild(this.passdiv);
        this.logindiv.appendChild(this.password);
        this.logindiv.appendChild(this.loginbtn);
        this.loginform.appendChild(this.logindiv);
        this.authenticate.appendChild(this.loginform);

        // Register
        this.registerdiv.appendChild(this.newuserdiv);
        this.registerdiv.appendChild(this.newusername);
        this.registerdiv.appendChild(this.emaildiv);
        this.registerdiv.appendChild(this.email);
        this.registerdiv.appendChild(this.newpassdiv);
        this.registerdiv.appendChild(this.newpassword);
        this.registerdiv.appendChild(this.registerbtn);
        this.registerform.appendChild(this.registerdiv)
        this.authenticate.appendChild(this.registerform);

        this.container.appendChild(this.authenticate);

        this.write();
        this.userdata();
        this.registerdata();
    }

    private togglelogin()
    {
        this.loginform.style.display  = "block";
        this.login.style.color        = "white";
        this.login.style.borderBottom = "5px solid rgb(22, 130, 93)";

        this.registerform.style.display  = "none";
        this.register.style.color        = "rgb(71, 71, 71)";
        this.register.style.borderBottom = "none";
    }

    private toggleregister()
    {
        this.loginform.style.display   = "none";
        this.login.style.opacity      = "0.8";
        this.login.style.color        = "rgb(71, 71, 71)";
        this.login.style.borderBottom = "none";

        this.registerform.style.display   = "block";
        this.register.style.color        = "white";
        this.register.style.borderBottom = "5px solid rgb(22, 130, 93)";
    }

    private write()
    {
        // Login
        this.username.addEventListener("focusin",     () => {this.username.placeholder    = "";})
        this.username.addEventListener("focusout",    () => {this.username.placeholder    = "Username";})
        this.password.addEventListener("focusin",     () => {this.password.placeholder    = "";})
        this.password.addEventListener("focusout",    () => {this.password.placeholder    = "Password";})

        // Register
        this.newusername.addEventListener("focusin",  () => {this.newusername.placeholder = "";})
        this.newusername.addEventListener("focusout", () => {this.newusername.placeholder = "Username";})
        this.email.addEventListener("focusin",        () => {this.email.placeholder       = "";})
        this.email.addEventListener("focusout",       () => {this.email.placeholder       = "E-Mail Address";})
        this.newpassword.addEventListener("focusin",  () => {this.newpassword.placeholder = "";})
        this.newpassword.addEventListener("focusout", () => {this.newpassword.placeholder = "Password";})
    }

    private userdata(): Array<string>
    {
        let data = new Array();

        this.loginform.addEventListener("submit", () =>
        {
            data.push(this.username.name);
            data.push(this.password.name);
        })
        return data
    }

    private registerdata(): Array<string>
    {
        let data = new Array();

        this.registerform.addEventListener("submit", () =>
        {
            data.push(this.username.name);
            data.push(this.email.name);
            data.push(this.password.name);
        })
        return data
    }
}
