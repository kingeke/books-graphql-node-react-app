const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    genre: String,
    description: String,
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }
})

module.exports = mongoose.model('Book', bookSchema)