const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.get('/', (req, res, next) => {
  res.render('index')
})
app.use(express.static(path.join(__dirname, 'public')))

app.listen('3000', () => {
  console.log('server is worked on port 3000')
})
