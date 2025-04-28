const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');

// Định nghĩa sub-schema cho comments
const CommentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        ref: 'User',
        required: true // Bắt buộc có user_id
    },
    content: {
        type: String,
        required: true // Bắt buộc có content
    },
    created_at: {
        type: Date,
        default: Date.now // Tự động gán thời gian hiện tại
    }
});

const PostSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
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
        type: [String],
        default: []
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