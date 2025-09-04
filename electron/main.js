const { app, BrowserWindow } = require("electron/main");
const log = require("electron-log");

const { steamworksClient } = require("./steamworksUtils");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadFile("index.html");
};

log.warn(app.getPath("logs"));
if (steamworksClient) {
    log.info(steamworksClient.achievement.names());
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
