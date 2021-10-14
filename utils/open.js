const childProcess = require('child_process')
const { getLocalhostIP } = require('./localhost')

const cmd = {
  'win32': 'start',
  'linux': 'xdg-open',
  'darwin': 'open',
}

module.exports.open = function (url, port) {
  const currentCMD = cmd[process.platform]
  if (!currentCMD) {
    throw new Error('do not support your platform')
  }
  childProcess.exec(`${currentCMD} ${url || 'http://localhost'}${port ? `:${port}` : ``}`)
}

module.exports.openLocally = function (port) {
  const currentCMD = cmd[process.platform]
  if (!currentCMD) {
    throw new Error('do not support your platform')
  }
  childProcess.exec(`${currentCMD} http://${getLocalhostIP()}${port ? `:${port}` : ``}`)
}

module.exports.getLocalhostIP = getLocalhostIP