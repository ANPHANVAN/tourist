const Post = require('../models/postModel');

class MeController {
    // GET /me
    async index(req, res) {
        const user_id = req.user.id
        res.redirect(`/me/${user_id}`)
    }

    // GET /me/:id
    async me(req,res,next){
        const user = req.user
        res.render('mes/me', { user: user, user_id: user.ObjectId })
    }

    // GET /me/api/:id
    async apiMe(req, res, next){
        const id = req.params.id
        res.json({
            id: id,
            name: 'me'
        })
    }

    // POST /me/posts
    async posts(req, res, next){
        try {
            // const user_id = req.user.id
            let post = req.body
            post.user_id = req.user.id
            post.user = req.user.ObjectId
            await Post.create(post)
            res.redirect('/me')
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new MeController();