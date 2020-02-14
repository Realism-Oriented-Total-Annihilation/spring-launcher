//
//
//
import { Workbench } from "./workbench";


export let workbench: Workbench;


window.addEventListener("DOMContentLoaded",
    () => { let workbench = new Workbench(); }
);