import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { createCartProduct, fetchOneCategory, fetchOneProduct, fetchOneBrand } from "../http/productAPI";
import SelectComponent from "../components/SelectComponent";
import { fetchClients } from "../http/clientAPI";

const ProductPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState();
  const [clients, setClients] = useState();
  const [cartId, setCartId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [priceForClient, setPriceForClient] = useState(null);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [editPrice, setEditPrice] = useState(false);

  const handleEditPrice = () => {
    setEditPrice(true);
  }

  const handlePriceChange = (e) => {
    setPriceForClient(e.target.value);
  };

  const handleAddToCart = async () => {
    if (cartId) {
      try {
        // may change from backend onther data, now only quantity
        const response = await createCartProduct(cartId, [product.id], [quantity], [priceForClient]);
        setMaxQuantity(response)
        console.log(response); // do something with the response data
        setQuantity(1);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please choose your client')
    }
  };

  const fetchData = async (id) => {
    try {
      const { clients } = await fetchClients();
      const oneProduct = await fetchOneProduct(id);
      const productCategory = await fetchOneCategory(oneProduct.data.categoryId);
      const productBrand = await fetchOneBrand(oneProduct.data.brandId);
      setBrand(productBrand.brand.name);
      setCategory(productCategory.name);
      setClients(clients);
      setProduct(oneProduct.data);
      setPriceForClient(oneProduct.data.price);
      setMaxQuantity(oneProduct.data.quantity);
    } catch (error) {
      console.log(error)
      setError("Error fetching order details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(id);
  }, [id]);

  // useEffect(() => {
  //   setMaxQuantity(product.quantity);
  // }, [product.quantity])
  console.log(maxQuantity)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  console.log(priceForClient)
  return (
    <>
      <SelectComponent
        select="Client"
        data={clients}
        funcSelect={(e) => setCartId(e.target.selectedOptions[0].dataset.id)}
      />
      <Card className="d-flex" style={{ width: "50%" }}>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={process.env.REACT_APP_API_URL + product.img}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="text-center">{product.name}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <label>Price</label>
                  <Form.Control 
                  className="w-50" 
                  type="text" 
                  value={priceForClient} 
                  onChange={handlePriceChange}
                  readOnly={!editPrice} 
                  />
                  <Button onClick={handleEditPrice}>
                    ClientPrice
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>in Stock {maxQuantity}</ListGroup.Item>
                <ListGroup.Item>Made in {product.country}</ListGroup.Item>
                {/* Rating HAYK poxel stars */}
                <ListGroup.Item>Rating {product.rate}</ListGroup.Item>
                <ListGroup.Item>Code {product.code}</ListGroup.Item>
                {product.volume && (
                  <ListGroup.Item>Volume {product.volume} ml</ListGroup.Item>
                )}
                {product.weight && (
                  <ListGroup.Item>Weight {product.weight} gr</ListGroup.Item>
                )}
                <ListGroup.Item>Բրենդ    {brand}</ListGroup.Item>
                <ListGroup.Item>Բաժին    {category}</ListGroup.Item>
              </ListGroup>
              <Form>
                <Form.Label>Quantity {quantity}</Form.Label>
                <Form.Range min={1} max={maxQuantity} defaultValue={1} onChange={(e) => setQuantity(e.target.value)} />
                <Button onClick={handleAddToCart}>Add to cart</Button>
              </Form>
            </Card.Body>

          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductPage;
