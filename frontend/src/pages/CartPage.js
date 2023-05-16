import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createOrder, fetchOneCart } from '../http/productAPI';
import TableComponent from '../components/TableComponent';
import QuantityModal from '../components/modalComponents/QuantityModal';
import { Button } from 'react-bootstrap';
import MyTableComponent from '../components/MyTableComponent';

const CartPage = () => {
    const { id } = useParams();
    const [tds, setTds] = useState([]);
    const [ths, setThs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [funcAddToOrder, setFuncAddToOrder] = useState(() => {
        console.log('EDIT');
    });
    const [productIds, setProductIds] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductName, setSelectedProductName] = useState(null);
    const [maxQuantity, setMaxQantity] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);

    const handleCreateOrder = async () => {
        let cartId = id;
        try {
            const order = await createOrder(cartId, productIds, quantities);
            alert(`Order created with ID: ${order.id}`);
            // Clear the cart after successful order creation
            setProductIds([]);
            setQuantities([]);
        } catch (error) {
            console.log(error);
            alert('Failed to create order. Please try again later.');
        }
    };

    const fetchData = async (id) => {
        try {
            const data = await fetchOneCart(id);
            setTds(data);
            setThs(Object.keys(data[0]));

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const openModal = (e, productId) => {
            setSelectedProductName(e.target.dataset.product_name)
            setMaxQantity(e.target.dataset.product_quantity)
            setSelectedProductId(productId);
            setShowModal(true);
        };
        const total = tds.reduce((sum, td) => {
            return sum + td.sum;
        }, 0);
        setTotalAmount(total)
        fetchData(id);
        setFuncAddToOrder(() => openModal);
    }, [id, tds]);

    const addToOrder = (quantity) => {
        console.log(`Adding ${quantity} hat ${selectedProductId} to order`);
        setProductNames((prevIdsProductNames) => [...prevIdsProductNames, selectedProductName]);
        setProductIds((prevIds) => [...prevIds, selectedProductId]);
        setQuantities((prevQuantities) => [...prevQuantities, quantity]);
        setShowModal(false);
    };

    // The function gets id (or index) of selected orders row and delets it
    const onRemoveItem = (index) => {
        setProductNames((prevNames) => {
            const newNames = [...prevNames];
            newNames.splice(index, 1);
            return newNames;
        });
        setProductIds((prevIds) => {
            const newIds = [...prevIds];
            newIds.splice(index, 1);
            return newIds;
        });
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities.splice(index, 1);
            return newQuantities;
        });
    };

    return (
        <>
            <TableComponent
                tds={tds}
                ths={ths}
                showButtonAdd={true}
                funcAddToOrder={funcAddToOrder}
            />
            <QuantityModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onQuantitySelected={addToOrder}
                maxQunatity={maxQuantity}
            />
            <MyTableComponent productNames={productNames} quantities={quantities} onRemoveItem={onRemoveItem} />
            <Button variant="success" onClick={handleCreateOrder}>
                Create Order
            </Button>
            <Button>
                Total is {totalAmount}
            </Button>
        </>
    );
};

export default CartPage;
