import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";
import { fetchOneOrder } from "../http/productAPI";
import { useParams } from "react-router-dom";

const Order = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ths, setThs] = useState([]);
  const [tds, setTds] = useState([]);

  const fetchData = async (id) => {
    try {
      const oneOrder = await fetchOneOrder(id);
      setTds(oneOrder.data);
      setThs(Object.keys(oneOrder.data[0]));
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
      <TableComponent ths={ths} tds={tds} />
    </>
  );
};

export default Order;
