//
//
//
import { Workbench } from "./launcher/workbench";


export let sl: Workbench;


window.addEventListener("DOMContentLoaded", () => {
    sl = new Workbench();
    sl.init();
    sl.authenticate();
});
