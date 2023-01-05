import { graphql } from '@apollo/react-hoc';
import React, { Component, Fragment } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { compose } from 'recompose';
import { CREATE_BOOK, GET_AUTHORS, GET_BOOKS } from '../../config/Queries';
import Error from '../layouts/Error';

class CreateBook extends Component {

    initialState = {
        name: '',
        genre: '',
        description: '',
        author_id: '',
        formSubmitting: false,
        showModal: false
    }

    state = this.initialState

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            formSubmitting: true
        }, () => {
            this.props.CREATE_BOOK({
                variables: { ...this.state },
                refetchQueries: [
                    {
                        query: GET_BOOKS
                    }
                ]
            }).then(
                res => {
                    this.setState(this.initialState)
                }
            ).catch(err => {
                this.setState({ formSubmitting: false })
            })
        })
    }

    handleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    render() {

        const { name, genre, description, author_id, formSubmitting, showModal } = this.state

        const { loading, error, authors } = this.props.GET_AUTHORS

        if (loading) {
            return <Fragment></Fragment>
        }

        if (error) {
            return <Error message={error.message} />
        }

        return (
            <Fragment>
                {
                    authors.length > 0 &&
                    <span className="fa-stack fa-2x pointer" onClick={this.handleModal}>
                        <i className="fas fa-circle fa-stack-2x text-info"></i>
                        <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                    </span>
                }
                <Modal show={showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row}>
                                <Form.Label column>Book Title:</Form.Label>
                                <Col lg={9}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={this.handleChange}
                                        required
                                    >
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column>Genre:</Form.Label>
                                <Col lg={9}>
                                    <Form.Control
                                        type="text"
                                        name="genre"
                                        value={genre}
                                        onChange={this.handleChange}
                                        required
                                    >
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column>Description:</Form.Label>
                                <Col lg={9}>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        maxLength="1500"
                                        value={description}
                                        onChange={this.handleChange}
                                        required
                                    >
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column>Author:</Form.Label>
                                <Col lg={9}>
                                    <Form.Control
                                        as="select"
                                        name="author_id"
                                        value={author_id}
                                        onChange={this.handleChange}
                                        required
                                    >
                                        <option value="">Select an author</option>
                                        {
                                            authors && authors.map(author => (
                                                <option key={author.id} value={author.id}>
                                                    {author.name}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Button block variant="primary" type="submit" disabled={formSubmitting}>
                                    {formSubmitting ? 'Loading...' : 'Create'}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}

export default compose(
    graphql(GET_AUTHORS, {
        name: 'GET_AUTHORS'
    }),
    graphql(CREATE_BOOK, {
        name: 'CREATE_BOOK'
    }),
)(CreateBook)