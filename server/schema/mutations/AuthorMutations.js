const AuthorController = require("../../controllers/AuthorController")
const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require("graphql")

module.exports = (types) => ({
    addAuthor: {
        type: types.AuthorType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString),
                description: "The author name"
            },
            age: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'The author age'
            },
        },
        resolve(parent, { name, age }) {
            return AuthorController.store(name, age)
        }
    },
})