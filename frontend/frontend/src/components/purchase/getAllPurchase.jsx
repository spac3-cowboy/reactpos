import { Link, Navigate } from "react-router-dom";

import { Card, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPurchase } from "../../redux/rtk/features/purchase/purchaseSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import DashboardCard from "./Cards";
import AddPurchase from "./addPurchase";

const GetAllPurchase = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading, information } = useSelector(
    (state) => state.purchases
  );
  const { RangePicker } = DatePicker;
  const [startdate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [enddate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const columns = [
    {
      id: 1,
      title: "ID",
      key: "id",
      render: ({ id }) => <Link to={`/admin/purchase/${id}`}>{id}</Link>,
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "Supplier Name ",
      dataIndex: `supplier`,
      key: "supplierId",
      render: (supplier) => supplier?.name,
    },
    {
      id: 4,
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      id: 5,
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      id: 6,
      title: "Due Amount",
      dataIndex: "dueAmount",
      key: "dueAmount",
    },
    {
      id: 7,
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },

    //Update Supplier Name here

    {
      id: 8,
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, { dueAmount }) => (
        <div className='flex flex-row'>
          <ViewBtn path={`/admin/purchase/${id}`} />
          <Link
            to={dueAmount ? `/admin/payment/supplier/${id}` : "#"}
            state={{ dueAmount: dueAmount }}
          >
            <button
              className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-1  px-3  rounded mr-2 disabled:bg-gray-400'
              disabled={!dueAmount}
            >
              Payment
            </button>
          </Link>
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(
      loadAllPurchase({
        status: true,
        page: 1,
        count: 10,
        startdate,
        enddate,
      })
    );
  }, [dispatch, enddate, startdate]);

  const onCalendarChange = (dates) => {
    const startdate = (dates?.[0]).format("YYYY-MM-DD");
    const enddate = (dates?.[1]).format("YYYY-MM-DD");
    setStartDate(startdate);
    setEndDate(enddate);
    dispatch(
      loadAllPurchase({
        status: true,
        page: 1,
        count: 10,
        startdate: startdate,
        enddate: enddate,
      })
    );
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <>
      <div className='card card-custom mt-3 '>
        <div className='card-body'>
          <div>
            {/* <RangePicker
              onCalendarChange={onCalendarChange}
              defaultValue={[
                dayjs(startdate, "YYYY-MM-DD"),
                dayjs(enddate, "YYYY-MM-DD"),
              ]}
              className='range-picker'
              style={{ maxWidth: "400px" }}
            /> */}
          </div>

          <DashboardCard information={information} count={total} />
          <br />
          <Card
            className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
            bodyStyle={{ padding: 0 }}
          >
            <div className='flex items-center justify-center pb-3'>
              <div className='justify-between md:justify-start flex gap-3 items-center'>
                <CreateDrawer
                  permission={"create-purchaseInvoice"}
                  title={"Add Purchase"}
                  width={85}
                >
                  <AddPurchase />
                </CreateDrawer>
              </div>
            </div>
            {/* <UserPrivateComponent permission={"readAll-purchaseInvoice"}>
              <TableComponent
                list={list}
                total={total}
                columns={columns}
                loading={loading}
                paginatedThunk={loadAllPurchase}
                csvFileName={"purchase list"}
                query={{ startdate, enddate }}
              />
            </UserPrivateComponent> */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default GetAllPurchase;
