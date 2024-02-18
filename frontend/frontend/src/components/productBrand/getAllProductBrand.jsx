import { Link } from "react-router-dom";

import { Card } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProductBrand } from "../../redux/rtk/features/productBrand/productBrandSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddProductBrand from "./addProductBrand";

const GetAllProductBrand = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.productBrands);
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
        <Link to={`/admin/product-brand/${id}`}>{name}</Link>
      ),
    },
    {
      id: 3,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "Action",
      key: "action",
      render: ({ id }) => <ViewBtn path={`/admin/product-brand/${id}`} />,
    },
  ];
  useEffect(() => {
    dispatch(loadAllProductBrand({ page: 1, count: 10, status: true }));
  }, [dispatch]);

  return (
    <Card
      className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
      bodyStyle={{ padding: 0 }}
    >
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Product Brand</h1>
        <div className='flex justify-between md:justify-start md:gap-3 gap-1 items-center'>
          <StatusSelection paginatedThunk={loadAllProductBrand} />
          <CreateDrawer
            permission={"create-productBrand"}
            title={"Create Product Brand"}
            width={35}
          >
            <AddProductBrand />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-productBrand"}>
        <TableComponent
          columns={columns}
          csvFileName={"brand"}
          paginatedThunk={loadAllProductBrand}
          list={list}
          total={total}
          loading={loading}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllProductBrand;
