// const HTTP = require('http')
// const FS = require('fs')
// const PORT = 8080
// const { browseLocally } = require('@ruienger/browse')

// function readFileInSrc(path) {
//   return FS.readFileSync(`src/${path}`, {
//     encoding: 'utf-8'
//   })
// }

// function getFileByUrl(url) {
//   if (url !== '/') {
//     let file = readFileInSrc('homepage/404.html')
//     try {
//       file = readFileInSrc(url)
//     } catch (e) {
//       file += e
//     }
//     return file
//   }
//   return readFileInSrc('homepage/index.html')
// }

// HTTP.createServer((request, respone) => {
//   console.log(request.url);
//   respone.end(getFileByUrl(request.url.replace('#/', '')))
// }).listen(PORT, () => browseLocally(PORT))

// console.log(`website is avaliable on localhost:${PORT}`);
