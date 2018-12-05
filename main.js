// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let addWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 900, height: 1500})
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('keyuptrigger-a', function (e) {
  console.log('Received KeyUp Trigger')
  createAddWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createAddWindow () {
  addWindow = new BrowserWindow({width: 550, height: 700, title:'Add Step Item'})
  addWindow.loadFile('addWindow.html')
  addWindow.on('closed', function () {
      addWindow = null
  })
}

// Catch item:add
ipcMain.on('item:add', function(e, item){
  console.log('Received item:add Trigger')
  mainWindow.webContents.send('item:add', item);
  addWindow.close(); 
});

// Catch item:add
ipcMain.on('item:clear', function(e, item){
  console.log('Received item:add Trigger')
  mainWindow.webContents.send('item:clear', item);
});