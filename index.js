const electron = require('electron')

const { app, BrowserWindow, Menu } = electron

let mainWindow, addWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    mainWindow.loadURL(`file://${__dirname}/main.html`)

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)

})

const createAddWindow = () => {
    addWindow = new BrowserWindow({
        height: 200,
        width: 300,
        title: 'Add New Todo'
    })
    addWindow.loadURL(`file://${__dirname}/add.html`)
}


const menuTemplate = [
    {
        label: '&File',
        submenu: [
            {
                label: 'New Todo',
                click() {
                    createAddWindow()
                }
            },
            {
                label: "Quit",
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit()
                },
            }
        ]
    }
]

if(process.platform === 'darwin') {
    menuTemplate.unshift({})
}
