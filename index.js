const electron=require('electron')
const url=require('url')
const path=require('path')

const {app,BrowserWindow,Menu}=electron

let mainWindow
let addItemWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({})
    // Load HTML
    mainWindow.loadURL(`file://${__dirname}/mainWindow.html`)

    // Build menu from template
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

const createAddItemWindow = () => {
    addItemWindow=new BrowserWindow({
        title:'Add new item',
        width:200,
        height:300
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
