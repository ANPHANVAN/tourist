const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const UserMongoSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png'
        
    },
    cover_picture: {
        type: String,
        
    },
    introduce: {
        type: {
            bio: String,
            catalogue: Array,
        },
        
    },

    deleted: {
        type: String,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

UserMongoSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('User', UserMongoSchema);