const AuthorController = require("../../controllers/AuthorController")
const { GraphQLList, GraphQLID } = require("graphql")

const authors = (types) => ({
    type: new GraphQLList(types.AuthorType),
    resolve() {
        return AuthorController.index()
    }
})

const author = (types) => ({
    type: types.AuthorType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, { id }) {
        return AuthorController.show(id)
    }
})

module.exports = {
    authors,
    author
}