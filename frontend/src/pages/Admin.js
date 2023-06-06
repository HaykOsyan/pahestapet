import React, { useCallback, useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import CategoryAndBrand from "../components/CategoryAndBrand";
import {
  fetchProducts,
  fetchCarts,
  fetchOrders,
  fetchOrderProducts,
  fetchCartProducts,
  fetchCategories,
  fetchBrands,
} from "../http/productAPI";
import { fetchClients } from "../http/clientAPI";

const Admin = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("products");
  const [tds, setTds] = useState([]);
  const [ths, setThs] = useState([]);
  const [funcShow, setFuncShow] = useState(() => () => console.log("SHOW"));
  const [funcEdit, setFuncEdit] = useState(() => (id) => console.log(id));
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [count, setCount] = useState(100);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCategoryAndBrandChange = useCallback((selectedCategory, selectedBrand) => {
    setCategoryId(selectedCategory?.id || null);
    setBrandId(selectedBrand?.id || null);
    setActivePage(1);
  }, []);

  const handleActivePageChange = (number) => {
    setActivePage(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      let result, data, showFunc;
      try {
        if (key === "products") {
          showFunc = (id) => {
            navigate(`/product/${id}`);
          };
          result = await fetchProducts(categoryId, brandId, limit, activePage);
          let resultForCount = await fetchProducts(categoryId, brandId);
          data = result.rows.map((item) => ({
            ...item,
            category: item.category.name,
            brand: item.brand.name,
            info: item.info.title,
          }));
          const fetchedCategories = await fetchCategories();
          const fetchedBrands = await fetchBrands();
          setCategories(fetchedCategories);
          setBrands(fetchedBrands.brands);
          setCount(resultForCount.rows.length);
        } else if (key === "clients") {
          result = await fetchClients();
          data = result.clients;
        } else if (key === "carts") {
          showFunc = (id) => {
            navigate(`/cart/${id}`);
          };
          result = await fetchCarts();
          data = result.carts;
        } else if (key === "orders") {
          showFunc = (id) => {
            navigate(`/order/${id}`);
          };
          result = await fetchOrders();
          data = result.orders;
        } else if (key === "orderProducts") {
          result = await fetchOrderProducts();
          data = result.orders;
        } else if (key === "cartProducts") {
          result = await fetchCartProducts();
          data = result;
        }
        setFuncShow(() => showFunc);
        setTds(data);
        setThs(Object.keys(data[0] || {}));
        setErrorMessage(null); // Reset error message if successful
      } catch (error) {
        setErrorMessage('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, [key, navigate, categoryId, brandId, activePage]);

  return (
    <div>
      {key === "products" && (
        <CategoryAndBrand categories={categories} brands={brands} onChange={handleCategoryAndBrandChange} />
      )}
      {errorMessage && <div>{errorMessage}</div>}
      {tds.length > 0 ? (
        <Tabs
          id="controlled-tab"
          activeKey={key}
          onSelect={(k) => {
            setKey(k);
          }}
          className="mb-3"
        >
          <Tab eventKey="products" title="Products">
            <TableComponent
              ths={ths}
              tds={tds}
              showButtonShow={true}
              funcShow={funcShow}
              showButtonEdit={true}
              funcEdit={funcEdit}
              count={count}
              limit={limit}
              onActivePageChange={handleActivePageChange}
            />
          </Tab>
          <Tab eventKey="clients" title="Clients">
            <TableComponent ths={ths} tds={tds} />
          </Tab>
          <Tab eventKey="carts" title="Carts">
            <TableComponent ths={ths} tds={tds} showButtonShow={true} funcShow={funcShow} />
          </Tab>
          <Tab eventKey="orders" title="Orders">
            <TableComponent ths={ths} tds={tds} showButtonShow={true} funcShow={funcShow} />
          </Tab>
          <Tab eventKey="orderProducts" title="OrderProducts">
            <TableComponent ths={ths} tds={tds} />
          </Tab>
          <Tab eventKey="cartProducts" title="CartProducts">
            <TableComponent ths={ths} tds={tds} />
          </Tab>
        </Tabs>
      ) : (
        <div>There is no data.</div>
      )}
    </div>
  );
};

export default Admin;
