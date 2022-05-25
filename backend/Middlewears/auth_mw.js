const passport = require('passport')
const bcrypt = require('bcrypt')
const { validateEmail, validatePasswd, validateUname } = require('../Config/credentialValdation')
const { User } = require('../Models/user')
const { PASSWD_SALT_ROUND } = require('../Config/config')

const authUser = (req, res, next) => {
    if (!req.user)
        return res.status(401).send({ success: false, message: 'You must be logged in' })
    next()
}

const signin = (req, res, next) => {
    passport.authenticate('local', { session: true }, (err, user, info) => {
        if (err) {
            console.log(err)
            res.status(500).send({ success: false, message: `${err}` })
            return;
        }
        if (!user) {
            res.status(403).send({ success: false, message: info.message })
            return
        }
        console.log(user)
        req.logIn(user, (err) => {
            if (err) {
                res.status(500).send({ success: false, message: `${err}` })
                return
            }
            res.redirect('signin/verify')
        })
    })(req, res, next)
}

const signout = (req, res, next) => {
    req.logOut((err) => {
        if (err)
            return res.status(500).send({ success: false, message: `${err}` })
        res.status(200).send({ success: true, message: 'You are signed out successfully' });
    });
}

const register = async (req, res, next) => {
    let uname = req.body.uname;
    let passwd = req.body.passwd;
    let email = req.body.email;
    if (!(uname && passwd && email))
        return res.status(400).send({ success: false, message: 'Wrong Credentials' });
    if (!(validateEmail(email) && validatePasswd(passwd) && validateUname(uname)))
        return res.status(400).send({ success: false, message: 'Incorrect Credentials format' });

    //check for pre exsisting username , passwd
    try {
        let getUserByemail = await User.findOne({ email: email }).exec()
        let getUserByusername = await User.findOne({ uname: uname }).exec()
        if (getUserByusername)
            return res.status(403).send({ success: false, message: "username already in use" })
        if (getUserByemail)
            return res.status(403).send({ success: false, message: "email already in use" })
    } catch (err) {
        return res.status(500).send({ success: false, message: `${err}` })
    }

    const saveInToDb = (passwdHash) => {
        let newUser = new User({
            uname: uname,
            email: email,
            passwd: passwdHash
        })
        let callback = (err, result) => {
            if (err)
                return res.status(500).send({ status: false, message: `${err}` });
            res.status(200).send({ success: true, user: result })
        }
        newUser.save(callback)
    }
    //encrypting passwd and saving new user to DB
    bcrypt.hash(passwd, PASSWD_SALT_ROUND).then(saveInToDb);

}

const checkUname = (req, res, next) => {
    let uname = req.query.uname
    if (!uname)
        return res.status(401).send({ success: false, message: "invalid credentials" });
    if (!validateUname(uname))
        return res.status(401).send({ success: false, message: "wrong credential format" });

    const callback = (err, user) => {
        if (err)
            return res.status(500).send({ success: false, message: `${err}` })
        if (!user)
            return res.status(200).send({ success: true, status: false })
        return res.status(200).send({ success: true, status: true })
    }
    User.findOne({ uname: uname }, callback);
}

module.exports = { authUser, signin, signout, register, checkUname }