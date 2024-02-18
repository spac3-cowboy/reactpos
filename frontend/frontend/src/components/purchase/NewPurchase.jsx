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
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import { loadSuppliers } from "../../redux/rtk/features/supplier/supplierSlice";
import Products from "./Products";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { addPurchase } from "../../redux/rtk/features/purchase/purchaseSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddSup from "../suppliers/addSup";

const { Title } = Typography;

const NewPurchase = () => {
  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [due, setDue] = useState(0);

  const onClickLoading = () => {
    setLoader(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSuppliers({ status: true, page: 1, count: 10 }));
    dispatch(loadProduct({ status: true, page: 1, count: 10 }));
  }, [dispatch]);

  const allSuppliers = useSelector((state) => state.suppliers.list);
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );

  // Form Function
  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
    try {
      const mergedObject = values.purchaseInvoiceProduct.reduce(
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
        purchaseInvoiceProduct: mergedArray,
      };
      const resp = await dispatch(addPurchase(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        navigate(`/admin/purchase/${resp.payload.createdInvoiceId}`);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // validation handlers
  const validatePaidAmount = (_, value) => {
    if (value >= 0 && value <= afterDiscount) {
      return Promise.resolve();
    }
    return Promise.reject(
      `Paid amount must be gater than or equal ${afterDiscount}`
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
    const productArray = form.getFieldValue("purchaseInvoiceProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.productPurchasePrice || 0;
        return [...subTotal, price * quantity];
      }, []) || [];

    const total = subTotal.reduce((total, current) => total + current, 0) || 0;
    setSubTotal(subTotal);
    setTotal(total);

    const afterDiscount = total
      ? total - (form.getFieldValue("discount") || 0) || 0
      : 0;
    setAfterDiscount(afterDiscount);
    const due = afterDiscount
      ? afterDiscount - (form.getFieldValue("paidAmount") || 0) || 0
      : 0;
    setDue(due);
  };

  return (
    <Form
      form={form}
      className='m-lg-4'
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
      }}
    >
      <div className='md:flex gap-10 mx-4 py-5'>
        <div className='w-full'>
          <div className='md:flex w-full gap-5 items-center'>
            <div className='w-full flex items-center gap-2'>
              <Form.Item
                label='Supplier '
                name='supplierId'
                className='w-full'
                rules={[
                  {
                    required: true,
                    message: "Please Select a supplier!",
                  },
                ]}
              >
                <Select
                  className='w-full'
                  loading={!allSuppliers}
                  showSearch
                  placeholder='Select a supplier '
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {allSuppliers &&
                    allSuppliers.map((sup) => (
                      <Option key={sup.id} value={sup.id}>
                        {sup.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <BigDrawer
                className='-mb-[46px]'
                title='Add New Supplier'
                btnTitle={"Supplier"}
              >
                <AddSup drawer={true} />
              </BigDrawer>
            </div>

            <div className='w-full'>
              <Form.Item
                name='date'
                label='Date'
                className='flex w-full my-3 md:my-0'
                required
                rules={[
                  {
                    required: true,
                    message: "Please input Date!",
                  },
                ]}
              >
                <DatePicker
                  className='w-full'
                  size='small'
                  format={"YYYY-MM-DD"}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                />
              </Form.Item>
            </div>
          </div>

          <div className='flex gap-5 items-center my-5 mb-10'>
            <Form.Item
              className='w-1/2'
              name='supplierMemoNo'
              label='Supplier Memo'
            >
              <Input className='w-full' placeholder='Memo no ' />
            </Form.Item>

            <Form.Item className='w-1/2' name='note' label='Purchase Note'>
              <Input className='w-full' placeholder='Note' />
            </Form.Item>
          </div>
          <Products
            totalCalculator={totalCalculator}
            subTotal={subTotal}
            form={form}
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
                  className='w-52'
                  onChange={() => totalCalculator()}
                  defaultValue={0}
                  size='small'
                />
              </Form.Item>
            </div>
            <div className='py-1 flex justify-between items-center'>
              <span>After Discount: </span>
              <span>{afterDiscount.toFixed(2)} tk</span>
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
                  className='w-52'
                  onChange={() => totalCalculator()}
                  defaultValue={0}
                  size='small'
                />
              </Form.Item>
            </div>
            <div className='py-1 mb-4 flex justify-between'>
              <strong>Due Amount:</strong>
              <strong>{due.toFixed(2)} tk</strong>
            </div>
          </div>
          <Form.Item style={{ marginTop: "15px" }}>
            <Button
              block
              type='primary'
              htmlType='submit'
              loading={loader}
              onClick={() => {
                onClickLoading();
              }}
            >
              Purchase Product
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default NewPurchase;
