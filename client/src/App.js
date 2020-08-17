
import React, { Fragment, useState } from 'react';
import CreateBook from './components/books/CreateBook';
import ViewBook from './components/books/ViewBook';
import ViewBooks from './components/books/ViewBooks';
import CreateAuthor from './components/authors/CreateAuthor';

function App() {

    const [book, setBook] = useState(null)

    return (
        <Fragment>
            <div className="d-flex">
                <div className="col-md-6 p-5">
                    <div className="d-flex justify-content-between position-fixed create-actions">
                        <CreateBook />
                        <CreateAuthor />
                    </div>
                    <div className="text-center mb-3">
                        <h2>Reading List</h2>
                    </div>
                    <ViewBooks setBook={setBook} />
                </div>
                <div className="col-md-6 bg-dark p-5 text-white min-vh-100">
                    {book && <ViewBook id={book} setBook={setBook} />}
                </div>
            </div>
        </Fragment>
    );
}

export default App;
