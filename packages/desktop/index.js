const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const window = new BrowserWindow({
    fullscreen: true,
  });

  window.setMenu(null);
  window.loadURL("https://dragondungeon.io");
  window.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
