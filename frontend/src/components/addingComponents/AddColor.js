import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createColor } from '../../http/productAPI';

const AddColor = () => {
  const [colorName, setColorName] = useState('');

  const handleSubmit = async () => {
    try {
      let data = await createColor(colorName);
      setColorName('');
      alert(data.color.name + ' is added as a color');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='adding-component'>
      <Form className='w-25'>
        <Form.Group controlId='colorName' className='p-3'>
          <Form.Label>Color Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter color name'
            value={colorName}
            onChange={(event) => setColorName(event.target.value)}
          />
        </Form.Group>

        <Button
          variant='primary'
          type='button'
          className='m-3'
          onClick={handleSubmit}
        >
          Save Color
        </Button>
      </Form>
    </div>
  );
};

export default AddColor;