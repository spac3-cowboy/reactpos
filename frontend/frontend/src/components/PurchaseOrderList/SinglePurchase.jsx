import { SolutionOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSinglePurchaseReorder } from "../../redux/rtk/features/purchaseOrder/purchaseOrderSlice";
import PurchaseOrderListPrint from "../Invoice/PurchaseOrderListPrint";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import moment from "moment";

export default function SinglePurchase() {
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const { singlePurchase, loading } = useSelector(
    (state) => state.purchaseOrder
  );
  const [columnsToShow, setColumnsToShow] = useState([]);
  useEffect(() => {
    setColumnsToShow(columns);
    dispatch(loadSinglePurchaseReorder(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "productId",
      key: "id",
    },

    {
      id: 2,
      title: "Product Name",
      dataIndex: "product",
      key: "name",
      render: (item) => item.name,
    },
    {
      id: 3,
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      id: 4,
      title: "Sku",
      dataIndex: "product",
      key: "sku",
      render: (item) => item.sku,
    },

    {
      id: 5,
      title: "Product Quantity",
      dataIndex: "reorderProductQuantity",
      key: "productQuantity",
    },
  ];
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const addKeys = (arr) => arr?.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className='mt-2'>
        <div className='md:flex flex justify-between md:mb-8 items-center gap-2'>
          <h5 className='flex items-center'>
            <SolutionOutlined />
            <span className='mr-left'>ID : {id}</span>
          </h5>
        </div>
        <Card
          className='header-solid h-full'
          bordered={false}
          title={<div className='text-[18px] font-medium '>Purchase Order</div>}
          bodyStyle={{ paddingTop: "0" }}
          extra={<PurchaseOrderListPrint data={singlePurchase} />}
        >
          {singlePurchase && (
            <div>
              <div className='flex justify-between my-3'>
                <ColVisibilityDropdown
                  options={columns}
                  columns={columns}
                  columnsToShowHandler={columnsToShowHandler}
                />
              </div>
            </div>
          )}
          <div className='col-info'>
            <Table
              scroll={{ x: true }}
              loading={loading}
              columns={columnsToShow}
              dataSource={
                singlePurchase ? addKeys(singlePurchase?.productList) : []
              }
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
}
