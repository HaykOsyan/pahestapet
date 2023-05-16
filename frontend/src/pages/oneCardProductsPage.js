import React, { useState } from 'react';
import { fetchOneCartProducts } from '../api/cartProducts';
import { Form, Button } from 'react-bootstrap';

const OneCardProductsPage = () => {
  const [cartId, setCartId] = useState('');

  const handleFetchCartProducts = async () => {
    try {
      const response = await fetchOneCartProducts(cartId);
      console.log(response.data); // or update the state with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formCartId">
        <Form.Label>Enter Cart ID</Form.Label>
        <Form.Control type="text" placeholder="Cart ID" value={cartId} onChange={(event) => setCartId(event.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleFetchCartProducts}>
        Fetch Cart Products
      </Button>
    </Form>
  );
};

export default OneCardProductsPage;