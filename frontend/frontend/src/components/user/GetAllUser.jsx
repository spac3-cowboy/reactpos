
import { Card } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllStaff } from "../../redux/rtk/features/user/userSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import StatusSelection from "../CommonUi/StatusSelection";
import AddUser from "./addUser";

const GetAllCust = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.users);
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
      dataIndex: "username",
      key: "username",
    },
    {
      id: 3,
      title: "Role",
      dataIndex: "roleId",
      key: "role",
    },
    {
      id: 4,
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 5,
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/hr/staffs/${id}/`} />,
    },
  ];
  useEffect(() => {
    dispatch(loadAllStaff({ status: "true", count: 10, page: 1 }));
  }, [dispatch]);

  return (
    <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}>
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Staff List</h1>
        <div className='flex justify-between md:justify-start gap-3 items-center'>
          <StatusSelection paginatedThunk={loadAllStaff} />
          <CreateDrawer permission={"create-user"} title={"Create Staff"} >
            <AddUser />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-user"}>
        <TableComponent
          columns={columns}
          list={list}
          total={total}
          loading={loading}
          csvFileName={"staff list"}
          paginatedThunk={loadAllStaff}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllCust;
