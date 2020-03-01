//
//
//
import * as path from "path"

import { app, BrowserWindow } from "electron";


function createWindow()
{
    let win = new BrowserWindow({
        // width:  1200,
        // height: 900,
        width:  400,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            // devTools: false
        },
        frame: false,
    });

    // win.setResizable(false);
    win.setMenuBarVisibility(false);

    win.loadFile(path.join(__dirname, "main.html"))
}


app.whenReady()
    .then(createWindow);
