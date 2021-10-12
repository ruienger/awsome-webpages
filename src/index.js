const HTTP = require('http')
const FS = require('fs')
const PORT = 8080

function readFileInSrc(path) {
  return FS.readFileSync(`src/${path}`, {
    encoding: 'utf-8'
  })
}

function getFileByUrl(url) {
  if (url !== '/') {
    let file = readFileInSrc('404.html')
    try {
      file = readFileInSrc(url)
    } catch (e) {
      file += e
    }
    return file
  }
  return readFileInSrc('index.html')
}

HTTP.createServer((request, respone) => {
  console.log(request.url);
  respone.end(getFileByUrl(request.url.replace('#/', '')))
}).listen(PORT)

console.log(`website is avaliable on localhost:${PORT}`);
