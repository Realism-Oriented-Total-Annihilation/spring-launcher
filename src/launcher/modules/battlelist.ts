//
//
//
import { WidgetBase } from "../widgets/base";


// Not sure if it has to be a div
export class BattleList extends WidgetBase<HTMLDivElement>
{
    constructor(parent: HTMLDivElement)
    {
        super(parent, document.createElement("div"));
    }
}
