const electron=require('electron')
const url=require('url')
const path=require('path')

const {app,BrowserWindow,Menu}=electron

app.on('ready',()=>{
    const mainWindow=new BrowserWindow({
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
    const addItemWindow=new BrowserWindow({
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
                label: 'Clear items'
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
