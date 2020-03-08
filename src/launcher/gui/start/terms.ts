//
//
//
import { WidgetBase } from "../../widgets/base";
import { InputField } from "../../widgets/input";


export class FormTerms extends WidgetBase<HTMLFormElement>
{
    private label_info:  HTMLDivElement;
    private label_terms: HTMLDivElement;

    private field_code:   InputField;
    private field_button: InputField;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("form"));

        this.label_info  = document.createElement("div");
        this.label_terms = document.createElement("div");

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
        // this.setup_events();
    }

    private setup_dom()
    {
        this.container.className = "login-form";

        this.label_info.id        = "verification-info";
        this.label_info.innerHTML = "We have sent you a verification code, please check your e-mail!"

        this.container.appendChild(this.label_info);
    }

    private setup_wiring()
    {
        this.container.onsubmit = (ev) => {
            let code = this.field_code.value;

            // sl.events.emit(Event.REQUEST_AGREE_TERMS, {
            //     code: code,
            // });

            ev.preventDefault();
        }
    }

    // private setup_events()
    // {
    //     sl.events.on(Event.RESPONSE_LOGIN_AGREEMENT, (terms) => {
    //         sl.events.emit(Event.SELECT_MODE, EvGuiMode.LOGIN_TERMS);
    //     });

    //     sl.events.on(Event.SELECT_MODE, (mode) =>
    //     {
    //         switch (mode)
    //         {
    //             case EvGuiMode.LOGIN_TERMS:
    //                 this.show();
    //                 break;

    //             default:
    //                 this.hide();
    //         }
    //     });
    // }
}
