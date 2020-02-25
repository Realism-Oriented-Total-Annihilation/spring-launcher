//
//
//
import * as path from "path"

import { app, BrowserWindow } from "electron";


function createWindow()
{
    let win = new BrowserWindow({
        width:  1200,
        height: 900,
        webPreferences: {nodeIntegration: true}
    });

    win.loadFile(path.join(__dirname, "modules/html/main.html"))
}


app.whenReady()
    .then(createWindow);
