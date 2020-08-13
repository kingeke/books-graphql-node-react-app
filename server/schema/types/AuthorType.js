const graphql = require('graphql')
const BookController = require('../../controllers/BookController')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
} = graphql

module.exports = (types) => new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        booksCount: {
            type: GraphQLInt,
            resolve(parent, { }) {
                return BookController.countByAuthor(parent.id)
            }
        },
        books: {
            type: new GraphQLList(types.BookType),
            resolve(parent, { }) {
                return BookController.findByAuthor(parent.id)
            }
        }
    })
})