import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Context } from "../../index";
import { toJS } from "mobx";
import { createProduct, fetchBrands, fetchCategories, fetchColors, fetchProducts } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const AddProduct = observer(() => {
  const { product } = useContext(Context);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await fetchProducts();
      const categoriesData = await fetchCategories();
      const brandsData = await fetchBrands();
      const colorsData = await fetchColors();

      product.setProducts(productData.rows);
      product.setCategories(categoriesData);
      product.setBrands(brandsData.brands);
      product.setColors(colorsData.colors);

      setHasFetchedData(true);
    };

    fetchData();
  }, [product]);

  // if (hasFetchedData) {
  //   console.log(toJS(product.brands));
  // }


  // const colors = ["red", "blue", "green", "yellow"];

  const handleColorCheckboxChange = (color, isChecked) => {
    if (isChecked) {
      setProductColorIds((prevColors) => [...prevColors, color.id]);
    } else {
      setProductColorIds((prevColors) => prevColors.filter((c) => c !== color.id));
    }
  };

  const [productName, setProductName] = useState("");
  const [productVolume, setProductVolume] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productCountry, setProductCountry] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRate, setProductRate] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productBrandId, setProductBrandId] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productColorIds, setProductColorIds] = useState([]);
  const [productImage, setProductImage] = useState();

  const saveProduct = async () => {
    if (
      productName === '' ||
      productVolume === '' ||
      productWeight === '' ||
      productCountry === '' ||
      productPrice === '' ||
      productRate === '' ||
      productQuantity === '' ||
      productCode === '' ||
      productCategoryId === '' ||
      productBrandId === '' ||
      // productTitle === '' ||
      // productDescription === '' ||
      productColorIds.length === 0 ||
      productImage === null
    ) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    let data;
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('volume', productVolume);
      formData.append('weight', productWeight);
      formData.append('country', productCountry);
      formData.append('price', productPrice);
      formData.append('rate', productRate);
      formData.append('quantity', productQuantity);
      formData.append('code', productCode);
      formData.append('categoryId', productCategoryId);
      formData.append('brandId', productBrandId);
      formData.append('title', productTitle);
      formData.append('description', productDescription);
      formData.append('colorIds', productColorIds);
      formData.append('img', productImage, productImage.name);
  
      data = await createProduct(formData);
      console.log(data);
  
      // Clear input fields and show success alert
      setProductName('');
      setProductVolume('');
      setProductWeight('');
      setProductCountry('');
      setProductPrice('');
      setProductRate('');
      setProductQuantity('');
      setProductCode('');
      setProductCategoryId('');
      setProductBrandId('');
      setProductTitle('');
      setProductDescription('');
      setProductColorIds([]);
      setProductImage(null);
      alert('Product added to the database!');
    } catch (err) {
      console.log(err);
    }
  };
  


  return (
    <Form className="row m-3">
      <Form.Group className="col-md-4 mb-3" controlId="formProductName">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product name"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          please type here full name of the product
        </Form.Text>
      </Form.Group>
      {/* Volume: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductVolume">
        <Form.Label>Product volume</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          placeholder="Enter Product volume"
          value={productVolume}
          onChange={(e) => {
            setProductVolume(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter the volume of the product in mililiters (ml).
        </Form.Text>
      </Form.Group>

      {/* Weight: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductWeight">
        <Form.Label>Product weight</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          placeholder="Enter Product weight"
          value={productWeight}
          onChange={(e) => {
            setProductWeight(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter the weight of the product in kilograms (kg).
        </Form.Text>
      </Form.Group>

      {/* Country: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductCountry">
        <Form.Label>Product country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product country"
          value={productCountry}
          onChange={(e) => {
            setProductCountry(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter the country of origin for the product.
        </Form.Text>
      </Form.Group>

      {/* Price: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductPrice">
        <Form.Label>Product price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          placeholder="Enter Product price"
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter the price of the product in USD.
        </Form.Text>
      </Form.Group>

      {/* Rate: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductRate">
        <Form.Label>Product rate</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          placeholder="Enter Product rate"
          value={productRate}
          onChange={(e) => {
            setProductRate(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter the rate of the product in stars (out of 5).
        </Form.Text>
      </Form.Group>

      {/* Quantity: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductQuantity">
        <Form.Label>Product quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Product quantity"
          value={productQuantity}
          onChange={(e) => {
            setProductQuantity(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter the quantity of the product in stock.
        </Form.Text>
      </Form.Group>

      {/* Code: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductCode">
        <Form.Label>Product code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product code"
          value={productCode}
          onChange={(e) => {
            setProductCode(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter the unique product code or SKU.
        </Form.Text>
      </Form.Group>

      {/* Category ID: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductCategory">
        <Form.Label>Product category</Form.Label>
        <Form.Control
          as="select"
          value={productCategoryId}
          onChange={(e) => {
            setProductCategoryId(e.target.value);
            // setProductCategoryName(e.target.options[e.target.selectedIndex].text);
          }}
        >
          <option>Select category</option>
          {toJS(product.categories).map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
        <Form.Text className="text-muted">
          Please select the category for the product.
        </Form.Text>
      </Form.Group>

      {/* Brand ID: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductBrand">
        <Form.Label>Product brand</Form.Label>
        <Form.Control
          as="select"
          value={productBrandId}
          onChange={(e) => {
            setProductBrandId(e.target.value);
          }}
        >
          <option>Select brand</option>
          {toJS(product.brands).map((brand) => (
            <option value={brand.id} key={brand.id}>
              {brand.name}
            </option>
          ))}
        </Form.Control>
        <Form.Text className="text-muted">
          Please select the brand for the product.
        </Form.Text>
      </Form.Group>

      {/* Title: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductTitle">
        <Form.Label>Product title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product title"
          value={productTitle}
          onChange={(e) => {
            setProductTitle(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter the title or name
        </Form.Text>
      </Form.Group>

      {/* Description: */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductDescription">
        <Form.Label>Product description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter Product description"
          value={productDescription}
          onChange={(e) => {
            setProductDescription(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Please enter a description for the product.
        </Form.Text>
      </Form.Group>

      {/* Image */}
      <Form.Group className="col-md-4 mb-3" controlId="formProductImage">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => {
            setProductImage(e.target.files[0]);
          }}
        />
        <Form.Text className="text-muted">
          Choose images for Paroduct in format .jpg,.jpeg,.png
        </Form.Text>
      </Form.Group>
      {/* Color IDs: */}
      <Form.Group className="col-md-12 mb-3" controlId="formProductColorIDs">
        <Form.Label>Product color IDs</Form.Label>
        {/* toJS hanel durs */}
        {toJS(product.colors).map((color) => (
          <Form.Check
            key={color.id} // Set key to id of the color object
            inline
            label={color.name} // Set label to name of the color object
            name="group1"
            type="checkbox"
            id={`checkbox-${color.id}`} // Set id to id of the color object
            checked={productColorIds.includes(color.id)}
            onChange={(e) => handleColorCheckboxChange(color, e.target.checked)}
            style={{ color: color.name }} // Set style color to name of the color object
          />
        ))}
        <Form.Text className="text-muted">
          Please enter the IDs for the product's available colors.
        </Form.Text>
      </Form.Group>


      <Button
        className="col-md-3"
        variant="primary"
        type="button"
        // onClick={() => { 
        //   let data;
        //  }}
        onClick={saveProduct}
      >
        Add Product
      </Button>
    </Form>
  );
});

export default AddProduct;
