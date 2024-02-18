import { DeleteOutlined, EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearSupplier,
  deleteSupplier,
  loadSupplier,
} from "../../redux/rtk/features/supplier/supplierSlice";
import Loader from "../loader/loader";

import { CSVLink } from "react-csv";
import SupplierInvoiceTable from "../Card/SupplierInvoiceList";
import SupplierReturnInvoiceList from "./ListCard/SupplierReturnInvoiceList";
import SupplierTransactionList from "./ListCard/SupplierTransactionList";

//PopUp

const DetailsSup = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const supplier = useSelector((state) => state.suppliers.supplier);

  //Delete Supplier
  const onDelete = () => {
    try {
      dispatch(deleteSupplier(id));

      setVisible(false);
      toast.warning(`Supplier : ${supplier.name} is removed `);
      return navigate("/admin/supplier");
    } catch (error) {
    }
  };
  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    dispatch(loadSupplier(id));
    return () => {
      dispatch(clearSupplier());
    };
  }, [id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <div>
      <div className='mr-top'>
        {supplier ? (
          <Fragment key={supplier.id}>
            <Card bordered={false} style={{}}>
              <div className=' flex justify-between' style={{ padding: 0 }}>
                <div className='w-50'>
                  <h5 className='text-xl'>
                    <SolutionOutlined />
                    <span className='mr-left'>
                      ID : {supplier.id} | {supplier.name}
                    </span>
                  </h5>
                </div>
                <div className='text-end w-50'>
                  <Link
                    className='mr-3 d-inline-block'
                    to={`/admin/supplier/${supplier.id}/update`}
                    state={{ data: supplier }}
                  >
                    <Button
                      type='primary'
                      shape='round'
                      icon={<EditOutlined />}
                    ></Button>
                  </Link>
                  <Popover
                    content={
                      <a onClick={onDelete}>
                        <Button type='primary' danger>
                          Yes Please !
                        </Button>
                      </a>
                    }
                    title='Are you sure you want to delete ?'
                    trigger='click'
                    open={visible}
                    onOpenChange={handleVisibleChange}
                  >
                    <Button
                      type='danger'
                      shape='round'
                      icon={<DeleteOutlined />}
                    ></Button>
                  </Popover>
                </div>
              </div>
              <div className='mt-6 mb-6'>
                <p>
                  <Typography.Text className='font-semibold'>
                    Phone Number : {supplier.phone}
                  </Typography.Text>{" "}
                </p>

                <p>
                  <Typography.Text className='font-semibold'>
                    Address :
                  </Typography.Text>{" "}
                  {supplier.address}
                </p>

                <p>
                  <Typography.Text strong>Due Amount :</Typography.Text>{" "}
                  {supplier.dueAmount}
                </p>
              </div>
              <hr />

              <div className=' m-4 flex justify-end'>
                {supplier.purchaseInvoice && (
                  <div>
                  
                      <CSVLink
                        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded mr-2 "
                        data={supplier.purchaseInvoice}
                        filename='suppliers'
                      >
                        Download CSV
                      </CSVLink>
                   
                  </div>
                )}
              </div>
              <SupplierInvoiceTable
                list={supplier.purchaseInvoice}
                linkTo='/admin/purchase'
              />
              <SupplierReturnInvoiceList
                list={supplier?.allReturnPurchaseInvoice}
              />
              <SupplierTransactionList list={supplier?.allTransaction} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailsSup;
