import { Link } from "react-router-dom";

import { Card, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProductCategory } from "../../redux/rtk/features/productCategory/productCategorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import AddProductCategory from "./addProductCategory";

function CustomTable({ list, total, loading }) {
  const dispatch = useDispatch();
  const [columnsToShow, setColumnsToShow] = useState([]);

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
        <Link to={`/admin/product-category/${id}`}>{name}</Link>
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
      render: ({ id }) => <ViewBtn path={`/admin/product-category/${id}`} />,
    },
  ];

  useEffect(() => {
    setColumnsToShow(columns);
  }, []);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div className='card column-design'>
      <div className='card-body'>
        <div className='card-title flex justify-between mt-4'>
          <h1 className='text-2xl  ml-3 mb-3'>Category List</h1>
          {list && (
            <div>
              <CSVLink
                data={list}
                className='bg-gray-700 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded mr-2 '
                filename='customer'
              >
                Download CSV
              </CSVLink>
            </div>
          )}
        </div>

        {list && (
          <div style={{ marginBottom: "30px" }} className='ml-3'>
            <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={columnsToShowHandler}
            />
          </div>
        )}

        <Table
          scroll={{ x: true }}
          loading={loading}
          pagination={{
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            total: total,
            onChange: (page, count) => {
              dispatch(loadAllProductCategory({ page, count: count }));
            },
          }}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
        />
      </div>
    </div>
  );
}

const GetAllProductCategory = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector(
    (state) => state.productCategories
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
        <Link to={`/admin/product-category/${id}`}>{name}</Link>
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
      render: ({ id }) => <ViewBtn path={`/admin/product-category/${id}`} />,
    },
  ];
  useEffect(() => {
    dispatch(loadAllProductCategory({ page: 1, count: 10, status: true }));
  }, [dispatch]);

  return (
    <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}>
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Product Category</h1>
        <div className='flex justify-between md:justify-start gap-3 items-center'>
          <StatusSelection paginatedThunk={loadAllProductCategory} />
          <CreateDrawer
            permission={"create-productCategory"}
            title={"Create Product Category"}
            width={35}
          >
            <AddProductCategory />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-productCategory"}>
        <TableComponent
          list={list}
          total={total}
          csvFileName={"product-category"}
          loading={loading}
          paginatedThunk={loadAllProductCategory}
          columns={columns}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllProductCategory;
