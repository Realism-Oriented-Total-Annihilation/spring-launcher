//
// Chat tab maindiv
//
import { sl } from "../../../../../../renderer";

import { WidgetBase } from "../../../../../common/widget";

import { ChatBar } from "./bar";
import { ChatField } from "./field";
import { ChatPlayers } from "./players";


export class Chat extends WidgetBase<HTMLDivElement>
{
    public chatdiv:    HTMLDivElement
    public field:      ChatField;
    public bar:        ChatBar;
    public playersdiv: HTMLDivElement;
    public players:    ChatPlayers;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" })

        this.chatdiv = document.createElement("div");
        this.playersdiv = document.createElement("div");

        this.field      = new ChatField(this.chatdiv);
        this.bar        = new ChatBar(this.chatdiv);
        this.players    = new ChatPlayers(this.playersdiv);

        this.setup_dom();
        this.setup_wiring();
    }

    public show()
    {
        this.field.show();
        this.bar.show();
        this.players.show();

        super.show();
    }

    private setup_dom()
    {
        this.container.id  = "chat";
        this.chatdiv.id = "chatdiv";
        this.playersdiv.id = "playersdiv";

        this.playersdiv.appendChild(this.players.inner());
        this.container.appendChild(this.chatdiv);
        this.container.appendChild(this.playersdiv);
    }

    private setup_wiring()
    {
        this.bar.on_msgsend = (msg) =>
        {
            this.field.display_msg(msg, "self");
            sl.gui.on_msgsend(msg)
        }
    }
}