import { graphql } from '@apollo/react-hoc';
import React, { Component, Fragment } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { CREATE_AUTHOR, GET_AUTHORS } from '../../config/Queries';

class CreateAuthor extends Component {

    initialState = {
        name: '',
        age: '',
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
            this.props.CREATE_AUTHOR({
                variables: { ...this.state, age: parseInt(this.state.age) },
                refetchQueries: [
                    {
                        query: GET_AUTHORS
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

        const { name, age, formSubmitting, showModal } = this.state
        
        return (
            <Fragment>
                <span className="fa-stack fa-2x pointer" onClick={this.handleModal}>
                    <i className="fas fa-circle fa-stack-2x text-dark"></i>
                    <i className="fas fa-user-secret fa-stack-1x fa-inverse"></i>
                </span>
                <Modal show={showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Author</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row}>
                                <Form.Label column>Name:</Form.Label>
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
                                <Form.Label column>Age:</Form.Label>
                                <Col lg={9}>
                                    <Form.Control
                                        min="18"
                                        type="number"
                                        name="age"
                                        value={age}
                                        onChange={this.handleChange}
                                        required
                                    >
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

export default graphql(CREATE_AUTHOR, {
    name: 'CREATE_AUTHOR'
})(CreateAuthor)