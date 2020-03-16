//
//
//


interface InputFieldOptions
{
    type: string;

    id?:          string;
    class?:       string;
    placeholder?: string;
    required?:    boolean;
    value?:       string;
}


export class InputField
{
    private field: HTMLInputElement;
    private opts:  InputFieldOptions;

    constructor(parent: HTMLElement, opts: InputFieldOptions)
    {
        this.field = document.createElement("input");
        this.opts  = opts;

        this.field.type = opts.type;

        if (opts.id)          { this.field.id          = opts.id;}
        if (opts.class)       { this.field.className   = opts.class;}
        if (opts.placeholder) { this.field.placeholder = opts.placeholder;}
        if (opts.required)    { this.field.required    = opts.required;}
        if (opts.value)       { this.field.value       = opts.value;}

        parent.appendChild(this.field);

        this.setup_wiring();
    }

    get value(): string
    {
        return this.field.value;
    }

    private setup_wiring()
    {
        this.field.addEventListener("focusin", () => {
            this.field.placeholder = "";
        });

        this.field.addEventListener("focusout", () => {
            if (this.opts.placeholder) { this.field.placeholder = this.opts.placeholder; }
        });
    }
}
