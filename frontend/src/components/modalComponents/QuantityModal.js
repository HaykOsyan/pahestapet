import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function QuantityModal({ show, onHide, onQuantitySelected, maxQunatity }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuantitySelected(quantity);
    setQuantity(1);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity {quantity}</Form.Label>
            <Form.Control
              type="range"
              min="1"
              max={maxQunatity}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>
          <Button type="submit">Add to Order</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default QuantityModal;
