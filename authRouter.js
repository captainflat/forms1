const {Router} = require('express')
const {application} = require('express')
const router = Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min: 4, max: 10})
], controller.registration)

router.post('/login', controller.login)

router.get('/users', authMiddleware(['USER']), controller.getUsers)

router.get('/registration', async (req, res) => {
    const users = await authMiddleware.find({}).lean()
    res.render('index', {
        title: 'Registration',
        isIndex: true
    })
})

router.get('/login', (req, res) => {
    res.render('login.hbs', {
        title: 'login',
        isLogin: true
    })
})

router.get('/entered', (req, res) => {
    res.render('entered', {
        title: 'entered',
        isEntered: true
    })
})

module.exports = router