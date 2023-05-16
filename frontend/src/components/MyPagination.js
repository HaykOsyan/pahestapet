import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const MyPagination = ({ count }) => {
  const [active, setActive] =useState(1)
  let items = [];
  for (let number = 1; number <= Math.ceil(count/10); number++) {
    items.push(
      <Pagination.Item key={number} active={active === number} onClick={() => setActive(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination>{items}</Pagination>
    </>
  );
};

export default MyPagination;
