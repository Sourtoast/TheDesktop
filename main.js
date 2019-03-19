const { app,BrowserWindow, ipcMain } = require('electron')
var exec = require('child_process').exec;
const accuweather = require('./accuweather')

app.on('ready', () => {
    setTimeout(()=> {
        desktop()
    }, 600)
})

app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.on('weather', (event, arg) => {
        accuweather()
        .catch(error => {
            console.log(error)
            event.sender.send('weather', false)
        })
        .then((res) => {
            event.sender.send('weather', res)
        })
})

ipcMain.on('power', (event, arg)=> {
    switch(arg) {
        case 'poweroff':
            exec('poweroff')
        break;

        case 'reboot':
            exec('reboot')
        break;

        case 'suspend':
            exec('suspend')
        break;

        default:
            console.log('No power command has beed chosen')
    }
})

function desktop() {
    desktopWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        x: 0, 
        y: 1, 
        frame: false,
        transparent: true,
        resizable: false,
        type: 'desktop',
    })        
    
    desktopWindow.on('closed', () => {
        desktopWindow = null
    })
    
    desktopWindow.loadURL(`file://${__dirname}/desktop/index.html`)
    
    // desktopWindow.openDevTools()
}

