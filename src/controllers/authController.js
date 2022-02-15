const router = require('express').Router();

const authService = require('../services/authService')
const { AUTH_COOKIE_NAME } = require('../constants')
const { isGuest, isAuth } = require('../middlewares/authMiddleware')
const { getFirstErrorMessage } = require('../helpers/firstErrorMessage')

router.get('/login', isGuest, (req, res) => {

    res.render('auth/login')
})
router.post('/login', isGuest, async (req, res) => {

    let { username, password } = req.body;

    try {

        let user = await authService.login({ username, password })
        // console.log(email)

        let token = await authService.createToken(user);


        res.locals.username = username
        res.cookie(AUTH_COOKIE_NAME, token)

        res.redirect('/')
    } catch (err) {
        // console.log(err.message)
        res.render('auth/login', {
            error: err.message,
        });
    }
})
router.get('/register', isGuest, (req, res) => {

    res.render('auth/register')
})
router.post('/register', isGuest, async (req, res) => {

    let { username, password, repeatPassword, address } = req.body;

    if (password !== repeatPassword) {

        res.locals.error = 'The repeat password should be equal to the password';

        return res.render('auth/register')

    }
    try {
        await authService.register({ username, password, repeatPassword, address })

        let user = await authService.login({ username, password })
        let token = await authService.createToken(user);

        res.cookie(AUTH_COOKIE_NAME, token)
        res.redirect('/')
    } catch (err) {
        // console.log(error.message)
        res.render('auth/register', {
            error: err.message
        })
    }
})

router.get('/logout', isAuth, (req, res) => {
    try {

        res.clearCookie(AUTH_COOKIE_NAME);
        res.redirect('/')
    } catch (err) {
        res.render('auth/login', { error: err.message })
    }
})
module.exports = router;