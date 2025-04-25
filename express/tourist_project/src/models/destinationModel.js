const MONGO_LINK=process.env.MONGO_LINK
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slugify = require('slugify');

const Destination = new mongoose.Schema ({
    destination_name: {
        type: String,
        required: [true, 'destination_name is required'],
        trim: true,
    },
    description : {
        type: String,
        required: [true, 'description is required'],
        trim: true,
    },
    image_link: {
        type: String,
        required: [true, 'image is required'],
        trim: true,
    },
    image_alt: {
        type: String,
        required: [true, 'image_alt is required'],
        trim: true,
    },
    slug: {
        type: String,
        slug: 'destination_name',
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
})

// Tạo slug tự động trước khi lưu vào cơ sở dữ liệu
Destination.pre('save', async function (next) {
  if (this.isModified('destination_name')) {
    let baseSlug = slugify(this.destination_name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 0;

    // Kiểm tra xem slug đã tồn tại chưa, nếu có thì thêm số vào cuối
    while (await mongoose.model('Destination').findOne({ slug })) {
      count++;
      slug = `${baseSlug}-${count}`;
    }

    this.slug = slug;
  }
  next();
});

Destination.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});
module.exports = mongoose.model('Destination', Destination);

