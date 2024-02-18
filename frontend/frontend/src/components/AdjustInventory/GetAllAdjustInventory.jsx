import { Card, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllAdjustInventory } from "../../redux/rtk/features/adjustInventory/adjustInventorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddAdjustInventory from "./AddAdjustInventory";

const GetAllAdjustInventory = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector(
    (state) => state.adjustInventory
  );
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
      key: "id",
      render: ({ id }) => (
        <Link to={`/admin/adjust-inventory/${id}`}>{id}</Link>
      ),
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
      title: "Note",
      dataIndex: `note`,
      key: "note",
    },

    {
      id: 8,
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <div className="flex flex-row">
          <ViewBtn path={`/admin/adjust-inventory/${id}`} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      loadAllAdjustInventory({
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
          <h1 className="text-lg font-bold">Adjust Inventory</h1>
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
            <CreateDrawer
              permission={"create-adjust"}
              title={"Add Adjust Inventory"}
              width={80}
            >
              <AddAdjustInventory />
            </CreateDrawer>
          </div>
        </div>
        <UserPrivateComponent permission={"readAll-adjust"}>
          <TableComponent
            list={list}
            total={total}
            columns={columns}
            loading={loading}
            paginatedThunk={loadAllAdjustInventory}
            csvFileName={"Adjust Inventory"}
            query={{ startdate: startDate, enddate: endDate }}
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
};

export default GetAllAdjustInventory;
