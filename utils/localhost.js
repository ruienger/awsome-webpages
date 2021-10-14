const os = require('os')

module.exports.getLocalhostIP = function () {
  let localhost = 'localhost'
  const netInterfaces = os.networkInterfaces()
  for (interface in netInterfaces) {
    const internalIPv4Interface = netInterfaces[interface].filter(attr => {
      return attr.internal && attr.family === 'IPv4'
    })
    if (internalIPv4Interface.length) {
      localhost = internalIPv4Interface[0].address
      break
    }
  }
  return localhost
}