const electron = require('electron')

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow, addWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    mainWindow.loadURL(`file://${__dirname}/main.html`)
    mainWindow.on('closed', () => app.quit())

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)

})

const createAddWindow = () => {
    addWindow = new BrowserWindow({
        height: 200,
        width: 300,
        title: 'Add New Todo',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    addWindow.loadURL(`file://${__dirname}/add.html`)

    addWindow.on("closed", ()=> { addWindow = null})
}

ipcMain.on('todo:add', (event, todo)=> {
    mainWindow.webContents.send('todo:add', todo)
    addWindow.close()
})

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
                label: 'Clear Todo',
                click() {
                    mainWindow.webContents.send('todo:clear')
                }
            },
            {type: 'separator'},
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

if(process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {role: 'reload'},
            {

            label: 'Toggle Developer Tools',
            accelerator: 'CmdOrCtrl+Alt+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }]
    })
}