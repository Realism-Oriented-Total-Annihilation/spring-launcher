//
// Main Application Entrypoint
//
import { Gui     as _Gui }     from "./launcher/gui/gui";
import { Backend as _Backend } from "./launcher/backend/backend";

export var Gui     = <any>null;
export var Backend = <any>null;


window.addEventListener("DOMContentLoaded", () =>
{
    Gui     = _Gui.instance();
    Backend = _Backend.instance();
});
