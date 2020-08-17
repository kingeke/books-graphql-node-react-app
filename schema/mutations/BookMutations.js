const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    Graph
} = require("graphql")
const BookController = require("../../controllers/BookController")

module.exports = (types) => ({

    createBook: {
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
    },

    deleteBook: {
        type: types.BookType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID),
                description: "The book ID"
            }
        },
        resolve(parent, { id }) {
            return BookController.destroy(id)
        }
    }
})