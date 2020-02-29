//
//
//
import * as fs   from "fs";
import * as path from "path";

import { sl } from "../../../launcher";

import { Event } from "../../events/keys";

import { WidgetBase } from "../../widgets/base";


export class ChatBar extends WidgetBase
{
    private chtbtn:   ChatButton;
    private chtinput: ChatInput;

    constructor(parent: HTMLElement)
    {
        super(parent);

        this.chtbtn   = new ChatButton(this.container);
        this.chtinput = new ChatInput(this.container);

        this.setup_dom();
        this.setup_wiring();
    }

    private setup_dom()
    {
        this.container.id = "chatbar";
    }

    private setup_wiring()
    {
        sl.events.on(Event.CHAT_SHOW, (btn: ChatButton) => {
            this.container.style.right = "0px"
        });

        sl.events.on(Event.CHAT_HIDE, (btn: ChatButton) => {
            this.container.style.right = "-192px"
        });
    }
}

export class ChatButton
{
    private container: HTMLDivElement;
    private logodiv:   HTMLDivElement;

    svg: SVGSVGElement;

    private active: boolean;

    constructor(parent: HTMLElement)
    {
        this.container = document.createElement("div");
        this.logodiv   = document.createElement("div");

        this.logodiv.innerHTML = fs.readFileSync(
            path.join(__dirname, `../../../icons/chat.svg`),
            {encoding: "UTF8"}
        );

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
            if (this.active) {
                sl.events.emit(Event.CHAT_HIDE, this);
            } else {
                sl.events.emit(Event.CHAT_SHOW, this);
            }

            this.active = !this.active;

            if (this.active) {
                this.select();
            } else {
                this.unselect();
            }
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

export class ChatInput
{
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
                            sl.events.emit(Event.MSG_SENT, text);
                            this.textarea.value = "";
                        }

                        e.preventDefault();
                    }

                    break;
            }
        })
    }
}
