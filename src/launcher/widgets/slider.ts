//
// Slider Widgets (Discrete and Continuous)
//


// export class DiscreteSlider
// {
//     private slider: HTMLInputElement;
//     private span:   HTMLSpanElement;

//     private steps: Map<string, string>;

//     constructor(div: HTMLDivElement, steps: string[], def: string)
//     {
//         // construct stepmap
//         let ladder = new Map();

//         let step_size = Math.floor(100 / (steps.length - 1));

//         let idx = 0;
//         for (let step of steps)
//         {
//             let pos = step_size * idx;

//             ladder.set(`${pos}`, step);

//             idx++;
//         }

//         let slider = document.createElement("input");

//         slider.classList.add("slider");

//         slider.type = "range";
//         slider.min  = "0";
//         slider.max  = "100";
//         slider.step = `${step_size}`;

//         let span    = document.createElement("span");

//         span.id        = "graphic";
//         span.innerText = def;

//         this.slider = slider;
//         this.span   = span;
//         this.steps  = ladder;

//         this.slider.onchange = () => this.update();

//         div.appendChild(slider);
//         div.appendChild(span);
//     }

//     public update()
//     {
//         let value = this.slider.value;
//         let text  = <string>this.steps.get(value);

//         this.span.innerText = text;
//     }
// }


// export class ContinuousSlider
// {
//     private slider: HTMLInputElement;
//     private span:   HTMLSpanElement;

//     constructor(div: HTMLDivElement, value: number)
//     {
//         if (value < 0 || value > 100) {
//             throw "Slider value cannot be outside 0..100 range";
//         }

//         let slider = document.createElement("input");

//         slider.classList.add("slider");

//         slider.type  = "range";
//         slider.min   = "0";
//         slider.max   = "100";
//         slider.value = `${value}`;

//         let span = document.createElement("span");

//         span.id        = "graphic";
//         span.innerText = slider.value;

//         this.slider = slider;
//         this.span   = span;

//         this.slider.oninput = () => this.update();

//         div.appendChild(slider);
//         div.appendChild(span);
//     }

//     public update()
//     {
//         this.span.innerText = this.slider.value;
//     }
// }
