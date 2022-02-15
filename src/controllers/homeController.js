const router = require('express').Router();
const artService = require('../services/artService')
const profileService = require('../services/profileService.js')

router.get('/', async (req, res) => {

    let artData = await artService.getAll();
   
    console.log(artData)

    res.render('home', {artData})
})


router.get('/profile/:userId', async (req, res) => {

    let user = await profileService.profile(req.params.userId)
    console.log(user)

    res.render('profile', {...user})
})


module.exports = router;