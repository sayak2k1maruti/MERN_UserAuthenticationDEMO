const express = require('express');
const session = require('express-session');
const passport = require('passport');
const port = process.env.port || 5000;
const AuthRoute = require('./Routes/auth');
const { connectToMongoose } = require('./Config/mongoose');
const { SESSION_TIMEOUT } = require('./Config/config');
require('dotenv').config()


const app = express();


//app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        //session expires after SESSION_TIMEOUT hours
        cookie: { maxAge: 60 * 1000 * 60 * SESSION_TIMEOUT },
    }))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())
require('./Config/passport');
app.use('/auth', AuthRoute);




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    connectToMongoose();
})