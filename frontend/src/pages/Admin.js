import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { fetchProducts, fetchCarts, fetchOrders, fetchOrderProducts, fetchCartProducts } from "../http/productAPI";
import TableComponent from "../components/TableComponent";
import { useNavigate } from "react-router-dom";
import { fetchClients } from "../http/clientAPI";

const Admin = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("products");
  const [tds, setTds] = useState([]);
  const [ths, setThs] = useState([]);
  const [funcShow, setFuncShow] = useState(() => { console.log('SHOW') })
  const [funcEdit, setFuncEdit] = useState(() => { console.log('EDIT') })

  useEffect(() => {
    const fetchData = async () => {
      let result, data, showFunc, editFunc;
      if (key === "products") {
        showFunc = (id) => {
          navigate(`/product/${id}`);
        };
        editFunc = (id) => {
          console.log(id)
        };
        result = await fetchProducts();
        data = result.rows.map((item) => ({
          ...item,
          category: item.category.name,
          brand: item.brand.name,
          info: item.info.title,
        }));
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
      setFuncEdit(() => editFunc);
      setTds(data);
      setThs(Object.keys(data[0]));
    };
    fetchData();
  }, [key, navigate]);

  if (tds.length > 0) {
    return (
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
        }}
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <TableComponent ths={ths} tds={tds} showButtonShow={true} funcShow={funcShow} showButtonEdit={true} funcEdit={funcEdit} />
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
    );
  }
};

export default Admin;