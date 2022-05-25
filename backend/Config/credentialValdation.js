const { MIN_UNAME_LENGTH, MIN_PASSWD_LENGTH } = require('./config');
const validateUname = (uname) => {
    return ((uname.length < MIN_UNAME_LENGTH) || uname.includes('@')) ? false : true;
}
const validatePasswd = (passwd) => {
    return (passwd.length < MIN_PASSWD_LENGTH) ? false : true;
}
const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ?
        true : false
}

module.exports = { validateEmail, validatePasswd, validateUname }