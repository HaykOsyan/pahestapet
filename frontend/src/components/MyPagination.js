import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const MyPagination = ({ count, limit, onActiveChange }) => {
  const [active, setActive] = useState(1);

  const handleActiveChange = (number) => {
    setActive(number);
    onActiveChange(number); // Call the callback function with the updated value
  };

  let items = [];
  for (let number = 1; number <= Math.ceil(count / limit); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={active === number}
        onClick={() => handleActiveChange(number)}
      >
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
