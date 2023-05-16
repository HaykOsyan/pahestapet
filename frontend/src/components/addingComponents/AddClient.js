import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createClient } from '../../http/clientAPI';

const AddClient = () => {
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientType, setClientType] = useState('');

    const handleSubmit = async () => {
        try {
            let data = await createClient(clientName, clientPhone, clientType);
            setClientName('');
            setClientPhone('');
            setClientType('');
            alert(data.client.name + ' is added as a client');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='adding-component'>
            <Form className='w-25'>
                <Form.Group controlId='clientName' className='p-3'>
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter client name'
                        value={clientName}
                        onChange={(event) => setClientName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='clientPhone' className='p-3'>
                    <Form.Label>Client Phone</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter client phone'
                        value={clientPhone}
                        onChange={(event) => setClientPhone(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='clientType' className='p-3'>
                    <Form.Label>Client Type</Form.Label>
                    <Form.Control
                        as='select'
                        value={clientType}
                        onChange={(event) => setClientType(event.target.value)}
                    >
                        <option value=''>Select type</option>
                        <option value='individual'>Individual</option>
                        <option value='corporate'>Corporate</option>
                    </Form.Control>
                </Form.Group>
                <Button
                    variant='primary'
                    type='button'
                    className='m-3'
                    onClick={handleSubmit}
                >
                    Save Client
                </Button>
            </Form>
        </div>
    );
};

export default AddClient;