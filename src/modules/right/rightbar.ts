//
// Rightbar which mainly contains the chat window
//

export class Rightbar
{
    public bar: HTMLDivElement;

    constructor(container: HTMLDivElement)
    {
        this.bar     = container;
        container.id = "rightbar";
    }


    // public create_container(id: string): LeftbarContainer
    // {
    //     let leftbarcontainer = new LeftbarContainer(this.bar, id);
    //     // this.containers.push(leftbarcontainer);
    //     return leftbarcontainer;
    // }

}