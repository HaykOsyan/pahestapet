import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddProduct from '../components/addingComponents/AddProduct';
import AddBrand from '../components/addingComponents/AddBrand';
import AddCategory from '../components/addingComponents/AddCategory';
import AddClient from '../components/addingComponents/AddClient';
import AddColor from '../components/addingComponents/AddColor';

const AddingPage = () => {
    const [key, setKey] = useState('product')

    return (
        <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="product" title="Product">
                <AddProduct />
            </Tab>
            <Tab eventKey="category" title="Category">
                <AddCategory />
            </Tab>
            <Tab eventKey="brand" title="Brand">
                <AddBrand />
            </Tab>
            <Tab eventKey="color" title="Color">
                <AddColor />
            </Tab>
            <Tab eventKey="client" title="Client">
                <AddClient />
            </Tab>
        </Tabs>
    );
};

export default AddingPage;