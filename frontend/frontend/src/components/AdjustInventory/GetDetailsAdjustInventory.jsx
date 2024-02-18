import { SolutionOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleAdjustInventory } from "../../redux/rtk/features/adjustInventory/adjustInventorySlice";
import AdjustInventorySlip from "../Invoice/AdjustInventorySlip";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";

export default function GetDetailsAdjustInventory() {
  const dispatch = useDispatch();
  const { id } = useParams("id");
  const { adjustInventory } = useSelector((state) => state.adjustInventory);
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
      title: "Adjust Type",
      dataIndex: "adjustType",
      key: "adjustType",
    },
    {
      id: 3,
      title: "Adjust Quantity",
      dataIndex: "adjustQuantity",
      key: "adjustQuantity",
    },
    {
      id: 4,
      title: "Adjust Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
  ];

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  useEffect(() => {
    setColumnsToShow(columns);
    dispatch(loadSingleAdjustInventory(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);
  const addKeys = (arr) => arr?.map((i) => ({ ...i, key: i.id }));
  return (
    <Row>
      <Col span={24} className="mt-2">
        <div className="md:flex flex justify-between md:mb-8 items-center gap-2">
          <h5 className="flex items-center">
            <SolutionOutlined />
            <span className="mr-left">ID : {id}</span>
          </h5>
        </div>
        <Card
          className="header-solid h-full"
          bordered={false}
          title={
            <div className="text-[18px] font-medium">Adjust Inventory List</div>
          }
          bodyStyle={{ paddingTop: "0" }}
          extra={<AdjustInventorySlip data={adjustInventory} />}
        >
          {adjustInventory && (
            <div>
              <div className="flex justify-between my-3">
                <ColVisibilityDropdown
                  options={columns}
                  columns={columns}
                  columnsToShowHandler={columnsToShowHandler}
                />

                <div className="flex justify-between">
                  <div className="bg-gray-100 px-2 py-1 rounded-sm m-1 ">
                    User : <span className="font-semibold capitalize">{adjustInventory?.user.username}</span>
                  </div>
                  <div className="bg-gray-100 px-2 py-1 rounded-sm m-1">
                    Date:{" "}
                    {moment(adjustInventory?.createdAt).format("DD/MM/YYYY")}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="col-info">
            <Table
              scroll={{ x: true }}
              loading={!adjustInventory}
              columns={columnsToShow}
              dataSource={
                adjustInventory
                  ? addKeys(adjustInventory?.adjustInvoiceProduct)
                  : []
              }
            />
          </div>
          <h6 className=" m-0 max-w-[500px] py-2">
            <span className="font-bold">Adjust Note:</span>
            <span className="font-medium"> {adjustInventory?.note}</span>{" "}
          </h6>
        </Card>
      </Col>
    </Row>
  );
}
