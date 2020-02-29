//
// Module Base
//


interface WidgetBaseOptions
{
    type?: "div" | "form";
    mode?: "flex" | "block" | "inline-block";
}

export class WidgetBase
{
    private parent: HTMLElement;
    private mode:   string;

    protected container: HTMLElement;

    constructor(parent: HTMLElement, options?: WidgetBaseOptions)
    {
        this.parent = parent;

        if (options?.type) {
            this.container = document.createElement(options?.type);
        } else {
            this.container = document.createElement("div");
        }

        if (options?.mode) {
            this.mode = options?.mode;
        } else {
            this.mode = "block";
        }

        this.hide();

        this.parent.appendChild(this.container);
    }

    public show()
    {
        this.container.style.display = this.mode;
    }

    public hide()
    {
        this.container.style.display = "none";
    }
}
