import { Card } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllPurchaseReorder } from "../../redux/rtk/features/purchaseOrder/purchaseOrderSlice";
import ViewBtn from "../Buttons/ViewBtn";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function GetAllPurchaseOrderList() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.purchaseOrder);
  useEffect(() => {
    dispatch(loadAllPurchaseReorder({ page: 1, count: 10 }));
  }, [dispatch]);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "reorderInvoiceId",
      key: "reorderInvoiceId",
      render: (reorderInvoiceId) => (
        <Link to={`/admin/purchase-reorder-invoice/${reorderInvoiceId}`}>
          {reorderInvoiceId}
        </Link>
      ),
    },
    {
      id: 2,
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },

    {
      id: 3,
      title: "Action",
      dataIndex: "reorderInvoiceId",
      key: "reorderInvoiceId",
      render: (reorderInvoiceId) => (
        <div className='flex flex-row'>
          <ViewBtn
            path={`/admin/purchase-reorder-invoice/${reorderInvoiceId}`}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Card
        className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
        bodyStyle={{ padding: 0 }}
      >
        <div className='flex items-center justify-between pb-3'>
          <h1 className='text-lg font-bold'>Purchase Order List</h1>
        </div>
        <UserPrivateComponent permission={"readAll-purchaseInvoice"}>
          <TableComponent
            list={list}
            total={total}
            columns={columns}
            loading={loading}
            paginatedThunk={loadAllPurchaseReorder}
            csvFileName={"purchase Order list"}
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
}
