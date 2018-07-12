const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema  = mongoose.Schema
const mongodbErrorHandler = require('mongoose-mongodb-errors')

// Note Schema
let noteSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please Supply a Note title address'
  },
  text: {
    type: String,
    trim: true,
    required: 'Please Supply a Note text'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

noteSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Note', noteSchema)