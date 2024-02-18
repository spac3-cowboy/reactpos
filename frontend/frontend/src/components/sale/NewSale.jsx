import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/rtk/features/customer/customerSlice";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import { addSale } from "../../redux/rtk/features/sale/saleSlice";
import Products from "./Products";

import dayjs from "dayjs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllSale } from "../../redux/rtk/features/sale/saleSlice";
import { loadAllStaff } from "../../redux/rtk/features/user/userSlice";
import { loadAllVatTax } from "../../redux/rtk/features/vatTax/vatTaxSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddCust from "../customer/addCust";

const { Title } = Typography;

const NewSale = () => {
  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [afterVatTaxAdded, setAfterVatTaxAdded] = useState(0);
  const [due, setDue] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Form Function
  const [form] = Form.useForm();

  const allCustomer = useSelector((state) => state.customers.list);
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );

  const allStaff = useSelector((state) => state.users.list);
  const { list: vatTaxList, loading: vatTaxLoading } = useSelector(
    (state) => state.vatTax
  );
  useEffect(() => {
    dispatch(loadAllStaff({ status: "true" }));
    dispatch(loadAllCustomer({ page: 1, count: 10 }));
    dispatch(loadProduct({ page: 1, count: 10 }));
    dispatch(loadAllVatTax());
  }, [dispatch]);

  const onFormSubmit = async (values) => {
    try {
      const mergedObject = values.saleInvoiceProduct.reduce(
        (accumulator, currentObject) => {
          const productId = currentObject.productId;
          if (!accumulator[productId]) {
            accumulator[productId] = { ...currentObject };
          } else {
            accumulator[productId].productQuantity +=
              currentObject.productQuantity;
          }
          return accumulator;
        },
        {}
      );

      const mergedArray = Object.values(mergedObject);
      const data = {
        ...values,
        saleInvoiceProduct: mergedArray,
      };
      const resp = await dispatch(addSale(data));

      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        dispatch(
          loadAllSale({
            page: 1,
            count: "",
            startdate: moment().format("YYYY-MM-DD"),
            enddate: moment().format("YYYY-MM-DD"),
            user: "",
          })
        );
        navigate(`/admin/sale/${resp.payload.createdInvoiceId}`);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // validation handlers
  const validatePaidAmount = (_, value) => {
    if (value >= 0 && value <= afterVatTaxAdded) {
      return Promise.resolve();
    }
    return Promise.reject(
      `Paid amount must be gater than or equal ${afterVatTaxAdded}`
    );
  };
  const validateDiscount = (_, value) => {
    if (value >= 0 && value <= total) {
      return Promise.resolve();
    }
    return Promise.reject(`Discount must be gater than or equal ${total}`);
  };

  // total calculate
  const totalCalculator = () => {
    const productArray = form.getFieldValue("saleInvoiceProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.productSalePrice || 0;
        return [...subTotal, price * quantity];
      }, []) || [];

    const total = subTotal.reduce((total, current) => total + current, 0) || 0;
    setSubTotal(subTotal);
    setTotal(total);

    const afterDiscount = Boolean(total)
      ? total - (form.getFieldValue("discount") || 0) || 0
      : 0;
    setAfterDiscount(afterDiscount);

    // vat tax calculate
    const vatFields = form.getFieldValue("vatId");
    const totalVatArray =
      vatFields?.map((id) => {
        return vatTaxList.find((item) => id === item.id)?.percentage;
      }) || [];
    const TotalTaxVatPercent = totalVatArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const afterVatTaxAdded = afterDiscount + (TotalTaxVatPercent / 100) * total;
    setAfterVatTaxAdded(afterVatTaxAdded);

    //due count
    const due = Boolean(afterVatTaxAdded)
      ? afterVatTaxAdded - (form.getFieldValue("paidAmount") || 0) || 0
      : 0;
    setDue(due);
  };

  return (
    <Form
      form={form}
      name='dynamic_form_nest_item'
      onFinish={onFormSubmit}
      onFinishFailed={() => {
        setLoader(false);
      }}
      layout='vertical'
      size='large'
      autoComplete='off'
      initialValues={{
        paidAmount: 0,
        discount: 0,
        date: dayjs(),
        vatId: [],
      }}
    >
      <div className='md:flex gap-10 my-5 mx-4'>
        <div className='w-full md:w-3/5'>
          <div className='flex gap-3 items-center'>
            <Form.Item
              label='Customer'
              className='w-full'
              name='customerId'
              rules={[
                {
                  required: true,
                  message: "Please Select a Customer!",
                },
              ]}
            >
              <Select
                className='w-full'
                loading={!allCustomer}
                showSearch
                placeholder='Select a customer '
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {allCustomer &&
                  allCustomer?.map((sup) => (
                    <Option key={sup.id} value={sup.id}>
                      {sup.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <BigDrawer
              className={"-mb-[46px]"}
              title={"new Customer"}
              btnTitle={"customer"}
              children={<AddCust drawer={true} />}
            />
          </div>

          <div className='grid grid-cols-2 w-full gap-5'>
            <Form.Item
              label='Date'
              required
              name='date'
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <DatePicker
                style={{ marginBottom: "10px" }}
                label='date'
                size='small'
                format={"YYYY-MM-DD"}
              />
            </Form.Item>

            <Form.Item label='Sales Person ' name='userId'>
              <Select
                loading={!allStaff}
                showSearch
                placeholder='Select sales person '
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {allStaff &&
                  allStaff?.map((info) => (
                    <Option key={info.id} value={info.id}>

                      {info.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          <div className='grid grid-cols-2 w-full gap-5'>
            <Form.Item className='' label='Shipping Address' name='address'>
              <Input
                className=''
                placeholder='Enter shipping address'
                size={"small"}
                style={{ marginBottom: "10px" }}
              />
            </Form.Item>

            <Form.Item className='' label='Note' name='note'>
              <Input
                className=''
                size={"small"}
                placeholder='Write sale Note'
                style={{ marginBottom: "10px" }}
                label='note'
              />
            </Form.Item>
          </div>
          <Products
            form={form}
            totalCalculator={totalCalculator}
            subTotal={subTotal}
            productList={productList}
            productLoading={productLoading}
          />
        </div>
        <div className='w-full md:w-2/5'>
          <div className='py-2'>
            <div className='p-1 flex justify-between'>
              <strong>Total: </strong>
              <strong>{total.toFixed(2)} tk</strong>
            </div>
            <div className='flex justify-between items-center py-2'>
              <span className=''>Discount: </span>
              <Form.Item
                className='mb-0'
                name='discount'
                rules={[
                  {
                    validator: validateDiscount,
                  },
                ]}
              >
                <InputNumber
                  className='w-72'
                  size={"small"}
                  onChange={() => totalCalculator()}
                  defaultValue={0}
                />
              </Form.Item>
            </div>
            <div className='py-1 flex justify-between items-center mb-1'>
              <span>After Discount: </span>
              <span>{afterDiscount.toFixed(2)} tk</span>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <span className=''>Vat/Tax: </span>
              <Form.Item className='mb-0 w-4/5 flex justify-end' name='vatId'>
                <Select
                  mode='multiple'
                  className='w-72 '
                  placeholder='Select Vat/Tax type'
                  maxTagCount={5}
               
                  size={"small"}
                  loading={vatTaxLoading}
                  onChange={() => totalCalculator()}
                >
                  {vatTaxList?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.title}
                      <span className='italic'>@{item.percentage}%</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className='py-1 flex justify-between items-center mb-1'>
              <span>Total Payable: </span>
              <span>{afterVatTaxAdded.toFixed(2)} tk</span>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <span className=''>Paid Amount: </span>
              <Form.Item
                className='mb-0'
                name='paidAmount'
                rules={[
                  {
                    validator: validatePaidAmount,
                  },
                ]}
              >
                <InputNumber
                  className='w-72'
                  onChange={() => totalCalculator()}
                  defaultValue={0}
                  size={"small"}
                />
              </Form.Item>
            </div>
            <div className='py-1 mb-1 flex justify-between'>
              <strong>Due Amount:</strong>
              <strong>{due.toFixed(2)} tk</strong>
            </div>
          </div>
          <Form.Item style={{ marginTop: "15px" }}>
            <Button
              disabled={loader}
              block
              type='primary'
              htmlType='submit'
              loading={loader}
            >
              Sale Product
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form >
  );
};

export default NewSale;
