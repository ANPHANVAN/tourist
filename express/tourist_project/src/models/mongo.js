const mongoose = require('mongoose');
slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Tourist_detination = new Schema({
  createAt: {type: Date, default: Date.now},
  updateAt: {type: Date, default: Date.now},
  deleted: {type: Boolean, default: false},
  deletedAt: {type: Date, default: null}
});

//  Add plugin 
mongoose.plugin(slug)
Tourist_detination.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: ['findOne', 'findById', 'count', 'countWithDeleted',  'findOneAndUpdate', 'findByIdAndUpdate', 'findOneAndDelete', 'findByIdAndDelete']
});

Tourist_detination.statics.findDeleted = function() {
  console.log('Running findDeleted with query:', { deleted: true });
  return this.find({ deleted: true });
};

Tourist_detination.statics.findActive = function() {
  return this.find({
    $or: [
      { deleted: false },           // Các document có deleted: false
      { deleted: { $exists: false } } // Các document không có trường deleted
    ]
  });
};

module.exports = mongoose.model('Tourist_detination', Tourist_detination);

