import { Card, DatePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ViewBtn from "../Buttons/ViewBtn";
import { useEffect } from "react";
import { loadAllPurchaseReturn } from "../../redux/rtk/features/PurchaseReturnList/PurchaseReturnListSlice";
import dayjs from "dayjs";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import TableComponent from "../CommonUi/TableComponent";

export default function GetAllPurchaseReturnList() {
   const dispatch = useDispatch();
   const { list, total, loading } = useSelector((state) => state.purchaseReturn);
   const { RangePicker } = DatePicker;
   const [startDate, setStartDate] = useState(
     moment().startOf("month").format("YYYY-MM-DD")
   );
   const [endDate, setEndDate] = useState(
     moment().endOf("month").format("YYYY-MM-DD")
   );
   const columns = [
     {
       id: 1,
       title: "ID",
       dataIndex: "id",
       key: "id",
       render: (name, { id }) => <Link to={`/admin/purchase/${id}`}>{id}</Link>,
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
       title: "Purchase Invoice Id",
       dataIndex: "purchaseInvoiceId",
       key: "purchaseInvoiceId",
     },
     {
       id: 4,
       title: "Notes",
       dataIndex: "note",
       key: "note",
     },

     //Update Supplier Name here

     {
       id: 5,
       title: "Action",
       dataIndex: "id",
       key: "id",
       render: (id) => (
         <div className="flex flex-row">
           <ViewBtn path={`/admin/purchase-return-list/${id}`} />
         </div>
       ),
     },
   ];

   useEffect(() => {
     dispatch(
       loadAllPurchaseReturn({
         status: true,
         page: 1,
         count: 10,
         startdate: startDate,
         enddate: endDate,
       })
     );
   }, [dispatch, endDate, startDate]);

   const onCalendarChange = (dates) => {
     const startDate = dates[0].format("YYYY-MM-DD");
     const endDate = dates[1].format("YYYY-MM-DD");
     setStartDate(startDate);
     setEndDate(endDate);
   };
  return (
    <>
      <Card
        className="border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]"
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex items-center justify-between pb-3">
          <h1 className="text-lg font-bold">Purchase Return List</h1>
          <div className="justify-between md:justify-start flex gap-3 items-center">
            <div>
              <RangePicker
                onCalendarChange={onCalendarChange}
                defaultValue={[
                  dayjs(startDate, "YYYY-MM-DD"),
                  dayjs(endDate, "YYYY-MM-DD"),
                ]}
                className="range-picker"
                style={{ maxWidth: "400px" }}
              />
            </div>
          </div>
        </div>
        <UserPrivateComponent permission={"readAll-returnPurchaseInvoice"}>
          <TableComponent
            list={list}
            total={total}
            columns={columns}
            loading={loading}
            paginatedThunk={loadAllPurchaseReturn}
            csvFileName={"purchase Return list"}
            query={{ startdate: startDate, enddate: endDate }}
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
}
