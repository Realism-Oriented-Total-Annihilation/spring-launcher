//
// Chat window // Maybe change it to rightbarcontainer and make it general
//

import { workbench } from "../main";

import { ChatButton } from "./bar";


export class Chat
{
    private container: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {
        this.container = document.createElement("div");

        this.setup_dom();
        this.setup_wiring();

        parent.appendChild(this.container);
    }

    private setup_dom()
    {
        this.container.id = "chat";
    }

    private setup_wiring()
    {
        workbench.events.on("chat.show", (btn: ChatButton) => {
            this.container.style.right = "0px";
        });

        workbench.events.on("chat.hide", (btn: ChatButton) => {
            this.container.style.right = "-250px";
        });
    }
}