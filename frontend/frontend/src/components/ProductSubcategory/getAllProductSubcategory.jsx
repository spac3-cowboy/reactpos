import { Link } from "react-router-dom";

import { Card } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProductSubCategory } from "../../redux/rtk/features/productSubCategory/productSubCategorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddProductSubCategory from "./addProductSubcategory";

const GetAllProductSubCategory = (props) => {
  const dispatch = useDispatch();

  const { list, total, loading } = useSelector(
    (state) => state.productSubCategories
  );

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
        <Link to={`/admin/product-subcategory/${id}`}>{name}</Link>
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
      render: ({ id }) => <ViewBtn path={`/admin/product-subcategory/${id}`} />,
    },
  ];
  useEffect(() => {
    dispatch(loadAllProductSubCategory({ page: 1, count: 10, status: true }));
  }, [dispatch]);

  return (
    <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}>
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold mb-3 sm:mb-0'>Product Sub Category</h1>
        <div className='flex justify-between md:justify-start sm:text-lg text-xs gap-3 items-center'>
          <StatusSelection paginatedThunk={loadAllProductSubCategory} />
          <CreateDrawer
            permission={"create-productSubCategory"}
            title={"Create Product SubCategory"}
            width={35}
          >
            <AddProductSubCategory />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-productSubCategory"}>
        <TableComponent
          columns={columns}
          csvFileName={"sub category"}
          paginatedThunk={loadAllProductSubCategory}
          list={list}
          total={total}
          loading={loading}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllProductSubCategory;
