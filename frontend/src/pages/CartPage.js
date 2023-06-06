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
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [selectedProductPrice, setSelectedProductPrice] = useState(null);
  const [maxQuantity, setMaxQantity] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);

  const handleCreateOrder = async () => {
    let cartId = id;
    try {
      const productIds = products.map((product) => product.id);
      const quantities = products.map((product) => product.quantity);
      const prices = products.map((product) => product.price);
      const order = await createOrder(cartId, productIds, quantities, prices);
      console.log(order);
      alert(`Order created with ID: ${order.id}`);
      // Clear the cart after successful order creation
      setProducts([]);
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
    fetchData(id);
    setButtonActive(products.length > 0);
  }, [id, products]);

  useEffect(() => {
    const openModal = (e, productId) => {
      setSelectedProductName(e.target.dataset.product_name)
      setMaxQantity(e.target.dataset.product_quantity)
      setSelectedProductPrice(e.target.dataset.product_price)
      setSelectedProductId(productId);
      setShowModal(true);
    };

    const total = tds.reduce((sum, td) => {
      return sum + td.sum;
    }, 0);

    setTotalAmount(total);
    setFuncAddToOrder(() => openModal);
  }, [tds]);

  const addToOrder = (quantity) => {
    console.log(`Adding ${quantity} hat ${selectedProductId} to order`);

    const existingProductIndex = products.findIndex((product) => product.id === selectedProductId);

    if (existingProductIndex !== -1) {
      // Update the quantity of the existing product
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity =parseInt(updatedProducts[existingProductIndex].quantity) + parseInt(quantity);

      setProducts(updatedProducts);
    } else {
      // Create a new product object with the selected product information
      const newProduct = {
        id: selectedProductId,
        name: selectedProductName,
        price: selectedProductPrice,
        quantity: quantity
      };

      // Update the state by appending the new product to the products array
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }

    setShowModal(false);
  };

  // DELETE// The function gets id (or index) of selected orders row and delets it
  const onRemoveItem = (id) => {
    setProducts((prevProducts) => {
      const index = prevProducts.findIndex((product) => product.id === id);
      if (index !== -1) {
        const newProducts = [...prevProducts];
        newProducts.splice(index, 1);
        return newProducts;
      }
      return prevProducts;
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
      <MyTableComponent products={products} onRemoveItem={onRemoveItem} />
      <Button variant="success" onClick={handleCreateOrder} disabled={!buttonActive}>
        Create Order
      </Button>
      <Button>
        Total is {totalAmount}
      </Button>
    </>
  );
};

export default CartPage;
