import { Card } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllDesignation } from "../../redux/rtk/features/designation/designationSlice";
import ViewBtn from "../Buttons/ViewBtn";
import StatusSelection from "../CommonUi/StatusSelection";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddDesignation from "./addDesignation";

const Designation = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.designations);

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
        <Link to={`/admin/designation/${id}`}>{name}</Link>
      ),
    },
    {
      id: 3,
      title: "Action",
      key: "action",
      render: ({ id }) => <ViewBtn path={`/admin/designation/${id}`} />,
    },
  ];

  useEffect(() => {
    dispatch(loadAllDesignation({ page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <Card
      className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
      bodyStyle={{ padding: 0 }}
    >
      <div className='flex items-center justify-between pb-3'>
        <h1 className='justify-between md:justify-start text-lg font-bold'>
          Designation List
        </h1>

        <div className='flex items-center gap-3'>
          <StatusSelection paginatedThunk={loadAllDesignation} />
          <AddDesignation />
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-designation"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          csvFileName='Designations'
          paginatedThunk={loadAllDesignation}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default Designation;
