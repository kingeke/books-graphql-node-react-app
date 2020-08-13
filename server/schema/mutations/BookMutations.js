const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = require("graphql")
const BookController = require("../../controllers/BookController")

module.exports = (types) => ({
    addBook: {
        type: types.BookType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString),
                description: "The title of the book"
            },
            genre: {
                type: new GraphQLNonNull(GraphQLString),
                description: "The genre of the book"
            },
            description: {
                type: new GraphQLNonNull(GraphQLString),
                description: "The description of the book"
            },
            author_id: {
                type: new GraphQLNonNull(GraphQLID),
                description: "The author id"
            },

        },
        resolve(parent, { name, genre, description, author_id }) {
            return BookController.store(name, genre, description, author_id)
        }
    }
})