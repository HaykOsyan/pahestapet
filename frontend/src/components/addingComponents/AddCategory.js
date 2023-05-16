import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createCategory } from '../../http/productAPI';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async () => {

        try {
            let data = await createCategory(categoryName)
            setCategoryName('');
            alert(data.category.name + 'is added as Category')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='adding-component'>
            <Form className='w-25'>
                <Form.Group controlId="categoryName" className='p-3'>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="button"
                    className='m-3'
                    onClick={handleSubmit}
                >
                    Save Category
                </Button>
            </Form>
        </div>
    );
};

export default AddCategory;