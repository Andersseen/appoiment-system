import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { createMenu } from './menu';
import { expressServer } from './server/app';

// const expressProcess = fork(path.join(__dirname, '/server/app.js'));
const server = new expressServer();

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve'),
  local = args.some((val) => val === '--local');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      // sandbox: true,
      // webSecurity: false,
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: true,
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
    createMenu(win, 'http://localhost:4200');
  } else {
    // Path when running electron executable

    let pathIndex = './index.html';
    if (local) {
      pathIndex = '../src/index.html';
    }

    if (fs.existsSync(path.join(__dirname, '../dist/src/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/src/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));

    win.loadURL(url.href);
    createMenu(win, url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947

  //===================================SERVER
  // app.on('ready', () => setTimeout(createWindow, 400));

  app.on('ready', () => {
    // Start the Express server in parallel with creating the Electron window
    // Ruta correcta al archivo server.js

    // expressProcess.send({ action: ACTION.start });

    server.run();
    // Create the Electron window
    setTimeout(createWindow, 400);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      // expressProcess.send({ action: ACTION.close });
      server.close();
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      // expressProcess.send({ action: ACTION.start });
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
