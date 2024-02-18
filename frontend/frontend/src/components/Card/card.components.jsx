import { Card } from "antd";
import React from "react";

const CardComponent = ({ title, children }) => {
  return (
    <Card
      title={title}
      style={{
        minwidth: 500,
      }}>
      {children}
    </Card>
  );
};

export default CardComponent;
