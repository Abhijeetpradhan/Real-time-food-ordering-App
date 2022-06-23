require('dotenv').config()
const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const expressLayout=require('express-ejs-layouts');
const PORT=process.env.PORT || 3000;
const mongoose=require('mongoose');
const session= require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const authController = require('./app/http/controllers/authController');
const { userInfo } = require('os');
const user = require('./app/models/user');
// const passport = require('passport')
// const User = require('./app/models/user');
const Emitter = require('events')


//Database connection
mongoose.connect("mongodb://localhost:27017/pizza",{ useNewUrlParser: true , useUnifiedTopology: true }).then(() =>console.log("Connection Successfull"))
.catch((err) => console.log(err));


app.use(require('cookie-parser')())

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter);


//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store:MongoStore.create({
        mongoUrl:"mongodb://localhost:27017/pizza"
    }),
    saveUninitialized:false,
    cookie:{ maxAge: 1000*60*60*24  } //24hours
}))


app.use(flash())


//Assets
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())



//Global middleware
app.use((req,res,next) =>{

    res.locals.session = req.session;
    res.locals.user = "";
    next();

 })


// const isAuth = (req,res,next)=>{
//     if(req.session.isAuth){
//         next()
//     }
//     else{`
//         res.redirect('/login')
//     }
// }






// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


app.set("layout home", false);
// app.set("layout auth/login", false);

// app.set("layout auth/register", false);


app.get('/cart1',(req,res) =>{
    res.render('customers/cart1')
})





require('./routes/web')(app)


//server listening
const server=app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`);
})

//socket connection

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data._id}`).emit('orderUpdated', data)
})



