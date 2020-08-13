const graphql = require('graphql')
const AuthorQuery = require('./query/AuthorQuery')
const BookQuery = require('./query/BookQuery')

const query = {}
const types = {}
const mutations = {}

types.BookType = require('./types/BookType')(types)
types.AuthorType = require('./types/AuthorType')(types)

mutations.AuthorMutations = require('./mutations/AuthorMutations')(types)
mutations.BookMutations = require('./mutations/BookMutations')(types)


query.author = AuthorQuery.author(types)
query.authors = AuthorQuery.authors(types)
query.book = BookQuery.book(types)
query.books = BookQuery.books(types)

const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql


const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...query,
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...mutations.AuthorMutations,
        ...mutations.BookMutations,
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})