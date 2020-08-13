const Book = require('../models/Book')

module.exports = {

    index: async () => {
        return await Book.find({}, (err, books) => {
            if (err) {
                return err.message
            }

            return books
        })
    },

    store: async (name, genre, description, author_id) => {
        return await new Book({
            name,
            genre,
            description,
            author_id,
        }).save()
    },

    show: async (id) => {
        return await Book.findById(id)
    },

    findByAuthor: async (author_id, lengthOnly = false) => {
        return await Book.find({
            author_id
        }, (err, books) => {

            if (err) err.message

            return lengthOnly ? books.length : books
        })
    },
    
    countByAuthor: async(author_id) => {
        return await Book.count({
            author_id
        }, (err, count) => {
            
            if(err) err.message 
            
            return count
        })
    }
}