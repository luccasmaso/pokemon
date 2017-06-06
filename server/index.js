require('dotenv').config()

var path = require("path")
var express = require('express')
var exphbs  = require('express-handlebars')
var bodyParser = require('body-parser')
var routes = require('./routes')

var app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../public')))

app.engine('handlebars', exphbs())
app.set('views', __dirname)
app.set('view engine', 'handlebars')

app.use('/', routes)

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000')
})
