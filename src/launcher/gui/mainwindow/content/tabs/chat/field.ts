//
// Chat Window
//
import { WidgetBase } from "../../../../../common/widget";


export class ChatField extends WidgetBase<HTMLDivElement>
{
    private messages: HTMLParagraphElement[];

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" });

        this.messages = [];

        this.setup_dom();
        // this.setup_wiring();
    }

    private setup_dom()
    {
        this.container.id = "chatfield";
    }

    public display_msg(msg: string, owner: "self" | "other")
    {
        let message = document.createElement("p");

        message.innerHTML = msg;

        switch (owner)
        {
            case "self":
                message.className = "msg right";
                break;

            case "other":
                message.className = "msg left";
                break;
        }

        this.messages.push(message);
        this.container.appendChild(message);

        let rect = message.getBoundingClientRect();
        this.container.scrollBy(0, rect.height);
    }
}
