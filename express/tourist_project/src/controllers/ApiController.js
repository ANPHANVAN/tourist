const UserPostgres = require('../models/userModel');
const UserMongo = require('../models/userMongoModel');
const Destination = require('../models/destinationModel')
const Post = require('../models/postModel');

class ApiController {
    // GET /api/user/all-user
    async apiAllUser(req, res) {
        try {
            let allUser = await UserMongo.find({})
            res.json({users: allUser})
        } catch (error) {
            console.error('Error fetching all users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // GET /api/post/all-post
    async apiAllPost(req, res) {
        try {
            let allPost = await Post.find({})
            res.json({posts: allPost})
        } catch (error) {
            console.error('Error fetching all posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


module.exports = new ApiController()