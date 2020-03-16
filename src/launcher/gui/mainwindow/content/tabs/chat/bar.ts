//
// ChatTab bottom bar
//
import { WidgetBase } from "../../../../../common/widget";
import { sl } from "../../../../../../renderer";


export class ChatBar extends WidgetBase<HTMLDivElement>
{
    public on_msgsend: (msg: string) => void = () => {};

    private chtinput: ChatInput;
    private chtbtn:   ChatButton;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" });

        this.chtinput = new ChatInput(this.container);
        this.chtbtn   = new ChatButton(this.container);

        this.setup_dom();
        this.setup_wiring();
    }

    private setup_dom()
    {
        this.container.id = "chatbar";
    }

    private setup_wiring()
    {
        this.chtinput.on_msgsend = (msg) => {
            this.on_msgsend(msg)
        };
    }
}

class ChatButton
{
    private container: HTMLDivElement;
    private logodiv:   HTMLDivElement;

    svg: SVGSVGElement;

    private active: boolean;

    constructor(parent: HTMLElement)
    {
        this.container = document.createElement("div");
        this.logodiv   = document.createElement("div");

        this.svg = this.logodiv.getElementsByTagName("svg")[0];

        this.active = false;

        this.setup_dom();
        this.setup_wiring();

        parent.appendChild(this.container);
    }

    public setup_dom()
    {
        this.container.className = "chatbutton"
        this.logodiv.id = "chatlogo"

        this.container.appendChild(this.logodiv);
    }

    public setup_wiring()
    {
        this.container.addEventListener("click", () =>
        {
        // mandar msg
        });
    }

    public select()
    {
        this.container.className = "chatbutton active";
    }

    public unselect()
    {
        this.container.className = "chatbutton";
    }
}

class ChatInput
{
    public on_msgsend: (msg: string) => void = () => {};

    private container: HTMLDivElement;
    private textarea:  HTMLTextAreaElement;

    constructor(parent: HTMLElement)
    {
        this.container = document.createElement("div");
        this.textarea  = document.createElement("textarea");

        this.setup_dom();
        this.setup_wiring();

        parent.appendChild(this.container);
    }

    private setup_dom()
    {
        this.container.id = "chatinput"
        this.textarea.id  = "textarea";

        this.container.appendChild(this.textarea);
    }

    private setup_wiring()
    {
        this.textarea.addEventListener("keypress", (e) =>
        {
            switch (e.key)
            {
                case "Enter":
                    if (!e.shiftKey)
                    {
                        let text = this.textarea.value.trim();

                        if (text != "")
                        {
                            this.on_msgsend(text);
                            this.textarea.value = "";
                        }
                        e.preventDefault();
                    }
                    break;
            }
        })
    }
}

