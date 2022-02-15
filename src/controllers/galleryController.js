const router = require('express').Router();
const artService = require('../services/artService')
const { getFirstErrorMessage } = require('../helpers/firstErrorMessage')
const { isAuth } = require('../middlewares/authMiddleware')


router.get('/all', async (req, res) => {

    try {
        let galleries = await artService.getAll()
        res.render('allGaleries', { galleries })
    } catch (err) {
        console.log(err)
        res.render('allGaleries', { error: err.message })
    }
})
router.get('/create', isAuth, async (req, res) => {

    try {

        res.render('posts/create')
    } catch (err) {
        res.render('posts/create', {
            error: getFirstErrorMessage(err)
        })

    }
})
router.post('/create', isAuth, async (req, res) => {

    try {

        await artService.create({ ...req.body, author: req.user._id })
        res.redirect('/gallery/all')  // all posts page
    } catch (err) {

        res.render('posts/create', {
            error: getFirstErrorMessage(err)
        })
    }

})

router.get('/:artId/details', async (req, res) => {

    try {

        let author = await artService.getAuthor(req.params.artId);
        let authorData = await author.toObject();

        let art = await artService.getOne(req.params.artId);
        let artData = await art.toObject();
        let isOwner = artData.author == req.user?._id;
        let isLogged = req.user == undefined ? false : true;

        // console.log(voters)
        let isVoted = art.usersShared.some(x => x._id == req.user?._id)

        res.render('posts/details', { ...artData, isOwner, isLogged, isVoted, author: authorData.author.username })
    } catch (err) {
        res.render('posts/details', { error: err.message })
    }

})

router.get('/:artId/edit', isntOwner, async (req, res) => {

    try {

        let art = await artService.getOne(req.params.artId)
        res.render('posts/edit', { ...art.toObject() })
    } catch (err) {

        res.render('posts/edit', { error: err.message })
    }

})
router.post('/:artId/edit', isntOwner, async (req, res) => {

    try {

        let art = await artService.editOne(req.params.artId, req.body)
        res.redirect(`/gallery/${req.params.artId}/details`)
    } catch (err) {

        let art = await artService.getOne(req.params.artId)
        res.render('posts/edit', { ...art.toObject(), error: err.message })
    }

})

router.get('/:artId/delete', isntOwner, async (req, res) => {

    try {

        await artService.deleteOne(req.params.artId)
        res.redirect('/gallery/all')
    } catch (err) {

        res.render(`/posts/${req.params.artId}/details`, { error: err.message })
    }

})

router.get('/:artId/share', isOwner, async (req, res) => {

    try {


        let art = await artService.share(req.params.artId, req.user._id)

        res.redirect(`/`,)
    } catch (err) {
        throw new Error('Share error')
    }
})

async function isOwner(req, res, next) {

    let art = await artService.getOne(req.params.artId)
    let artData = art.toObject()
    if (artData.author == req.user._id) {
        res.redirect(`/`)
    } else {
        next()
    }
}
async function isntOwner(req, res, next) {

    let art = await artService.getOne(req.params.artId)
    let artData = art.toObject()

    if (artData.author != req.user?._id) {
        res.redirect(`/auth/login`)
    } else {
        next()
    }
}

module.exports = router;
