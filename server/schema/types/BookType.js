const graphql = require('graphql')
const AuthorController = require('../../controllers/AuthorController')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql

module.exports = (types) => new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        author: {
            type: types.AuthorType,
            resolve(parent, args) {
                return AuthorController.show(parent.author_id)
            }
        }
    })
})
