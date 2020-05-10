//
//
//
import { Launcher } from "./launcher/launcher";


export let sl: Launcher;


window.addEventListener("DOMContentLoaded", () => {
    sl = Launcher.instance();
});
