import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  sendCommand: (command: string) => ipcRenderer.send("execute-command", command),
});