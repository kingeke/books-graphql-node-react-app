const { GraphQLList, GraphQLID } = require("graphql")
const BookController = require("../../controllers/BookController")

const books = (types) => ({
    type: new GraphQLList(types.BookType),
    resolve() {
        return BookController.index()
    }
})

const book = (types) => ({
    type: types.BookType,
    args: {
        id: {
            type: GraphQLID,
        },
    },
    resolve(parent, { id }) {
        return BookController.show(id)
    }
})

module.exports = {
    books,
    book
}