import { SolutionOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadSingleSale } from "../../redux/rtk/features/sale/saleSlice";
import SaleProductListCard from "../Card/saleInvoice/SaleProductListCard";
import Loader from "../loader/loader";
import { addReturnSale } from "./returnSale.api";

const AddReturnSale = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [totalReturnAmount, setTotalReturnAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  // make a button click fucnciton to set loading to true
  const onClick = () => {
    setLoading(true);
  };

  //dispatch
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.sales.sale);
  const { singleSaleInvoice, returnSaleInvoice } = sale ? sale : {};
  const [list, setList] = useState([]);
  const [date, setDate] = useState(moment());

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(loadSingleSale(id));
  }, [id]);

  useEffect(() => {
    if (singleSaleInvoice) {
      const list = singleSaleInvoice.saleInvoiceProduct.map((item) => {
        // const returnItem = returnSaleInvoice?.map((rItem) =>
        // 	rItem.returnSaleInvoiceProduct.find(
        // 		(pItem) => pItem.productId === item.productId
        // 	)
        // )[0];

        const returnItem = returnSaleInvoice
          ?.map((rItem) =>
            rItem.returnSaleInvoiceProduct.find(
              (pItem) => pItem.productId === item.productId
            )
          )
          .reduce(
            (acc, item) => {
              if (item) {
                return {
                  productQuantity: acc.productQuantity + item.productQuantity,
                };
              } else {
                return acc;
              }
            },
            { productQuantity: 0 }
          );

        const itemCopy = { ...item };

        if (returnItem) {
          itemCopy.returnQuantity = 0;
          itemCopy.productQuantity =
            item.productQuantity - returnItem.productQuantity;
        } else {
          itemCopy.returnQuantity = 0;
          itemCopy.remainQuantity = item.productQuantity;
        }
        return itemCopy;
      });
      setList(list);
    }
  }, [singleSaleInvoice]);

  const submitHandler = useCallback(
    ({ note }) => {
      const payload = {
        saleInvoiceId: parseInt(id),
        note,
        date: moment(date._d).format(),

        returnSaleInvoiceProduct: Object.entries(formData).map(
          ([id, { value, price }]) => {
            return {
              productId: parseInt(id),
              productQuantity: value,
              productSalePrice: price,
            };
          }
        ),
      };

      const resp = addReturnSale(payload);
      resp.then((res) => {
        if (res === "success") {
          setLoading(false);
          navigate(-1);
        } else {
          setLoading(false);
        }
      });
    },

    [formData]
  );

  const updateHandler = useCallback(
    ({ id, value, price }) => {
      const item = list.find((item) => item.productId === id);
      if (item) {
        formData[id] = { value, price };
        item.returnQuantity = value;
        item.remainQuantity = item.productQuantity - value;
        setList([...list]);
        setFormData({ ...formData });
      }
    },

    [list]
  );

  const totalReturnQuantity = () => {
    return list.reduce((acc, item) => {
      return acc + item.returnQuantity * item.productSalePrice;
    }, 0);
  };

  // set total return amount to state from totalReturnQuantity
  useEffect(() => {
    setTotalReturnAmount(totalReturnQuantity());
  }, [list]);

  return (
    <div>
      <div className='mr-top'>
        {singleSaleInvoice ? (
          <Fragment key={singleSaleInvoice.id}>
            <Card bordered={false} className='criclebox h-full m-3'>
              <div className=' flex justify-between '>
                <h5 className='text-xl'>
                  <SolutionOutlined />
                  <span className='mr-left'>ID : {singleSaleInvoice.id} |</span>
                </h5>
              </div>
              <div className=''>
                <SaleProductListCard
                  formData={formData}
                  updateReturn={true}
                  returnOnChange={updateHandler}
                  list={list}
                />
                <div className='flex justify-between card-body'>
                  <div className='mb-auto'>
                    <p
                      className='mr-left'
                      style={{
                        backgroundColor: "#FDCCCC",
                        padding: "10px",
                        paddingRight: "20px",
                        borderRadius: "2px",
                      }}
                    >
                      Total Return Amount :
                      <strong>
                        {"  "}
                        {totalReturnAmount ? totalReturnAmount : 0}
                      </strong>
                    </p>
                  </div>
                  <div>
                    <Form
                      labelAlign='right'
                      labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 26,
                      }}
                      initialValues={{
                        date: dayjs(),
                      }}
                      form={form}
                      onFinish={submitHandler}
                      autoComplete='off'
                    >
                      <Form.Item name='date' label='Date' className='mb-2'>
                        <DatePicker
                          onChange={(date) => setDate(date._d)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item name='note' label='Note' className='mb-2'>
                        <Input.TextArea placeholder='Note' />
                      </Form.Item>

                      <Form.Item style={{ marginTop: "20px" }} className='mb-2'>
                        <Button
                          onClick={onClick}
                          htmlType='submit'
                          type='danger'
                          block
                          loading={loading}
                        >
                          Make A Return
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AddReturnSale;
