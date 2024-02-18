import { Card, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllTransaction } from "../../redux/rtk/features/transaction/transactionSlice";
import CreateDrawer from "../CommonUi/CreateDrawer";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import TableComponent from "../CommonUi/TableComponent";
import AddTransaction from "./AddTransaction";

const GetAllTransaction = (props) => {
  const dispatch = useDispatch();
  let [startdate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  let [enddate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const { list, total, loading } = useSelector((state) => state.transactions);
  const { RangePicker } = DatePicker;
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
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
      title: "Debit Account",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
    },

    {
      id: 4,
      title: "Credit Account",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
    },

    {
      id: 5,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      id: 6,
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
  ];
  useEffect(() => {
    dispatch(
      loadAllTransaction({
        page: 1,
        count: 10,
        startdate,
        enddate,
      })
    );
  }, [dispatch, enddate, startdate]);

  const onCalendarChange = (dates) => {
    startdate = (dates?.[0]).format("YYYY-MM-DD");
    enddate = (dates?.[1]).format("YYYY-MM-DD");
    setStartDate(startdate);
    setEndDate(enddate);
    dispatch(
      loadAllTransaction({
        page: 1,
        count: 20,
        startdate: startdate,
        enddate: enddate,
      })
    );
  };

  return (
    <Card className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]' bodyStyle={{ padding: 0 }}>
      <div className='md:flex items-center justify-between pb-3'>
        <h1 className='text-lg md:flex-grow font-bold mb-4 md:mb-0'>Transaction List</h1>
        <div className='flex gap-3 md:justify-end justify-between  items-center'>
          <CreateDrawer
            width={35}
            permission={"create-transaction"}
            title={"New Transaction"}
          >
            <AddTransaction />
          </CreateDrawer>
          <RangePicker
            className='range-picker w-2/5'
            onCalendarChange={onCalendarChange}
            defaultValue={[
              dayjs(startdate, "YYYY-MM-DD"),
              dayjs(enddate, "YYYY-MM-DD"),
            ]}
          />
        </div>
      </div>

      <UserPrivateComponent permission={"readAll-transaction"}>
        <TableComponent
          list={list}
          total={total?._count?.id}
          columns={columns}
          loading={loading}
          csvFileName={"Transaction list"}
          paginatedThunk={loadAllTransaction}
          query={{ startdate, enddate }}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllTransaction;
