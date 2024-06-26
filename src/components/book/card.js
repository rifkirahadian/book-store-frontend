import React from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';

export const BookCard = ({ book, onOpenModalOrder }) => {
  return (
    <Card className='mb-3'>
      <Card.Img variant="top" src={book.cover_image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.writer}</Card.Text>
        <Card.Text>
          {book.tag && book.tag.split(',').map((tag, index) => (
            <React.Fragment key={index}>
              <Badge variant="primary" className="ml-3">
                {tag}
              </Badge>
              &nbsp;
            </React.Fragment>
          ))}
        </Card.Text>
        <Row>
          <Col xs={6} className="pt-2">
            <Card.Text>Point: <b> {book.point} </b></Card.Text>
          </Col>
          <Col xs={6} style={{ textAlign:'right' }}>
            <Button onClick={() => onOpenModalOrder(book)} variant="primary">Order</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};