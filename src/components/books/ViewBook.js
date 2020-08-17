import { graphql, useMutation } from '@apollo/react-hoc'
import React, { Fragment } from 'react'
import { DELETE_BOOK, GET_BOOKS, GET_BOOK } from '../../config/Queries'
import Error from '../layouts/Error'
import Loader from '../layouts/Loader'

function ViewBook({ id, data: { loading, book, error }, setBook }) {

    const [delete_book] = useMutation(DELETE_BOOK, {
        refetchQueries: [
            {
                query: GET_BOOKS
            }
        ]
    })

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error message={error.message} />
    }

    if (book) {
        return (
            <div id="book-details">
                <h3 className="text-capitalize">{book.name}</h3>
                <span className="badge badge-info mb-2 text-capitalize">{book.genre}</span> <br />
                <small>Description</small>
                <p>{book.description}</p>
                <small>Author</small>
                <p>{book.author.name}</p>
                {
                    book.author.books.filter(book => book.id !== id).length > 0 &&
                    <Fragment>
                        <p>
                            Other books from the author
                        </p>
                        <ul>
                            {
                                book.author.books && book.author.books.filter(book => book.id !== id).map(book => (
                                    <li className="pointer text-capitalize" onClick={() => setBook(book.id)} key={book.id}>{book.name}</li>
                                ))
                            }
                        </ul>
                    </Fragment>
                }
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                        delete_book({ variables: { id } });
                        setBook(null);
                    }}
                >
                    Delete Book
                </button>
            </div>
        )
    }

    return (
        <p>No book selected</p>
    )
}

export default graphql(GET_BOOK, {
    options: ({ id }) => {
        return {
            variables: {
                id
            }
        }
    }
})(ViewBook)