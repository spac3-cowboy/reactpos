import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const SupplierReturnInvoiceList = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Purchase Invoice No",
      dataIndex: "purchaseInvoiceId",
      key: "purchaseInvoiceId",
      render: (purchaseInvoiceId) => (
        <Link to={`/admin/purchase/${purchaseInvoiceId}`}>
          {purchaseInvoiceId}
        </Link>
      ),
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className='mt-2'>
        <Card
          className='header-solid h-full'
          bordered={false}
          title={
            <h6 className='font-semibold m-0 text-center'>
              All Return Information
            </h6>
          }
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

export default SupplierReturnInvoiceList;
