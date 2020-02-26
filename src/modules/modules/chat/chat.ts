//
// Chat window // Maybe change it to rightbarcontainer and make it general
//

import { sl } from "../../main";

import { ChatButton } from "./bar";


export class Chat
{
    private container: HTMLDivElement;

    private messages: HTMLParagraphElement[];

    constructor(parent: HTMLDivElement)
    {
        this.container = document.createElement("div");
        this.messages  = [];

        this.setup_dom();
        this.setup_wiring();

        parent.appendChild(this.container);
    }

    private setup_dom()
    {
        this.container.id = "chat";
    }

    private display_msg(msg: string, owner: string)
    {
        let message = document.createElement("p");

        message.innerHTML = msg;

        switch (owner) {
            case "Me":
                message.className = "msg right";
                break;
            case "Other":
                message.className = "msg left";
        }

        this.messages.push(message);
        this.container.appendChild(message);

        let rect = message.getBoundingClientRect();
        this.container.scrollBy(0, rect.height);
    }

    private setup_wiring()
    {
        sl.events.on("chat.show", (btn: ChatButton) => {
            this.container.style.right = "0px";
        });

        sl.events.on("chat.hide", (btn: ChatButton) => {
            this.container.style.right = "-250px";
        });

        sl.events.on("msg.sent", (msg: string) => {
            this.display_msg(msg, "Me");
        });
    }
}
