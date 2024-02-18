import { Card, Col, InputNumber, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ViewBtn from "../../Buttons/ViewBtn";

const PurchaseProductListCard = ({ list, updateReturn, returnOnChange }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Name",
      dataIndex: "product",
      key: "product.name",
      render: (product) => (
        <Link to={`/admin/product/${product.id}`}>{product.name}</Link>
      ),
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Product Unit Price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
    },
    {
      title: "Total Price ",
      key: "Total Price ",
      dataIndex: "",
      render: ({
        productQuantity,
        productPurchasePrice,
        remainQuantity,
        return_quantity,
      }) => {
        if (return_quantity) {
          return remainQuantity * productPurchasePrice;
        } else {
          return productPurchasePrice * productQuantity;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: ({ id }) => <ViewBtn path={`/admin/product/${id}`} />,
    },
  ];

  if (updateReturn) {
    columns.splice(4, 0, {
      title: "Return Quantity",
      dataIndex: "return_quantity",
      key: "return_quantity",
      width: "150px",
      render: (
        value,
        { productId, productQuantity, productPurchasePrice: price }
      ) => {
        return (
          <div>
            <InputNumber
              onChange={(value) =>
                returnOnChange({ id: productId, value, price })
              }
              style={{ width: "120px" }}
              placeholder='Return Qty'
              max={productQuantity}
              min={0}
              value={value}
            />
          </div>
        );
      },
    });
  }

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className='mt-2'>
        <Card
          className='header-solid h-full'
          bordered={false}
          title={[
            <h6 className='font-semibold m-0 text-center'>
              Purchase Product Information
            </h6>,
          ]}
          bodyStyle={{ paddingTop: "0" }}
        >
          <div className='col-info'>
            <Table
              scroll={{ x: true }}
              loading={!list}
              columns={columns}
              dataSource={list ? addKeys(list) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default PurchaseProductListCard;
