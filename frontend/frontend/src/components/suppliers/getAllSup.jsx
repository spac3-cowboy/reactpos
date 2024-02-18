import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadSuppliers } from "../../redux/rtk/features/supplier/supplierSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddSup from "./addSup";

const GetAllSup = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.suppliers);
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
        <Link to={`/admin/supplier/${id}`}>{name}</Link>
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
      render: ({ id }) => <ViewBtn path={`/admin/supplier/${id}`} />,
    },
  ];

  useEffect(() => {
    dispatch(loadSuppliers({ status: true, page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}>
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Supplier List</h1>
        <div className='flex justify-between md:justify-start gap-3 items-center'>
          <StatusSelection paginatedThunk={loadSuppliers} />
          <CreateDrawer permission={"create-supplier"} title={"Add Supplier"} width={35}>
            <AddSup />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-supplier"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          csvFileName={"Suppliers"}
          paginatedThunk={loadSuppliers}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllSup;
