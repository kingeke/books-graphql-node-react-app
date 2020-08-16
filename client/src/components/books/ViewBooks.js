import { graphql } from '@apollo/react-hoc'
import _ from 'lodash'
import React, { Fragment } from 'react'
import { GET_BOOKS } from '../../config/Queries'
import Error from '../layouts/Error'
import Loader from '../layouts/Loader'

function ViewBooks({
    data: { loading, error, books },
    setBook
}) {

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error message={error.message} />
    }

    const colors = ['info', 'success', 'danger', 'primary', 'dark']

    return (
        <Fragment>
            <div className="row">
                {
                    books && books.map(book => {

                        let color = _.sample(colors)

                        return (
                            <div className="col-md-6 my-2 pointer" key={book.id}>
                                <div
                                    onClick={() => setBook(book.id)}
                                    className={`border p-3 rounded text-center shadow text-${color} border-${color}`}
                                >
                                    {book.name}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </Fragment>
    )
}

export default graphql(GET_BOOKS)(ViewBooks)