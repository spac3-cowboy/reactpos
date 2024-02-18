import { List } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const PurchaseList = ({ data }) => {
  return (
    <div>
      <h5 className="text-center m-4">Invoice Product List :</h5>
      <List
        bordered
        style={{ marginTop: "20px" }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={
                <Link to={`/admin/product/${item.product.id}`}>
                  {item.product.name}
                </Link>
              }
            />
            <div>
              <p>
                {" "}
                Purchase Price : <strong>{item.productPurchasePrice} </strong>
              </p>
              <p>
                {" "}
                Purchase Quantity : <strong>{item.productQuantity} </strong>
              </p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PurchaseList;
