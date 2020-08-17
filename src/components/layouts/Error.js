import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export default function Error({ message }) {
    return (
        <Row>
            <Col lg={{ offset: 2, span: 8 }}>
                <Card border="danger">
                    <Card.Header>
                        Error
                        </Card.Header>
                    <Card.Body>
                        <p>{message}</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
