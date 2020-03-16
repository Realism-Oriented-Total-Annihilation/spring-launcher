//
// Module Base
//


interface WidgetBaseOptions
{
    mode?: "flex" | "block" | "inline-block" | "table-row";
}


export class WidgetBase<E extends HTMLElement>
{
    private _parent: HTMLElement;
    private _mode:   string;

    protected container: E;

    constructor(parent: HTMLElement, self: E, options?: WidgetBaseOptions)
    {
        this._parent    = parent;
        this.container = self;

        if (options?.mode) {
            this._mode = options?.mode;
        } else {
            this._mode = "block";
        }

        this.hide();

        this._parent.appendChild(this.container);
    }

    public show()
    {
        this.container.style.display = this._mode;
    }

    public hide()
    {
        this.container.style.display = "none";
    }
}
