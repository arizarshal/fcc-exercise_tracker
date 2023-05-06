const dotenv = require('dotenv');
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoute')
const mongoose = require('mongoose');
dotenv.config({path: "./config.env"})

app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const DB = process.env.DATABASE

mongoose.connect(DB, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true, 
}).then(() => {
  console.log('database connected')
}).catch((error) => {
  console.log(`cannot connect to database, ${error}`);
});;



// Routes
app.use('/api', userRoutes)


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})