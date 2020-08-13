const Author = require('../models/Author')

const index = async() => {
    return await Author.find({}, (err, authors) => {
        if(err) {
            return err.message
        }
        
        return authors
    })
}

const store = async (name, age) => {
    return await new Author({
        name,
        age
    }).save()
}

const show = async (id) => {
    return await Author.findById(id)
}

module.exports = {
    store,
    index,
    show
}