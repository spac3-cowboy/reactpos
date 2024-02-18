import { Card } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadRolePaginated } from "../../redux/rtk/features/hr/role/roleSlice";
import ViewBtn from "../Buttons/ViewBtn";
import StatusSelection from "../CommonUi/StatusSelection";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddRole from "./AddRole";

const RoleList = (props) => {
  const dispatch = useDispatch();
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const { list, total, loading } = useSelector((state) => state.role);

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
    },

    {
      id: 3,
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/role/${id}/`} />,
    },
  ];
  useEffect(() => {
    dispatch(loadRolePaginated({ status: true, page: 1, count: 10 }));
  }, [dispatch]);
  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}>
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Role</h1>
        <div className='justify-between md:justify-start flex gap-3 items-center'>
          <StatusSelection paginatedThunk={loadRolePaginated} />
          <CreateDrawer permission={"create-role"} title={"Create Role"} width={35}>
            <AddRole />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-role"}>
        <TableComponent
          columns={columns}
          list={list}
          total={total}
          paginatedThunk={loadRolePaginated}
          loading={loading}
          csvFileName={"Role"}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default RoleList;
