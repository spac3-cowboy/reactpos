import { SolutionOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadSinglePurchase } from "../../redux/rtk/features/purchase/purchaseSlice";
import PurchaseProductListCard from "../Card/purchaseInvoice/PurchaseProductListCard";
import Loader from "../loader/loader";
import { addReturnPurchase } from "./returnPurchase.api";

const AddReturnPurchase = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [totalReturnAmount, setTotalReturnAmount] = useState(0);
  // make a button click fucnciton to set loading to true
  const onClick = () => {
    setLoading(true);
  };

  //dispatch
  const dispatch = useDispatch();
  const purchase = useSelector((state) => state.purchases.purchase);

  const { singlePurchaseInvoice, returnPurchaseInvoice } = purchase
    ? purchase
    : {};
  const [list, setList] = useState([]);
  const [date, setDate] = useState(moment());

  const [form] = Form.useForm();
  const nameValue = Form.useWatch("name", form);

  useEffect(() => {
    dispatch(loadSinglePurchase(id));
  }, [id]);

  useEffect(() => {
    if (singlePurchaseInvoice) {
      const list = singlePurchaseInvoice.purchaseInvoiceProduct.map((item) => {
        // const returnItem = returnPurchaseInvoice?.map((rItem) =>
        // 	rItem.returnPurchaseInvoiceProduct.find(
        // 		(pItem) => pItem.productId === item.productId
        // 	)
        // )[0];

        const returnItem = returnPurchaseInvoice
          ?.map((rItem) =>
            rItem.returnPurchaseInvoiceProduct.find(
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
            itemCopy.productQuantity - returnItem.productQuantity;
        } else {
          itemCopy.returnQuantity = 0;
          itemCopy.remainQuantity = item.productQuantity;
        }
        return itemCopy;
      });
      setList(list);
    }
  }, [singlePurchaseInvoice]);

  const submitHandler = useCallback(
    ({ note }) => {
      const payload = {
        purchaseInvoiceId: id,
        note,
        date: moment(date._d).format(),

        returnPurchaseInvoiceProduct: Object.entries(formData).map(
          ([id, { value, price }]) => {
            return {
              productId: id,
              productQuantity: value,
              productPurchasePrice: price,
            };
          }
        ),
      };
      const resp = addReturnPurchase(payload);
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
      return acc + item.returnQuantity * item.productPurchasePrice;
    }, 0);
  };

  // set total return amount to state from totalReturnQuantity
  useEffect(() => {
    setTotalReturnAmount(totalReturnQuantity());
  }, [list]);

  return (
    <div>
      <div className='mr-top'>
        {singlePurchaseInvoice ? (
          <Fragment key={singlePurchaseInvoice.id}>
            <Card bordered={false} className='criclebox h-full m-3'>
              <div className='flex justify-between'>
                <h5 className='text-xl'>
                  <SolutionOutlined />
                  <span className='mr-left'>
                    ID : {singlePurchaseInvoice.id} |
                  </span>
                </h5>
              </div>
              <div className=''>
                <PurchaseProductListCard
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
                  <div className='mr-right'>
                    <Form
                      labelAlign='right'
                      labelCol={{
                        span: 4,
                      }}
                      initialValues={{
                        date: dayjs(new Date()),
                      }}
                      wrapperCol={{
                        span: 26,
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

export default AddReturnPurchase;
