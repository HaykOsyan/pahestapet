import React from 'react';
import { Button } from 'react-bootstrap';

const MyTableComponent = ({ productNames, quantities, onRemoveItem }) => {
    const handleRemoveItem = (index) => {
        onRemoveItem(index);
    };

    return (
        <div className='bg-primary border d-flex w-25 m-auto'>
            <div className='m-3 p-2'>
                {[...productNames].map((productName, index) => (
                    <div className='bg-warning border' key={index}>
                        {productName}
                        <Button onClick={() => handleRemoveItem(index)}>Delete</Button>
                    </div>
                ))}
            </div>
            <div className='m-3 p-2'>
                {[...quantities].map((quantity, index) => (
                    <div key={index}>{quantity}</div>
                ))}
            </div>
        </div>
    );
};

export default MyTableComponent;
