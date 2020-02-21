//
//
//
import { Workbench } from "./workbench";


export let workbench: Workbench;


window.addEventListener("DOMContentLoaded", () => {
    workbench = new Workbench();
    workbench.run();
});
