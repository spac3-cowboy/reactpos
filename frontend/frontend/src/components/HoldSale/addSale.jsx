import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/rtk/features/customer/customerSlice";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import Products from "./Products";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { loadAllCouponValid } from "../../redux/rtk/features/Coupon/couponSlice";
import {
  loadAllHoldSalePaginated,
  updateHold,
} from "../../redux/rtk/features/holdSale/holdSaleSlice";
import { loadAllStaff } from "../../redux/rtk/features/user/userSlice";
import getStaffId from "../../utils/getStaffId";
import BigDrawer from "../Drawer/BigDrawer";
import AddCust from "../customer/addCust";

const AddSale = ({ holdSale, vatTaxList, vatTaxLoading, onClose }) => {
  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [afterVatTaxAdded, setAfterVatTaxAdded] = useState(0);
  const [due, setDue] = useState(0);
  const [isHold, setHold] = useState("false");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Form Function
  const [form] = Form.useForm();

  const allCustomer = useSelector((state) => state.customers.list);
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const { validList, loading: validLoading } = useSelector(
    (state) => state.coupon
  );

  const staffId = getStaffId();
  const [userId, setUserId] = useState(staffId);

  const allStaff = useSelector((state) => state.users.list);

  useEffect(() => {
    dispatch(loadAllStaff({ status: "true" }));
    dispatch(loadAllCustomer({ page: 1, count: 10 }));
    dispatch(loadProduct({ page: 1, count: 10 }));

    dispatch(loadAllCouponValid());
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
        userId: userId,
        isHold,
        saleInvoiceProduct: mergedArray,
      };
      const resp = await dispatch(
        updateHold({ id: holdSale.id, values: data })
      );
      setHold("false");
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        isHold === "false" && navigate(`/admin/sale/${resp.payload.data?.id}`);
        dispatch(loadAllHoldSalePaginated({ page: 1, count: 10 }));
        onClose();
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
        const vat = current?.productVat || 0;
        const totalVat = (vat / 100) * price * quantity;

        return [
          ...subTotal,
          {
            subVat: current?.productVat || 0,
            subPrice: price * quantity + totalVat,
          },
        ];
      }, []) || [];

    setSubTotal(subTotal);
    const total =
      subTotal.reduce((total, current) => total + current.subPrice, 0) || 0;

    setTotal(total);

    const afterDiscount = total
      ? total - (form.getFieldValue("discount") || 0) || 0
      : 0;
    setAfterDiscount(afterDiscount);

    // coupon calculate
    let afterCouponAdded = afterDiscount;
    const couponFiled = form.getFieldValue("couponCode");
    if (couponFiled) {
      const couponItem = validList?.find(
        (item) => item.couponCode === couponFiled
      );

      if (couponItem.type === "percentage") {
        afterCouponAdded =
          afterDiscount - (couponItem.value / 100) * afterDiscount;
      } else {
        afterCouponAdded = afterDiscount - couponItem.value;
      }
    }

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
    const afterVatTaxAdded =
      afterCouponAdded + (TotalTaxVatPercent / 100) * afterCouponAdded;

    setAfterVatTaxAdded(afterVatTaxAdded);

    //due count
    const due = afterCouponAdded
      ? afterVatTaxAdded - (form.getFieldValue("paidAmount") || 0) || 0
      : 0;
    setDue(due);
  };

  const handlePaidAll = () => {
    form.setFieldsValue({ paidAmount: afterVatTaxAdded });
    setDue(0);
  };

  const saleInvoiceProduct = holdSale.saleInvoiceProduct.map((item) => {
    return {
      ...item,
      unitMeasurement: item?.product?.unitMeasurement || 0,
      productVat: item?.product?.productVat,
    };
  });

  const saleInvoiceVat = holdSale.saleInvoiceVat.map(
    (item) => item.productVatId
  );
  const initialData = {
    ...holdSale,
    date: dayjs(holdSale?.date),
    saleInvoiceProduct: saleInvoiceProduct,
    vatId: saleInvoiceVat,
  };

  useEffect(() => {
    totalCalculator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      form={form}
      name='dynamic_form_nest_item'
      onFinish={onFormSubmit}
      onFinishFailed={() => {
        setLoader(false);
      }}
      size='large'
      autoComplete='off'
      initialValues={initialData}
    >
      <Products
        form={form}
        totalCalculator={totalCalculator}
        subTotal={subTotal}
        productList={productList}
        productLoading={productLoading}
      />
      <div className='flex gap-5 my-5'>
        <div className='w-1/2'>
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
              className={"mb-[25px]"}
              title={"new Customer"}
              btnTitle={"customer"}
            >
              <AddCust drawer={true} />
            </BigDrawer>
          </div>

          <div className='flex gap-5'>
            <Form.Item
              label='Date'
              required
              className='w-1/2'
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

            <Form.Item
              className='w-1/2'
              label='Sales Person '
              name='userId'
              required
            >
              <Select
                className='w-full'
                loading={!allStaff}
                showSearch
                placeholder='Select sales person '
                optionFilterProp='children'
                onChange={(value) => setUserId(value)}
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
        <div className='w-1/2'>
          {" "}
          <div className='py-2'>
            <div className='p-1 flex justify-between'>
              <strong>Total: </strong>
              <strong>{total.toFixed(2)} </strong>
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
                />
              </Form.Item>
            </div>
            <div className='py-1 flex justify-between items-center mb-1'>
              <span>After Discount: </span>
              <span>{afterDiscount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <span className=''>Vat/Tax: </span>
              <Form.Item className='mb-0 w-4/5 flex justify-end' name='vatId'>
                <Select
                  mode='multiple'
                  className='w-72 '
                  placeholder='Select Vat/Tax type'
                  maxTagCount={1}
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
            <div className='flex justify-between items-center mb-2'>
              <span className=''>Coupon Code: </span>
              <Form.Item
                className='mb-0 w-4/5 flex justify-end'
                name='couponCode'
              >
                <Select
                  className='w-72'
                  allowClear
                  placeholder='Select coupon code'
                  size={"small"}
                  loading={validLoading}
                  showSearch
                  onChange={() => totalCalculator()}
                >
                  {validList?.map((item) => (
                    <Option key={item.id} value={item.couponCode}>
                      <span className='italic'>{item.couponCode}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className='py-1 flex justify-between items-center mb-1'>
              <span>Total Payable: </span>
              <span>{afterVatTaxAdded.toFixed(2)}</span>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <span className=''>Paid Amount: </span>
              <div className='w-92 flex items-center justify-between gap-2'>
                <button
                  className='bg-primary py-1 rounded px-2 text-white'
                  type='button'
                  onClick={handlePaidAll}
                >
                  Paid All
                </button>
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
                    size={"small"}
                  />
                </Form.Item>
              </div>
            </div>
            <div className='py-1 mb-1 flex justify-between'>
              <strong>Due Amount:</strong>
              <strong>{due.toFixed(2)}</strong>
            </div>
          </div>
          <div className='flex gap-2'>
            <Form.Item style={{ marginTop: "15px" }} className='w-1/2'>
              <Button
                block
                type='primary'
                htmlType='button'
                loading={loader}
                onClick={() => {
                  setLoader(true);
                  setHold("true");
                  setTimeout(() => {
                    form.submit();
                  }, 0.5);
                }}
              >
                Save Draft
              </Button>
            </Form.Item>
            <Form.Item style={{ marginTop: "15px" }} className='w-1/2'>
              <Button
                block
                type='primary'
                htmlType='submit'
                loading={loader}
                onClick={() => setLoader(true)}
              >
                Sale Product
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AddSale;
