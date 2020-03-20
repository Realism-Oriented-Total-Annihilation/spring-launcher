//
//
//
import { WidgetBase } from "../../../../common/widget";
import { sl } from "../../../../../renderer";
import { User } from "../../../../model/user";


export class Profile extends WidgetBase<HTMLDivElement>
{
    private widget: ProfileWidget;
    // private user: User

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));

        // this.widget = sl.gui.create_profile();

        // Algo asá
        // this.user = sl.backend.players.get(this.user.name);

        this.widget = new ProfileWidget(this.container);
        this.setup_dom();

    }

    private setup_dom()
    {
        this.container.style.width  = "100%";
        this.container.style.height = "100%";
    }

    // public create_profile()
    // {
    //     let profile = new ProfileWidget(this.container);

    //     this.update();

    //     return profile
    // }

    private update()
    {
        // algo asi como if user === (active)user NOOP else display user
        // this.widget
    }
}

export class ProfileWidget extends WidgetBase<HTMLDivElement>
{
    private topcontainer:      HTMLDivElement;
    private topleftcontainer:  HTMLDivElement;
    private toprightcontainer: HTMLDivElement;
    private botcontainer:      HTMLDivElement;

    private name: HTMLDivElement;
    private id:   HTMLDivElement;
    private icon: HTMLDivElement;

    private archievements: HTMLDivElement;
    private rank: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"), { mode: "flex" });

        this.topcontainer      = document.createElement("div");
        this.topleftcontainer  = document.createElement("div");
        this.toprightcontainer = document.createElement("div");
        this.botcontainer      = document.createElement("div");

        this.name = document.createElement("div");
        this.id   = document.createElement("div");
        this.icon = document.createElement("div");

        this.archievements = document.createElement("div");

        this.rank = document.createElement("div");

        this.setup_dom();
    }

    private setup_dom()
    {
        this.container.id         = "profilediv";
        this.topcontainer.id      = "profiletop";
        this.topleftcontainer.id  = "profiletopleft";
        this.toprightcontainer.id = "profiletopright";
        this.botcontainer.id      = "profilebot";

        this.name.id = "profilename";
        this.id.id   = "profileid";
        this.icon.id = "profileicon";

        this.archievements.id = "profilearchievemnts";

        this.rank.id = "profilerank";

        this.topleftcontainer.appendChild(this.name);
        this.topleftcontainer.appendChild(this.id);
        this.topleftcontainer.appendChild(this.icon);

        this.topcontainer.appendChild(this.topleftcontainer);
        this.topcontainer.appendChild(this.toprightcontainer);

        this.archievements.appendChild(this.rank);
        this.botcontainer.appendChild(this.archievements);


        this.container.appendChild(this.topcontainer);
        this.container.appendChild(this.botcontainer);
    }

    // Y los set()
    //
    //
    //
    //
    //
    //
    //
    //
}