import React from "react";
import { Form } from "react-bootstrap";

const SelectComponent = ({ select, data, funcSelect }) => {
  return (
    <>
      <Form.Select onChange={funcSelect}>
        <option>Select {select}</option>
        {data.map((item) => (
          <option key={item.id} data-id={item.id}>{item.name}</option>
        ))}
      </Form.Select>
    </>
  );
};

export default SelectComponent;
