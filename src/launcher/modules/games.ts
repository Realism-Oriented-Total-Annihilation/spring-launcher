//
// Spring mod selector
//
import { sl } from "../../renderer";

import { Event } from "../events/keys";

import { WidgetBase } from "../widgets/base";
import { EvGuiMode } from "../events/gui";


export class GameSelector extends WidgetBase<HTMLDivElement>
{
    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div"));

        this.setup_dom();
        this.setup_events();
    }

    private setup_dom()
    {
        this.container.id = "game-selector";
    }

    public add_game(name: string, imgpth: string)
    {
        let game = new GameBase(this.container, name, imgpth);
        this.container.appendChild(game.container);
    }

    private setup_events()
    {
        sl.events.on(Event.SELECT_MODE, (mode) =>
        {
            switch (mode)
            {
                case EvGuiMode.GAME_SELECT:
                    this.show();
                    break;

                default:
                    this.hide();
            }
        });
    }
}


export class GameInfo extends WidgetBase<HTMLDivElement>
{
    private gamelegend: HTMLDivElement;  // Text information about the mod
    private gameimg:    HTMLDivElement;

    private launchbtn: HTMLButtonElement;

    constructor(parent: HTMLElement)
    {
        super(parent, document.createElement("div"));

        this.gamelegend = document.createElement("div");
        this.gameimg = document.createElement("div");

        this.launchbtn = document.createElement("button");

        this.setup_dom();
        this.setup_wiring();
    }

    private setup_dom()
    {
        // TODO?? Read and display info from an infofile

        this.container.id = "game-info";
        this.gamelegend.id = "game-legend";
        this.container.appendChild(this.gamelegend);

        this.gameimg.id = "game-image";
        this.container.appendChild(this.gameimg);

        this.launchbtn.id = "launch-button";
        this.launchbtn.innerHTML = "Play";
    }

    private setup_wiring()
    {
        sl.events.on(Event.GAME_SELECTED, (game) => {
            this.gameimg.style.backgroundImage = game.imgpth;
            // TODO: Active styling mode
        })
    }
}


export class GameBase
{
    private parent: HTMLDivElement;

    public  container: HTMLDivElement;

    private button: HTMLButtonElement;
    private name:   string;
    public  imgpth: string

    constructor(parent: HTMLDivElement, name: string, imgpth: string)
    {
        this.parent    = parent;
        this.container = document.createElement("div");
        this.imgpth    = imgpth;

        this.button = document.createElement("button");

        this.name = name;

        this.setup_dom();
        this.setup_wiring();
    }

    private setup_dom()
    {
        this.container.className = "game";

        this.button.id        = `btn${this.name}`;
        this.button.innerHTML = `${name}`;
        this.button.className = "game-button";

        this.container.appendChild(this.button);
        this.parent.appendChild(this.container);
    }

    private setup_wiring()
    {
        this.button.addEventListener("click", () => {
            sl.events.emit(Event.GAME_SELECTED, this);
        })
    }
}

// nota
// balanced
// zerok
// evorts
// kernelpanic
// ontheedge
// metalfactions
// thecursed
// taprime
// techannihilation
// journeywar
// xta