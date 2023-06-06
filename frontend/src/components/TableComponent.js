import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import MyPagination from "./MyPagination";

const TableComponent = ({
  ths,
  tds,
  funcEdit,        //edit function
  funcShow,
  funcDelete,
  funcAddToOrder,
  showButtonEdit,
  showButtonShow,
  showButtonDelete,
  showButtonAdd,
  count,
  limit,
  onActivePageChange // Callback function to handle active page change
}) => {
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTds = tds.filter((td) =>
    Object.values(td).some((value) => String(value).includes(searchQuery))
  );

  const handleActiveChange = (number) => {
    setActivePage(number);
    onActivePageChange(number); // Call the callback function with the updated value
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {ths.map((th, index) => (
              <th key={index}>{th}</th>
            ))}
            {showButtonEdit && <th>Edit</th>}
            {showButtonShow && <th>Show</th>}
            {showButtonDelete && <th>Delete</th>}
            {showButtonAdd && <th>Add to Order</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTds.map((td, index) => (
            <tr key={index}>
              {Object.values(td).map((value, index) => {
                if (value === "colors") {
                  return (
                    <td key={index}>
                      <div>Color Map Placeholder</div>
                    </td>
                  );
                } else if (Array.isArray(value)) {
                  return (
                    <td key={index}>
                      <ul>
                        {value.map((color, idx) => (
                          <li key={idx} style={{ color: color.name }}>
                            {color.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                  );
                } else if (typeof value === "object") {
                  return (
                    <td key={index}>
                      <ul>
                        {Object.entries(value).map(([key, val], idx) => (
                          <li key={idx}>
                            {key}: {val}
                          </li>
                        ))}
                      </ul>
                    </td>
                  );
                } else {
                  return <td key={index}>{value}</td>;
                }
              })}
              {showButtonEdit && (
                <td>
                  <Button onClick={() => funcEdit(td.id)} id={td.id}>edit</Button>
                </td>
              )}
              {showButtonShow && (
                <td>
                  <Button onClick={() => funcShow(td.id)} variant="success">
                    Show
                  </Button>
                </td>
              )}
              {showButtonDelete && (
                <td>
                  <Button onClick={() => funcDelete(td.id)} variant="danger">
                    Delete
                  </Button>
                </td>
              )}
              {showButtonAdd && (
                <td>
                  {/* UPGRADE arhestakan productID !!!!!!!!!!!!! */}
                  <Button
                    onClick={(e) => funcAddToOrder(e, td.id)}
                    id={td.id}
                    data-product_name={td.productName}
                    data-product_quantity={td.quantity}
                    data-product_price={td.productPrice}
                    variant="primary"
                  >
                    Add
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <MyPagination 
      onActiveChange={handleActiveChange} 
      count={count} 
      limit={limit} 
      active={activePage} // Pass the activePage state to the MyPagination component
      />
    </>
  );
};

export default TableComponent;