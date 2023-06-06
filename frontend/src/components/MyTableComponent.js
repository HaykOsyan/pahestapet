import React from 'react';
import { Button } from 'react-bootstrap';

const MyTableComponent = ({ products, onRemoveItem }) => {
  const handleRemoveItem = (id) => {
    onRemoveItem(id);
  };

  return (
    <div className='bg-primary border d-flex w-25 m-auto'>
      <div className='m-3 p-2'>
        {products.map((product) => (
          <div className='bg-warning border' key={product.id}>
            {product.name}
            <Button onClick={() => handleRemoveItem(product.id)}>Delete</Button>
          </div>
        ))}
      </div>
      <div className='m-3 p-2'>
        {products.map((product) => (
          <div key={product.id}>{product.quantity}---------{product.price}</div>
        ))}
      </div>
    </div>
  );
};

export default MyTableComponent;
