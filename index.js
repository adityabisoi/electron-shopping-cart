const electron=require('electron')
const url=require('url')
const path=require('path')

const {app,BrowserWindow,Menu}=electron

let mainWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({})
    // Load HTML
    mainWindow.loadURL(`file://${__dirname}/mainWindow.html`)

    // Build menu from template
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

// Menu template
const mainMenuTemplate=[
    {
        label:'File'
    }
]
