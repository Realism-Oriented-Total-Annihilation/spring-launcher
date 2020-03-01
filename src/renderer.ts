//
//
//
import { Launcher } from "./launcher/launcher";


export let sl: Launcher;


window.addEventListener("DOMContentLoaded", () => {
    sl = new Launcher();
    sl.init();
    sl.authenticate();
});
