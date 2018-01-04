const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware')
const proxyOptions = require('./package').proxy

const app = express()

const APIKEY = process.env.TSI_API_KEY

apiProxy = proxyOptions['/api']
apiProxy.headers['TekSavvy-APIKey'] = APIKEY

app.get('/api/*', proxy(apiProxy))

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const server = app.listen(3000, () => { console.info('\x1b[33m%s\x1b[0m', `[express] Listening on ${server.address().port}`) })

process.on('SIGINT', function() {
  process.exit();
});
