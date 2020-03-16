//
//
//
import { WidgetBase } from "../../common/widget";
import { InputField } from "../../common/input";


export class FormLocal extends WidgetBase<HTMLFormElement>
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
        // this.setup_events();
    }

    private setup_wiring()
    {
        this.container.onsubmit = (ev) => {
            // let user = this.field_user.value;

            // sl.events.emit(Event.REQUEST_OFFLINE, {
            //     user: user,
            // });

            // this.loading();
            // this.container.reset();
            ev.preventDefault();
        }
    }

    // private setup_events()
    // {
    //     sl.events.on(Event.SELECT_MODE, (mode) =>
    //     {
    //         switch (mode)
    //         {
    //             case EvGuiMode.LOGIN_OFFLINE:
    //                 this.show();
    //                 break;

    //             default:
    //                 this.hide();
    //         }
    //     });
    // }

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
