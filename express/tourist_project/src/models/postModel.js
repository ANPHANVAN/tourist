const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');
const User = require('./userMongoModel')

// Định nghĩa sub-schema cho comments
const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Bắt buộc có user_id
    },

    content: {
        type: String,
        required: true // Bắt buộc có content
    },
}, 
{
    timestamps: true 
});

const PostSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Bắt buộc có user
    },
    content: {
        type: String,
        required: true
    }, 
    images: {
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [CommentSchema], // Sử dụng sub-schema
        default: []
    },
    slug_destination: { // Sửa lỗi chính tả
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

PostSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});


module.exports = mongoose.model('Post', PostSchema);