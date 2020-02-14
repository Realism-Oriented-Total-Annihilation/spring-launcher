//
// Play buttton (to the left of topbar)
//

export class PlayButton
{
    section: HTMLDivElement;
    button:  HTMLDivElement;
    text:    HTMLAnchorElement;

    constructor(topbar: HTMLDivElement)
    {
        this.section = document.createElement("div");
        this.section.id += "playbtn_section";

        this.button = document.createElement("div");
        this.button.id += "playbtn"

        this.text = document.createElement("a");
        this.text.id += "playbtn_text";
        this.text.innerText = "Play";

        this.button.appendChild(this.text);
        this.section.appendChild(this.button);

        topbar.appendChild(this.section);
    }
}