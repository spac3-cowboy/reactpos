import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteColor,
  loadColorPaginated,
} from "../../redux/rtk/features/color/colorSlice";

import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddProductColor from "./addProductColor";
import UpdateProductColor from "./updateProductColor";

const GetAllProductColor = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.colors);

  const onDelete =async (id) => {
   const res =await  dispatch(deleteColor(id));
   if(res){
      dispatch(loadColorPaginated({ status: true, page: 1, count: 10 }));
   }
  };
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
        <Link to={`/admin/product-color/${id}`}>{name}</Link>
      ),
    },
    {
      id: 2,
      title: "Color code",
      dataIndex: "colorCode",
      key: "colorCode",
    },
    {
      id: 3,
      title: "Action",
      dataIndex: "",
      key: "action",
      render: ({ name, colorCode, id }) => (
        <div className='flex items-center gap-2'>
          <UserPrivateComponent permission='update-color'>
            <UpdateProductColor data={{ name, colorCode }} id={id} />
          </UserPrivateComponent>
          <UserPrivateComponent permission={"delete-color"}>
            <DeleteOutlined
              onClick={() => onDelete(id)}
              className='bg-red-600 p-2 text-white rounded-md'
            />
          </UserPrivateComponent>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(loadColorPaginated({ status: true, page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}>
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Product Color</h1>
        <div className='flex justify-between md:justify-start gap-3 items-center'>
          <StatusSelection paginatedThunk={loadColorPaginated} />
          <CreateDrawer permission={"create-color"} title={"Add Color"} width={35}>
            <AddProductColor/>
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-color"}>
        <TableComponent
          list={list}
          columns={columns}
          total={total}
          loading={loading}
          paginatedThunk={loadColorPaginated}
          csvFileName={"colors"}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllProductColor;
