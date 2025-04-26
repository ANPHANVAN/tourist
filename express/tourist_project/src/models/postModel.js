const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');

const PostSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, 
    content: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    likes: {
        type: [String],
        required: true
    },
    comments: {
        type: [{
            user_id: String,
            content: String,
            created_at: Date
        }],
        required: true
    },
    slug_destinaiton: { 
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

PostSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

const Post =  mongoose.model('Post', PostSchema)

module.exports = Post