import { Card } from "antd";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllQuote } from "../../redux/rtk/features/quote/quoteSlice";
import { stringShorter } from "../../utils/functions";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddQuote from "./AddQuote";

export default function GetAllQuote() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.quote);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "quoteName",
      key: "quoteName",
    },
    {
      id: 3,
      title: "Owner",
      dataIndex: "quoteOwner",
      key: "quoteOwner",
      render: (quoteOwner ) => quoteOwner?.username,
    },
    {
      id: 4,
      title: "Quotation Date",
      dataIndex: "quoteDate",
      key: "quoteDate",
      render: (quoteDate) => moment(quoteDate).format("YYYY-MM-DD"),
    },
    {
      id: 5,
      title: "Expiration Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (expirationDate) => moment(expirationDate).format("YYYY-MM-DD"),
    },
    {
      id: 6,
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      id: 7,
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => stringShorter(description, 20),
    },
    {
      id: 8,
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 8,
      title: "Action",
      key: "action",
      render: ({ id }) => (
        <div className='flex items-center gap-3'>
          <UserPrivateComponent permission={"update-quote"}>
            <ViewBtn path={`/admin/quote/${id}`} />
          </UserPrivateComponent>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(loadAllQuote({ status: true, page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <div>
      <Card
        className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
        bodyStyle={{ padding: 0 }}
      >
        <div className='md:flex items-center justify-between pb-3'>
          <h1 className='text-lg font-bold'>Quote List</h1>
          <div className='justify-between md:justify-start flex gap-3 items-center'>
            <CreateDrawer
              permission={"create-quote"}
              title={"Add Quote"}
              width={70}
            >
              <AddQuote />
            </CreateDrawer>
          </div>
        </div>
        <UserPrivateComponent permission={"readAll-quote"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            csvFileName={"Quote list"}
            paginatedThunk={loadAllQuote}
          />
        </UserPrivateComponent>
      </Card>
    </div>
  );
}
