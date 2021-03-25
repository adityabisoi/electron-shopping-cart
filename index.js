const electron=require('electron')
const url=require('url')
const path=require('path')

const {app,BrowserWindow,Menu,ipcMain}=electron

let mainWindow
let addItemWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    // Load HTML
    mainWindow.loadURL(`file://${__dirname}/mainWindow.html`)

    // Close application on main window close
    mainWindow.on('close',()=>{
        app.quit()
    })

    // Build menu from template
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

const createAddItemWindow = () => {
    addItemWindow=new BrowserWindow({
        title:'Add new item',
        width:300,
        height:200,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    // Load HTML
    addItemWindow.loadURL(`file://${__dirname}/addItemWindow.html`)
}

// Get item:add
ipcMain.on('item:add',(e,item)=>{
    mainWindow.webContents.send('item:add',item)
    addItemWindow.close()
})

// Menu template
const mainMenuTemplate=[
    {
        label:'File',
        submenu:[
            {
                label: 'Add an item',
                click(){
                    createAddItemWindow()
                }
            },
            {
                label: 'Clear items',
                click(){
                    mainWindow.webContents.send('item:clear')
                }
            },
            {
                label: 'Quit',
                click(){
                    app.quit()
                }
            }
        ]
    }
]

// Add developers tools
if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label:'Toggle DevTools',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role:'reload'
            }
        ]
    })
}
