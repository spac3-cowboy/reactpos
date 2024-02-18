import { Card } from "antd";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadColorPaginated } from "../../redux/rtk/features/color/colorSlice";

import { deleteCoupon, loadCouponPaginated } from "../../redux/rtk/features/Coupon/couponSlice";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddCoupon from "./AddCoupon";
import UpdateProductColor from "./UpdateCoupon";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

const GetAllCoupon = () => {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.coupon);
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
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      id: 3,
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      id: 4,
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      id: 5,
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => moment(startDate).format("ll"),
    },
    {
      id: 6,
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => moment(endDate).format("ll"),
    },
    {
      id: 7,
      title: "Action",
      dataIndex: "",
      key: "action",
      render: ({ couponCode, type, value, startDate, endDate, id }) => (
        <div className="flex items-center gap-2">
          <UserPrivateComponent permission="update-coupon">
            <UpdateProductColor
              data={{ couponCode, type, value, startDate, endDate }}
              id={id}
            />
          </UserPrivateComponent>
          <UserPrivateComponent permission={"delete-coupon"}>
            <DeleteOutlined
              onClick={() => onDelete(id)}
              className="bg-red-600 p-2 text-white rounded-md"
            />
          </UserPrivateComponent>
        </div>
      ),
    },
  ];
   const onDelete = async (id) => {
     const res = await dispatch(deleteCoupon(id));
     if (res) {
       dispatch(loadCouponPaginated({ status: "true", page: 1, count: 10 }));
     }
   };
  useEffect(() => {
    dispatch(loadCouponPaginated({ status: "true", page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <Card
      className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
      bodyStyle={{ padding: 0 }}
    >
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg font-bold'>Coupon List</h1>
        <div className='flex justify-between md:justify-start gap-3 items-center'>
          <CreateDrawer
            permission={"create-coupon"}
            title={"Add Coupon"}
            width={35}
          >
            <AddCoupon />
          </CreateDrawer>
        </div>
      </div>
      <UserPrivateComponent permission={"readAll-coupon"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          total={total}
          paginatedThunk={loadColorPaginated}
          csvFileName={"coupons"}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllCoupon;
