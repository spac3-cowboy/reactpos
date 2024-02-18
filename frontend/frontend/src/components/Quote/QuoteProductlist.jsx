import { Card, Col,  Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ViewBtn from "../Buttons/ViewBtn";
import moment from "moment";

const QuoteProductList = ({ quoteProduct }) => {
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
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      key: "action",
      render: ({ id }) => <ViewBtn path={`/admin/product/${id}`} />,
    },
  ];



  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className="mt-2">
        <Card
          className="header-solid h-full"
          bordered={false}
          title={[
            <h6 className="font-semibold m-0 text-center">
              Quote Product List
            </h6>,
          ]}
          bodyStyle={{ paddingTop: "0" }}
        >
          <div className="col-info">
            <Table
              scroll={{ x: true }}
              loading={!quoteProduct}
              columns={columns}
              dataSource={quoteProduct ? addKeys(quoteProduct) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default QuoteProductList;
