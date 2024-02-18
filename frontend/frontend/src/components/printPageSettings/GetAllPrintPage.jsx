import { Card } from 'antd';
import React, { useEffect } from 'react'
import CreateDrawer from '../CommonUi/CreateDrawer';
import UserPrivateComponent from '../PrivacyComponent/UserPrivateComponent';
import TableComponent from '../CommonUi/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { deletePrintPage, loadAllPrintPagePaginated } from '../../redux/rtk/features/printPage/printPageSlice';
import AddPrintPage from './AddPrintPage';
import UpdatePrintPage from './updatePrintPage';

export default function GetAllPrintPage() {
     const dispatch = useDispatch();
     const { list, loading, total } = useSelector((state) => state.print);
     const columns = [
       {
         id: 1,
         title: "ID",
         dataIndex: "id",
         key: "id",
       },
       {
         id: 2,
         title: "Page Size",
         dataIndex: "pageSizeName",
         key: "pageSizeName",
       },
       {
         id: 3,
         title: "Width",
         dataIndex: "width",
         key: "width",
       },
       {
         id: 4,
         title: "Height",
         dataIndex: "height",
         key: "height",
       },
       {
         id: 5,
         title: "Measurement Type",
         dataIndex: "unit",
         key: "unit",
       },
       {
         id: 7,
         title: "Action",
         dataIndex: "",
         key: "action",
         render: ({ pageSizeName, width, height, id }) => (
           <div className="flex items-center gap-2">
             <UserPrivateComponent permission="update-pageSize">
               <UpdatePrintPage
                 data={{ pageSizeName, width, height }}
                 id={id}
               />
             </UserPrivateComponent>
             <UserPrivateComponent permission={"delete-pageSize"}>
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
       const res = await dispatch(deletePrintPage(id));
       if (res) {
         dispatch(loadAllPrintPagePaginated({ status: "true", page: 1, count: 10 }));
       }
     };
     useEffect(() => {
       dispatch(loadAllPrintPagePaginated({ status: "true", page: 1, count: 10 }));
     }, [dispatch]);

  return (
    <div>
      {" "}
      <Card
        className="border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]"
        bodyStyle={{ padding: 0 }}
      >
        <div className="md:flex items-center justify-between pb-3">
          <h1 className="text-lg font-bold">Print Page</h1>
          <div className="flex justify-between md:justify-start gap-3 items-center">
            <CreateDrawer
              permission={"create-pageSize"}
              title={"Add Print Page"}
              width={35}
            >
              {<AddPrintPage />}
            </CreateDrawer>
          </div>
        </div>
        <UserPrivateComponent permission={"readAll-pageSize"}>
          <TableComponent
            list={list}
            columns={columns}
            loading={loading}
            total={total}
            paginatedThunk={loadAllPrintPagePaginated}
            csvFileName={"print-pages"}
          />
        </UserPrivateComponent>
      </Card>
    </div>
  );
}
