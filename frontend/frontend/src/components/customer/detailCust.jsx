import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearCustomer,
  deleteCustomer,
  loadSingleCustomer,
} from "../../redux/rtk/features/customer/customerSlice";
import Loader from "../loader/loader";

import CustomerInvoiceList from "../Card/CustomerInvoiceList";
import CommonDelete from "../CommonUi/CommonDelete";
import CustomerReturnInvoiceList from "./ListCard/CustomerReturnInvoiceList";
import CustomerTransactionList from "./ListCard/CustomerTransactionList";

const DetailCust = () => {
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customers.customer);

  useEffect(() => {
    dispatch(loadSingleCustomer(id));
    return () => {
      dispatch(clearCustomer());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <div className='mr-top'>
        {customer ? (
          <Fragment key={customer.id}>
            <Card bordered={false} style={{}}>
              <div className='flex justify-between m-3'>
                <h5>
                  <SolutionOutlined />
                  <span className='mr-left'>
                    ID : {customer.id} | {customer.name}
                  </span>
                </h5>
                <div className='flex items-center text-end'>
                  <Link
                    className='m-2'
                    to={`/admin/customer/${customer.id}/update`}
                    state={{ data: customer }}
                  >
                    <Button
                      type='primary'
                      shape='round'
                      icon={<EditOutlined />}
                    ></Button>
                  </Link>
                  <CommonDelete
                    permission={"delete-customer"}
                    deleteThunk={deleteCustomer}
                    id={id}
                    navigatePath={"/admin/customer"}
                    className='p-3'
                  />
                </div>
              </div>
              <div className='card-body m-2'>
                <p>
                  <Typography.Text strong>Phone Number :</Typography.Text>{" "}
                  {customer.phone}
                </p>

                <p>
                  <Typography.Text strong>Address :</Typography.Text>{" "}
                  {customer.address}
                </p>

                <p>
                  <Typography.Text strong>Due Amount :</Typography.Text>{" "}
                  {customer?.dueAmount
                    ? Number(customer.dueAmount).toFixed(3)
                    : 0}
                </p>
              </div>
              <CustomerInvoiceList
                list={customer?.saleInvoice}
                linkTo='/admin/sale'
              />
              <CustomerReturnInvoiceList
                list={customer?.allReturnSaleInvoice}
              />
              <CustomerTransactionList list={customer?.allTransaction} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailCust;
