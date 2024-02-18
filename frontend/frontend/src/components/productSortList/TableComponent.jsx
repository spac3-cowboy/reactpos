import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import CreateDrawer from "../CommonUi/CreateDrawer";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import AddPurchaseOrder from "./AddPurchaseOrder";

const TableComponent = ({
  columns,
  list,
  total,
  loading,
  csvFileName,
  paginatedThunk,
  deleteManyThunk,
  children,
  query,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [productList, setList] = useState([]);

  const dispatch = useDispatch();

  const onSelectChange = (newSelectedRowKeys, second) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setList(second);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const fetchData = (page, count) => {
    dispatch(paginatedThunk({ ...query, status: true, page, count }));
  };

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);

  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  return (
    <>
      <div className='mt-2'>
        <div className='pb-3'>
          <div className='w-full dark:text-yellow-50 flex flex-col md:flex-row gap-2 items-center justify-between'>
            <div className=''>
              {!!selectedRowKeys.length && (
                <>
                  <CreateDrawer
                    permission={"create-product"}
                    title={"Create Purchase Order"}
                  >
                    <AddPurchaseOrder list={productList} />
                  </CreateDrawer>
                </>
              )}
            </div>
            <div className='flex gap-2'>
              <div className='px-4 py-1 bg-black/80 text-white border rounded-md'>
                <CSVLink
                  data={list ? list : ""}
                  className='text-white text-xs  md:text-base  py-1 px-0 rounded mr-2 '
                  filename={csvFileName}
                >
                  Download CSV
                </CSVLink>
              </div>
              <ColVisibilityDropdown
                options={columns}
                columns={columns}
                columnsToShowHandler={columnsToShowHandler}
              />
              {total >= 1 && (
                <Pagination
                  total={total}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                  onChange={fetchData}
                  defaultPageSize={10}
                  defaultCurrent={1}
                  showSizeChanger={total > 10}
                />
              )}
            </div>
          </div>
        </div>

        <Table
          loading={loading}
          rowSelection={rowSelection}
          columns={columnsToShow}
          dataSource={
            !!list?.length && list.map((item) => ({ ...item, key: item?.id }))
          }
          pagination={false}
          scroll={{ x: 1000, y: window.innerHeight - 319 }}
        />
      </div>
      {children && children}
    </>
  );
};
export default TableComponent;
