var http = require('http')
var HttpCors = require('http-cors')
var cors = new HttpCors()
var HttpHashRouter = require('http-hash-router')
var router = HttpHashRouter()

var bodyJSON = require('body/json')
var sendJSON = require('send-data/json')
var sendError = require('send-data/error')
var sendHtml = require('send-data/html')
var fs = require('fs')
var ejs = require('ejs')
var ecstatic = require('ecstatic')

var fetchConfig = require('zero-config')
var config = fetchConfig(__dirname, { dcValue: 'us-east-1'})

var AWS = require('aws-sdk')
var awsCreds = config.get('aws')
AWS.config = (awsCreds)

var ee = require('./services')()

router.set('/api/info', {
  POST: function (req, res) {
    bodyJSON(req, res, function (err, body) {
      // verify token
      var dbname = body.name.replace('@','_').replace('.','_');
      // var url = [config.get('dbServer.url'), dbname].join('/')
      sendJSON(req, res, url);
    })
  }
})

router.set('/api', {
  POST: function(req, res) {
    bodyJSON(req, res, function(err, body) {
      // console.log(body)
      var timeoutFired = false;
      var to = setTimeout(function () {
        timeoutFired = true;
        sendError(req, res, { body: 'Timeout Occured on Event: ' + body.subject});
      }, 2000);
      ee.once(body.from, function (e) {
        clearTimeout(to);
        if (!timeoutFired) sendJSON(req, res, e);
      })
      ee.emit('send', body)
    })
  }
})

router.set('/fitbit/webhook', {
  POST: function(req, res) {
    bodyJSON(req, res, function(err, body) {
      body.subject = '/fitbit'
      body.action = 'authorize'
      var timeoutFired = false
      var to = setTimeout(function () {
        timeoutFired = true;
        sendError(req, res, { body: 'Timeout Occured on FitBit Event ' + body.subject});
      }, 2000);
      ee.once(body.from, function (e) {
        clearTimeout(to);
        if (!timeoutFired) sendJSON(req, res, e);
      })
      ee.emit('send', body)
    })
  }
})

router.set('/mapMyFitness/webhook', {
  // handle callback for Oauth once device is approved
})

// templates
router.set('/app', handleAppTemplate)

router.set('/', handleAppTemplate)

// static assets
router.set('/fonts/*', ecstatic({ root: __dirname + '/www',  handleError: false}))
router.set('/img/*', ecstatic({ root: __dirname + '/www',  handleError: false}))
router.set('/browser.js', ecstatic({ root: __dirname + '/www',  handleError: false}))
router.set('/main.css', ecstatic({ root: __dirname + '/www',  handleError: false}))


var server = http.createServer(function (req, res) {
  // handle cors requests and return
  if (cors.apply(req, res)) return res.end()
  
  router(req, res, {}, onError)
  // handle Error
  function onError (err) {
      // use your own custom error serialization.
      // res.statusCode = err.statusCode || 500;
      // res.end(err.message)
      handleTemplatePage(req, res)
  }
})

server.listen(process.env.PORT || 3000)

// support methods
function handleAppTemplate (req, res) {
  var page = fs.readFileSync(__dirname + '/templates/app.html', 'utf-8');
  renderApp(req, res, page)
}

function handleTemplatePage (req, res) {
  if (req.url === '/') req.url = '/layout.html'
  var page = fs.readFileSync(__dirname + '/templates/app.html', 'utf-8');
  render(req, res, page)
}

function renderApp (req, res, template) {
  var layout = fs.readFileSync(__dirname + '/templates/layout.html', 'utf-8');
  //var nav = fs.readFileSync(__dirname + '/templates/nav.html', 'utf-8')
  var footer = fs.readFileSync(__dirname + '/templates/footer.html', 'utf-8');

  // res.writeHead(200, {'Content-Type': 'text/html'});
  sendHtml(req, res, ejs.render(layout, {
    nav: '',
    body: template,
    footer: footer
  }))
}

function render (req, res, template) {
  var layout = fs.readFileSync(__dirname + '/templates/layout.html', 'utf-8');
  var nav = fs.readFileSync(__dirname + '/templates/nav.html', 'utf-8');
  var footer = fs.readFileSync(__dirname + '/templates/footer.html', 'utf-8');

  // res.writeHead(200, {'Content-Type': 'text/html'});
  sendHtml(req, res, ejs.render(layout, {
    nav: nav,
    body: template,
    footer: footer
  }))
}
