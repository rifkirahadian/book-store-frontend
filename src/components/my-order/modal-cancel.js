import { cancelOrder } from "@/services/api";
import { getUser } from "@/services/localstorage";
import { Button, Form, Modal } from "react-bootstrap";

export const ModalCancel = ({ handleClose, modalCancel }) => {
  const user = getUser();

  const onCancel = async (event)  => {
    event.preventDefault();
    const { isError, error } = await cancelOrder(modalCancel.id);

    if (isError) {
      alert(error);
      return;
    }

    alert('Order cancelled');

    window.location.reload()
  };

  return (
    <Modal show={modalCancel.show} onHide={handleClose}>
      <Form onSubmit={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span> Are you sure want to cancel this order? </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Ok
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};