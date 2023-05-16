import React from "react";
import { Button } from "react-bootstrap";

function ButtonComponent({ onClick, children, id, variant = "primary" }) {
  return (
    <Button onClick={onClick} {...(id && { id })} variant={variant}>
      {children}
    </Button>
  );
}

export default ButtonComponent;