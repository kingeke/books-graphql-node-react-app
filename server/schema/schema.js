const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql

const books = [
    {
        id: 1,
        author_id: 1,
        name: 'Book Man',
        genre: 'Fiction',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit similique perspiciatis, deleniti reiciendis veniam fuga iste ratione ex fuga iste ratione ex molestiae! Officiis impedit laboriosam nisi fugit modi tenetur aperiam vel, rerum aspernatur?'
    },
    {
        id: 2,
        author_id: 1,
        name: 'Sighted Man',
        genre: 'Drama',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic nobis veniam temporibus animi error, nihil dolor dolorem officiis iusto minus aperiam recusandae, atque cumque rerum. Animi delectus nobis maxime sunt!'
    },
    {
        id: 3,
        author_id: 3,
        name: 'Fictorion',
        genre: 'Thriller',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel accusamus est iusto hic harum praesentium, soluta, atque explicabo fuga architecto cumque, iure excepturi animi deleniti ut laboriosam? Qui, nobis doloribus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam culpa quo totam, recusandae rem distinctio eligendi ipsam esse nihil veritatis voluptas veniam id soluta harum possimus aliquam. Quia, amet exercitationem?'
    }
]

const authors = [
    {
        id: 1,
        name: "James Albren",
        age: 44
    },
    {
        id: 2,
        name: "Peter Albren",
        age: 41
    },
    {
        id: 3,
        name: "Charles Albren",
        age: 14
    },
]

const BookType = new GraphQLObjectType({
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
            type: AuthorType,
            resolve(parent, args){
                console.log(parent)
                return authors.find(item => item.id == parent.author_id)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
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
          resolve(parent, {}){
            return books.filter(item => item.author_id == parent.id).length
        }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, {}){
                return books.filter(item => item.author_id == parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return authors
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                return books
            }
        },
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, { id }) {
                return books.find(item => item.id == id)
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, { id }) {
                return authors.find(item => item.id == id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})