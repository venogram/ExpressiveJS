const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url')

let win;


//Creates an Electron App Window
function createWindow () {
  win = new BrowserWindow({width:1200, height: 800});
// Electron App file comes from /index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol:'file',
    slashes: true
  }))

  //Emitted when window is closed
  win.on('closed', () =>{
    win = null;
  })
}

app.on('ready', createWindow);
//Darwin refers to OXS
app.on('window-all-closed', () =>{
  if(process.platform !== 'darwin'){
    app.quit();
  }
})

app.on('active', () =>{
  if(win === null){
    createWindow();
  }
})
