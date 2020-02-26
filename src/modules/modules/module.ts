//
// Module Base
//


export class ModuleBase
{
    private   parent:    HTMLDivElement;
    protected container: HTMLDivElement;

    constructor(parent: HTMLDivElement)
    {
        this.parent    = parent;
        this.container = document.createElement("div");
    }

    public hide()
    {
        this.parent.removeChild(this.container);
    }

    public show()
    {
        this.parent.appendChild(this.container);
    }
}
