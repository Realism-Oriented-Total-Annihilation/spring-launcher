//
//
//
import { Workbench } from "./workbench";


export let sl: Workbench;


window.addEventListener("DOMContentLoaded", () => {
    sl = new Workbench();
    // sl.init();
    sl.authenticate();
});
