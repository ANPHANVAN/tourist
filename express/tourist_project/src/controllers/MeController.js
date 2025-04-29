const Post = require('../models/postModel');
const UserMongo = require('../models/userMongoModel');
class MeController {
    // GET /me
    async index(req, res) {
        const user_id = req.user.ObjectId
        res.redirect(`/me/${user_id}`)
    }

    // GET /me/:id
    async me(req,res,next){
        const user_id = req.params.id
        let user = await UserMongo.findOne({_id: user_id})
        res.render('mes/me', { user: user })
    }

    // GET /me/:id/edit
    async meGetEdit(req,res,next){

        res.render('mes/editUser')
    }

    // GET /me/api/:id/edit
    async meGetEditApi(req,res,next){
        const user = await UserMongo.findOne({_id: req.user.ObjectId})
        res.json(user)
    }

    // POST /me/api/:id/edit
    async mePostEdit(req,res,next){
        const updatedUser = await UserMongo.findOneAndUpdate(
            { _id: req.user.ObjectId },
            { $set: req.body },     // chỉ update các trường có trong req.body
            { new: true }           // trả về document đã được cập nhật
          );
          
        res.redirect('/me')
        // res.redirect(`/me/${req.params.id}`)
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