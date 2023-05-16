import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createBrand } from '../../http/productAPI';

const AddBrand = () => {
  const [brandName, setBrandName] = useState('');

  const handleSubmit = async () => {
    try {
      let data = await createBrand(brandName);
      setBrandName('');
      alert(data.brand.name + ' is added as a brand');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='adding-component'>
      <Form className='w-25'>
        <Form.Group controlId='brandName' className='p-3'>
          <Form.Label>Brand Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter brand name'
            value={brandName}
            onChange={(event) => setBrandName(event.target.value)}
          />
        </Form.Group>

        <Button
          variant='primary'
          type='button'
          className='m-3'
          onClick={handleSubmit}
        >
          Save Brand
        </Button>
      </Form>
    </div>
  );
};

export default AddBrand;
