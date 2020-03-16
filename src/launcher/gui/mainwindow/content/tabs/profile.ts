//
//
//
import { WidgetBase } from "../../../../common/widget";


// Not sure if it has to be a div
export class Profile extends WidgetBase<HTMLDivElement>
{
    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));
    }
}
