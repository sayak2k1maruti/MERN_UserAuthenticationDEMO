const passport = require('passport');
const { User } = require('../Models/user');
const bcrypt = require('bcrypt')
const { validateEmail, validatePasswd, validateUname } = require('./credentialValdation');
const LocalStrategy = require('passport-local').Strategy;

const customFileds = {
    usernameField: 'uname',
    passwordField: 'passwd',
}



passport.use(new LocalStrategy(customFileds,
    (username, password, done) => {
        //checking password length
        if (!validatePasswd(password))
            return done(null, false, { message: "Incorrect Credentials" })

        const callback = async (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            const matchPasswd = await bcrypt.compare(password, user.passwd);

            return matchPasswd ?
                done(null, user) :
                done(null, false, { message: "Email/username and Password mismatched" })
        }

        //username can be an email or username
        if (validateEmail(username)) {
            //if it is email
            User.findOne({ email: username }, callback);
        } else if (validateUname(username)) {
            //if it is username
            User.findOne({ uname: username }, callback);
        } else {
            //wrong credential
            return done(null, false, { message: "Incorrect Credentials" })
        }
    }
));



passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        _id: id
    }, '-password -salt', function (err, user) {
        console.log(user)
        done(err, user);
    });
});