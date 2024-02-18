import { Card, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const SaleProductListCard = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Product Sale Price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
    },
    {
      title: "Total Price ",
      key: "Total Price ",
      dataIndex: "",
      render: ({ productQuantity, productSalePrice }) =>
        productSalePrice * productQuantity,
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div className='mt-2'>
      <Card
        className='header-solid h-full'
        bordered={false}
        title={
          <h6 className='font-semibold m-0 text-center'>
            Sale Products Information
          </h6>
        }
        bodyStyle={{ paddingTop: "0" }}
      >
        <div className='col-info'>
          <Table
            key={list.id}
            scroll={{ x: true }}
            loading={!list}
            columns={columns}
            dataSource={list ? addKeys(list) : []}
          />
        </div>
      </Card>
    </div>
  );
};

export default SaleProductListCard;
