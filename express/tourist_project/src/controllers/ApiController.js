const UserPostgres = require('../models/userModel');
const UserMongo = require('../models/userMongoModel');
const Destination = require('../models/destinationModel')
const Post = require('../models/postModel');

class ApiController {
    // GET /api/user/all-user
    async apiAllUser(req, res) {
        try {
            let allUser = await UserMongo.find({}).sort({ online_status: -1 });
            res.json({users: allUser})
        } catch (error) {
            console.error('Error fetching all users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // GET /api/post/all-post
    async apiAllPost(req, res) {
        try {
            let allPost = await Post.find({}).populate('user', 'fullname _id avatar')
            .populate('comments.user', 'fullname _id avatar');
            res.json(allPost)
        } catch (error) {
            console.error('Error fetching all posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // GET /api/post/user-post/:id => user_id post of user
    async apiUserPost(req, res) {
        try {
            
            let userPost = await Post.find({user:req.params.id}).populate('user', 'fullname _id avatar')
            .populate('comments.user', 'fullname _id avatar');
            res.json(userPost)
        } catch (error) {
            console.error('Error fetching all posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // GET /api/users/:id
    async apiOneUser(req, res) {
        try {
            const ObjectId = req.params.id
            let user = await UserMongo.findOne({_id: ObjectId})
            res.json({user})
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // GET /api/user-current  take user current
    async apiUserCurrent(req, res) {
        try {
            const userId = req.user.ObjectId
            let user = await UserMongo.findOne({_id: userId})
            res.json({user})
        } catch (error) {
            console.error('Error fetching current user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // POST /api/posts/:postId/comment
    async apiPostComment(req, res) {
        try {
            const postId = req.params.postId
            const { content } = req.body
            let post = await Post.findOne({_id:postId})
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            post.comments.push({
                user: req.user.ObjectId,
                content: content
            })

            await post.save()
            let user = await UserMongo.findOne({_id:req.user.ObjectId})
            res.status(200).json({
                content: content,
                user: user,
            })
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // POST /api/posts/:postId/like  add user like to post
    async apiPostPOSTLike(req, res) {
        try {
        const postId = req.params.postId;
        const userId = req.user.ObjectId;
    
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });
    
        const hasLiked = post.like_user.includes(userId);
        
        if (hasLiked) {
            // Nếu đã like → unlike (gỡ user khỏi mảng like_user)
            await Post.updateOne(
            { _id: postId },
            {   $pull: { like_user: userId },
                $inc: { likes: -1 }
            }
            );
            return res.json({ message: 'Unliked' });
        } else {
            // Nếu chưa like → like (thêm userId vào mảng)
            await Post.updateOne(
            { _id: postId },
            { $addToSet: { like_user: userId },
                $inc: {likes: +1} } 
            );
            return res.json({ message: 'Liked' });
        }
    
        } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }
  
}


module.exports = new ApiController()