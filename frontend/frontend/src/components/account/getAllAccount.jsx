import { Link } from "react-router-dom";

import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAccountPaginated } from "../../redux/rtk/features/account/accountSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import StatusSelection from "../CommonUi/StatusSelection";
import TableComponent from "../CommonUi/TableComponent";
import AddAccount from "./AddAccount";

const GetAllAccount = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.accounts) || {};
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/account/${id}`}>{id}</Link>,
    },

    {
      id: 2,
      title: "Account",
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: "Account Type ",
      dataIndex: "account",
      key: "account",
      render: (account) => account?.name,
      responsive: ["md"],
    },
    {
      id: 4,
      title: "Action",
      key: "action",
      render: ({ id }) => <ViewBtn path={`/admin/account/${id}`} />,
    },
  ];
  useEffect(() => {
    dispatch(loadAllAccountPaginated({ status: true, page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <Card
      className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
      bodyStyle={{ padding: 0 }}
    >
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Accounts</h1>
        <div className='flex justify-between md:justify-start gap-3 items-center'>
          <StatusSelection paginatedThunk={loadAllAccountPaginated} />
          <CreateDrawer permission={"create-account"} title={"Create Account"} width={35}>
            <AddAccount />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-account"}>
        <TableComponent
          list={list}
          columns={columns}
          csvFileName={"Accounts"}
          total={total}
          loading={loading}
          paginatedThunk={loadAllAccountPaginated}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllAccount;
