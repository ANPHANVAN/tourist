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
        default: 'https://ichef.bbci.co.uk/ace/standard/2560/cpsprodpb/b2d0/live/d4d933e0-8a17-11ef-bfd3-790fcba1cccf.jpg'
    },
    bio: {
        type: String,
        default: 'Hello, I am a new user'
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
    online_status: {
        type: Boolean,
        default: false,
      }
})

UserMongoSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('User', UserMongoSchema);