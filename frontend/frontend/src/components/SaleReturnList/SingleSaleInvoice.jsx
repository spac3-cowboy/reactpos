import { SolutionOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadSingleSaleReturn } from "../../redux/rtk/features/SaleReturnList/SaleReturnListSlice";
import SaleReturnInvoice from "../Invoice/SaleReturnInvoice";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";

export default function SingleSaleInvoice() {
  const dispatch = useDispatch();
  const { id } = useParams("id");
  const [columnsToShow, setColumnsToShow] = useState([]);

  const { returnSale, loading } = useSelector((state) => state.saleReturn);
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      render: (product) => product?.name,
    },
    {
      id: 3,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },

    {
      id: 4,
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      id: 5,
      title: "Sale Price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
    },
  ];
  useEffect(() => {
    setColumnsToShow(columns);
    dispatch(loadSingleSaleReturn(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const addKeys = (arr) => arr?.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className='mt-2'>
        <div className='md:flex flex justify-between md:mb-8 items-center gap-2'>
          <h5 className='flex items-center'>
            <SolutionOutlined />
            <span className='mr-left'>ID : {id}</span>
          </h5>
        </div>
        <Card
          className='header-solid h-full'
          bordered={false}
          title={
            <div className='text-[18px] font-medium'>Sale Return List</div>
          }
          bodyStyle={{ paddingTop: "0" }}
          extra={<SaleReturnInvoice data={returnSale} />}
        >
          {returnSale && (
            <div>
              <div className='flex justify-between my-3'>
                <ColVisibilityDropdown
                  options={columns}
                  columns={columns}
                  columnsToShowHandler={columnsToShowHandler}
                />

                <div className='flex justify-between'>
                  <div className='bg-gray-100 px-2 py-1 rounded-sm m-1'>
                    Sale Invoice Id: {returnSale?.saleInvoiceId}
                  </div>
                  <div className='bg-gray-100 px-2 py-1 rounded-sm m-1'>
                    Date: {moment(returnSale?.createdAt).format("DD/MM/YYYY")}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='col-info'>
            <Table
              scroll={{ x: true }}
              loading={!returnSale}
              columns={columnsToShow}
              dataSource={
                returnSale ? addKeys(returnSale?.returnSaleInvoiceProduct) : []
              }
            />
          </div>
          <div className='font-bold text-[16px]'>
            Total Return Amount: {returnSale?.totalAmount}
          </div>
          <h6 className=' m-0 max-w-[500px] py-2'>
            <span className='font-bold'>Return Note:</span>
            <span className='font-medium'> {returnSale?.note}</span>{" "}
          </h6>
        </Card>
      </Col>
    </Row>
  );
}
