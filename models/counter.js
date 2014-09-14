var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var counterSchema = new Schema({
    _id: String, 
    seq: Number 
});


counterSchema.statics.increment = function (type, callback) {
  return this.collection.findAndModify({ _id: type }, [], { $inc: { seq: 1 } }, callback);
};

module.exports = mongoose.model('counters', counterSchema);