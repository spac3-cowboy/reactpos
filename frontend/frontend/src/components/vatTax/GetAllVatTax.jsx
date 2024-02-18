import { EditOutlined } from "@ant-design/icons";
import { Card, Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVatTax,
  editVatTax,
  loadAllVatTaxPaginated,
  loadVatTaxStatement,
} from "../../redux/rtk/features/vatTax/vatTaxSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import TableComponent from "../CommonUi/TableComponent";
import VatStatementCards from "./VatStatementCards";
import VatTaxUpdate from "./VatTaxUpdate";
import AddVatTax from "./addVatTax";

const GetAllVatTax = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.vatTax);
  const information = useSelector((state) => state.vatTax.statement);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      id: 3,
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => `${percentage}%`,
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
      render: (item) => (
        <div className='flex items-center gap-3'>
          <UserPrivateComponent permission={"update-vat"}>
            <EditOutlined
              onClick={() => {
                dispatch(editVatTax(item));
                showModal();
              }}
              className='bg-gray-600 p-2 text-white rounded-md'
            />
          </UserPrivateComponent>
          <CommonDelete
            permission={"delete-vat"}
            deleteThunk={deleteVatTax}
            id={item.id}
            loadThunk={loadAllVatTaxPaginated}
            query={{ status: true, page: 1, count: 10 }}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(loadAllVatTaxPaginated({ status: true, page: 1, count: 10 }));
    dispatch(loadVatTaxStatement());
  }, [dispatch]);

  return (
    <>
      <VatStatementCards information={information} />
      <Card
        className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
        bodyStyle={{ padding: 0 }}
      >
        <div className='md:flex items-center justify-between pb-3'>
          <h1 className='text-lg font-bold'>Vat tax List</h1>
          <div className='flex justify-between md:justify-start gap-3 items-center'>
            <StatusSelection paginatedThunk={loadAllVatTaxPaginated} />
            <CreateDrawer permission={"create-vat"} title={"Add Vat Type"} width={35}>
              <AddVatTax />
            </CreateDrawer>
          </div>
        </div>
        <UserPrivateComponent permission={"readAll-vat"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            csvFileName={"Vat/tax list"}
            paginatedThunk={loadAllVatTaxPaginated}
          />
        </UserPrivateComponent>
      </Card>
      <Modal
        title='Update vat/tax type'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <VatTaxUpdate handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default GetAllVatTax;
