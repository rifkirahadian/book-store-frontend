const { Button, Col, Card, Row, Image } = require("react-bootstrap");

export const CardOrder = ({ item, setModalCancel }) => {
  return (
    <Card className="mt-2 py-3 px-3">
      <Row>
        <Col lg={2}>
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image
              alt={item.book.title}
              src={item.book.cover_image}
              layout='fill'
              objectFit='contain'
              height={'150px'}
            />
          </div>
        </Col>
        <Col lg={3}>
          <h6>{item.book.title}</h6>
          <p>
            <span>{item.book.writer}</span>
          </p>
          <span>Point {item.point}</span>
        </Col>
        <Col lg={3} className="d-flex align-items-center justify-content-center">
          <h6>{item.createdAt}</h6>
        </Col>
        <Col lg={2} className="d-flex align-items-center justify-content-center">
          <h6>{item.status}</h6>
        </Col>
        <Col lg={2} className="d-flex align-items-center justify-content-end">
          {item.status === 'pending' && (
            <Button variant="danger" onClick={() => setModalCancel({
              show: true,
              id: item.id,
            })}>Cancel</Button>
          )}
        </Col>
      </Row>
    </Card>
  )
};
