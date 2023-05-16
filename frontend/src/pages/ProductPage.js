import React, { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { createCartProduct, fetchOneProduct } from "../http/productAPI";
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
  
  const handleAddToCart = async () => {
    if(cartId){
      try {
        const response = await createCartProduct(cartId, [product.id], [quantity]);
        console.log(response); // do something with the response data
      } catch (error) {
        console.log(error);
      }
    }else{
      alert('Please choose your client')
    }
  };

  const fetchData = async (id) => {
    try {
      const { clients } = await fetchClients();
      const oneProduct = await fetchOneProduct(id);
      setClients(clients);
      setProduct(oneProduct.data);
    } catch (error) {
      setError("Error fetching order details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(id);
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <SelectComponent
        select="Client"
        data={clients}
        funcSelect={(e) => setCartId(e.target.selectedOptions[0].dataset.id)}
      />
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={process.env.REACT_APP_API_URL + product.img}
        />
        <Card.Body>
          <Card.Title className="text-center">{product.name}</Card.Title>
          <Card.Text>
            <ListGroup.Item>{product.brand}</ListGroup.Item>
            <ListGroup.Item>{product.category}</ListGroup.Item>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Price {product.price}</ListGroup.Item>
          <ListGroup.Item>in Stock {product.quantity}</ListGroup.Item>
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
        </ListGroup>
        <Card.Body>
          <Form>
            <Form.Label>Quantity {quantity}</Form.Label>
            <Form.Range min={1} max={product.quantity}  defaultValue={1} onChange={(e) => setQuantity(e.target.value)}/>
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductPage;
