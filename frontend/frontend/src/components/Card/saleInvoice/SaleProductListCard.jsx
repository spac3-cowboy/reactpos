import { Card, Col, InputNumber, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ViewBtn from "../../Buttons/ViewBtn";

const SaleProductListCard = ({ list, updateReturn, returnOnChange }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Name",
      dataIndex: "product",
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
      title: "Product  Unit Price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
    },
    {
      title: "Total Price ",
      key: "Total Price ",
      dataIndex: "",
      render: ({
        productQuantity,
        productSalePrice,
        remainQuantity,
        returnQuantity,
      }) => {
        if (returnQuantity) {
          return remainQuantity * productSalePrice;
        } else {
          return productSalePrice * productQuantity;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: ({ productId }) => (
        <ViewBtn path={`/admin/product/${productId}`} />
      ),
    },
  ];

  if (updateReturn) {
    // columns.splice(3, 0, {
    //   title: "Remain Quantity",
    //   dataIndex: "remainQuantity",
    //   key: "remainQuantity",
    //   width: "120px",
    // });
    columns.splice(4, 0, {
      title: "Return Quantity",
      dataIndex: "returnQuantity",
      key: "returnQuantity",
      width: "150px",
      render: (
        value,
        { productId, productQuantity, productSalePrice: price }
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
            <h4 className='font-semibold text-xl m-0 text-center'>
              Products Information
            </h4>,
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

export default SaleProductListCard;
