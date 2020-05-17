//
// Module Base
//


interface WidgetBaseOptions
{
    mode?: "flex" | "block" | "inline-block" | "table-row";
}


export class WidgetBase<E extends HTMLElement>
{
    private _mode:   string;

    protected container: E;

    constructor(self: E, options?: WidgetBaseOptions)
    {
        this.container = self;

        if (options?.mode) {
            this._mode = options?.mode;
        } else {
            this._mode = "block";
        }

        this.hide();
    }

    public show()
    {
        this.container.style.display = this._mode;
    }

    public hide()
    {
        this.container.style.display = "none";
    }

    public inner(): E
    {
        return this.container;
    }
}
