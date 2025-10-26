import { Menu, app } from 'electron';

function createMenu(mainWindow, url) {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Sistema',
      submenu: [
        {
          label: 'Refrescar',
          click: () => {
            console.log(mainWindow);
            console.log(url.href);

            mainWindow?.loadURL(url);
          },
        },
        {
          label: 'Dev',
          click: () => {
            mainWindow?.webContents.toggleDevTools();
          },
        },

        {
          label: 'Exit',
          click: () => {
            // Cerrar la aplicación
            app.quit();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

export { createMenu };
