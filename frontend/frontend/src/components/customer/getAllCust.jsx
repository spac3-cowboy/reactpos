import { Link } from "react-router-dom";

import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/rtk/features/customer/customerSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddCust from "./addCust";

const GetAllCustomer = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.customers);
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
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/customer/${id}`}>{name}</Link>
      ),
    },
    {
      id: 3,
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      id: 4,
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
    },
    {
      id: 5,
      title: "Action",
      key: "action",
      render: ({ id }) => <ViewBtn path={`/admin/customer/${id}`} />,
    },
  ];

  useEffect(() => {
    dispatch(loadAllCustomer({ page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }
    }>
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Customer</h1>
        <div className='flex justify-between md:justify-start gap-3 items-center'>
          <StatusSelection paginatedThunk={loadAllCustomer} />
          <CreateDrawer
            permission={"create-customer"}
            title={"Create Customer"}
            width={35}
          >
            <AddCust />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-customer"}>
        <TableComponent
          columns={columns}
          csvFileName={"Customers"}
          paginatedThunk={loadAllCustomer}
          list={list}
          total={total}
          loading={loading}
        />
      </UserPrivateComponent>
    </Card >
  );
};

export default GetAllCustomer;
