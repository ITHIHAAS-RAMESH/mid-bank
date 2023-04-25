const express = require('express')
const app = express()
const session = require('express-session')
const signupRoute = require('./routers/signup')
const loginRoute = require('./routers/login')
const sendRoute = require('./routers/send')
const connectDB = require('./database/db')
const { successRender } = require('./controllers/send')
const infoRoute = require('./routers/info')
const PORT = process.env.PORT || 3030;
require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
app.set('view engine' , 'ejs')
app.use('/signup',signupRoute)
app.use('/login',loginRoute)
app.use('/send',sendRoute)
app.use('/info',infoRoute)



const start = async () =>{
    try {
        await connectDB(process.env.MONGO_DB)
        app.listen(PORT,console.log(`server is listening to 8000...`))
    } catch (error) {
        console.log(error)
    }
}

start()

app.listen(8080)

