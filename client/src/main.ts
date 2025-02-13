import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000");
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
           app.quit();
          }     
}
);  