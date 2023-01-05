const Author = require('../models/Author')

module.exports = {

    index: async () => {
        return await Author.find({}, (err, authors) => {
            if (err) {
                return err.message
            }

            return authors
        })
    },

    store: async (name, age) => {
        return await new Author({
            name,
            age
        }).save()
    },

    show: async (id) => {
        return await Author.findById(id)
    }
}