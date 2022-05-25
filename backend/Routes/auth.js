const router = require('express').Router();
const passport = require('passport');
const { authUser, signin, signout, register, checkUname } = require('../Middlewears/auth_mw');

router.get('/', (req, res) => {
    res.status(200).send({
        success: true
    })
})

router.post('/signin/verify', authUser, (req, res) => res.status(200).send(req.user));

router.post('/signin', signin);

router.post('/signout', signout);

router.post('/signup', register);

//end point to check from client if any username is already exists or not
router.get('/check/uname', checkUname);

module.exports = router