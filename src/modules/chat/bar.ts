//
//
//
import { workbench } from "../main";


export class ChatBar
{
    private container: HTMLDivElement;

    private chtbtn:   ChatButton;
    private chtinput: ChatInput;

    constructor(parent: HTMLDivElement)
    {
        this.container = document.createElement("div");

        this.chtbtn   = new ChatButton(this.container);
        this.chtinput = new ChatInput(this.container);

        this.setup_dom();
        this.setup_wiring();

        parent.appendChild(this.container);
    }

    private setup_dom()
    {
        this.container.id = "chatbar";
    }

    private setup_wiring()
    {
        workbench.events.on("chat.show", (btn: ChatButton) => {
            this.container.style.right = "0px"
        });

        workbench.events.on("chat.hide", (btn: ChatButton) => {
            this.container.style.right = "-192px"
        });
    }
}

export class ChatButton
{
    container: HTMLDivElement;
    // svg: SVGSVGElement;

    private active: boolean;

    constructor(parent: HTMLDivElement)
    {
        this.container = document.createElement("div");

        this.active = false;

        this.setup_dom();
        this.setup_wiring();

        parent.appendChild(this.container);
    }

    public setup_dom()
    {
        this.container.id = "chatbutton"
    }

    public setup_wiring()
    {
        this.container.addEventListener("click", () =>
        {
            if (this.active) {
                workbench.events.emit("chat.hide", this);
            } else {
                workbench.events.emit("chat.show", this);
            }

            this.active = !this.active;
        });
    }
}

export class ChatInput
{
    private container: HTMLDivElement;
    private textarea:  HTMLTextAreaElement;

    constructor(parent: HTMLDivElement)
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

    }
}
