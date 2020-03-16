//
// Event Node
//


export class EventNode<T>
{
    private listeners: Array<(args: T) => void>;

    constructor()
    {
        this.listeners = [];
    }

    public listen(listener: (args: T) => void)
    {
        this.listeners.push(listener);
    }

    public emit(args: T): void
    {
        for (let listener of this.listeners) {
            listener(args);
        }
    }
}
