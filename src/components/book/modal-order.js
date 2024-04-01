import { createOrder } from "@/services/api";
import { getUser, setUser } from "@/services/localstorage";
import Image from "next/image";
import { Button, Col, Form, ListGroup, Modal, Row } from "react-bootstrap";

export const ModalOrder = ({ handleClose, modalOrder }) => {
  const user = getUser();

  const reducePoint = () => {
    if (user) {
      const { point } = user;
      setUser({
        ...user,
        point: point - modalOrder.point,
      });
    }
  }

  const onOrder = async (event)  => {
    event.preventDefault();
    if (user?.point < modalOrder.point) {
      alert('Your point is not enough');
      return;
    }

    const { isError, error } = await createOrder({
      bookId: modalOrder.id,
      name: user?.name,
      email: user?.email
    });

    if (isError) {
      alert(error);
      return;
    }

    reducePoint();

    alert('Order created');

    window.location.reload()
  };

  return (
    <Modal show={modalOrder.show} onHide={handleClose}>
      <Form onSubmit={onOrder}>
        <Modal.Header closeButton>
          <Modal.Title>Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={3}>
              {modalOrder.cover_image && (
                <div style={{width: '100%', height: '100%', position: 'relative'}}>
                  <Image
                    alt='Mountains'
                    src={modalOrder.cover_image}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              )}
              
            </Col>
            <Col lg={9}>
            <ListGroup variant="flush">
              <ListGroup.Item>{modalOrder.title}</ListGroup.Item>
              <ListGroup.Item>{modalOrder.writer}</ListGroup.Item>
              <ListGroup.Item>Point: <b>{modalOrder.point}</b> </ListGroup.Item>
            </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Order
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};