import { Card } from "antd";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllHoldSalePaginated } from "../../redux/rtk/features/holdSale/holdSaleSlice";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import HoldToSale from "./HoldToSale";

export default function GetAllHoldSale() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.holdSale);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "Customer Name ",
      dataIndex: `customer`,
      key: "customerId",
      render: (customer) => customer?.name,
    },

    {
      id: 4,
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      id: 5,
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },

    {
      id: 7,
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      responsive: ["md"],
    },

    //Update Supplier Name here

    {
      id: 8,
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (profit) => Number(profit).toFixed(2),
      responsive: ["md"],
    },
    {
      id: 9,
      title: "Sale Person",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.username,
      responsive: ["md"],
    },
    {
      id: 4,
      title: "Action",
      key: "action",
      render: (item) => <HoldToSale id={item.id} />,
    },
  ];

  useEffect(() => {
    dispatch(loadAllHoldSalePaginated({ page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <div>
      <Card
        className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
        bodyStyle={{ padding: 0 }}
      >
        <div className='md:flex items-center justify-between pb-3'>
          <h1 className='text-lg font-bold'>Hold Sale List</h1>
        </div>
        <UserPrivateComponent permission={"readAll-saleInvoice"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            csvFileName={"Sale Hold list"}
            paginatedThunk={loadAllHoldSalePaginated}
          />
        </UserPrivateComponent>
      </Card>
    </div>
  );
}
