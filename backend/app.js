const express         = require('express'),
      methodOverride  = require('method-override'),
      bodyParser      = require('body-parser'),
      routes          = require('./routes'),
      app             = express()

// server config
app.use(methodOverride('X­HTTP­Method'))
app.use(methodOverride('X­HTTP­Method­Override'))
app.use(methodOverride('X­Method­Override'))
app.use(methodOverride('_method'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (request, response, next) {
  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'})
    response.end('')
  } else {
    next()
  }
})

// router
app.use('/', routes)

// error handling
app.use(function(request, response, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, request, response, next) {
  response.status(err.status || 500).json({ err: err.message })
})

var server = app.listen(3000, function(){
  var host = server.address().address
  var port = server.address().port
  console.log('E-money Server listening at http://%s:%s', host, port)
})