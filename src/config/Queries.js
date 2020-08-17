import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
query {
    books {
        name
        id
    }
}
`

export const GET_BOOK = gql`
query($id: ID!) {
    book(id: $id) {
        name
        id
        genre
        description
        author{
            name
            id
            booksCount
            age
            books{
                name
                id
            }
        }
    }
}
`

export const CREATE_BOOK = gql`
mutation (
    $name: String!
    $genre: String!
    $description: String!
    $author_id: ID!
) {
    createBook(
        name: $name
        genre: $genre
        description: $description
        author_id: $author_id
) {
        id
        name
    }
}
`

export const DELETE_BOOK = gql`
mutation ($id: ID!) {
    deleteBook(id: $id) {
        id
    }
}
`

export const GET_AUTHORS = gql`
query {
    authors {
        name
        id
    }
}
`

export const CREATE_AUTHOR = gql`
mutation (
    $name: String!
    $age: Int!
) {
    createAuthor(
        name: $name
        age: $age
) {
        id
        name
    }
}
`