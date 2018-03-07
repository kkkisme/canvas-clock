const express = require('express')
const path = require('path')
const app = express()

let port = process.env.PORT || 8000

app.set('view engine', 'ejs')
app.get('/', (req, res, next) => {
  res.render('index')
})
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`server is worked on port ${port}`)
})
