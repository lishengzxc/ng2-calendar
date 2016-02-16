const menubar = require('menubar')
const path = require('path')
const app = require('app')

// tray.setTitle('test')

const mb = new menubar({
  // 'always-on-top': true,
  resizable: false,
  width: 300,
  height: 410,
  preloadWindow: true,
  icon: __dirname + '/IconTemplate@2x.png'
})

mb.on('ready', () => {
  mb.tray.setToolTip(`${app.getName()} ${app.getVersion()}`)
  mb.tray.setHighlightMode(false)
})


exports.mb = mb