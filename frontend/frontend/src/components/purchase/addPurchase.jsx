import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";

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

const AddPurchase = () => {
  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [due, setDue] = useState(0);

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
        navigate(`/admin/purchase/${resp.payload.data.id}`);
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

  const handlePaidAll = () => {
    form.setFieldsValue({ paidAmount: afterDiscount });
    setDue(0);
  };
  return (
    <Form
      form={form}
      className="w-full "
      name="dynamic_form_nest_item"
      onFinish={onFormSubmit}
      onFinishFailed={() => {
        setLoader(false);
      }}
      layout="vertical"
      size="large"
      autoComplete="off"
      initialValues={{
        paidAmount: 0,
        discount: 0,
        date: dayjs(),
      }}
    >
      <Products
        totalCalculator={totalCalculator}
        subTotal={subTotal}
        form={form}
        productList={productList}
        productLoading={productLoading}
      />
      <div className="flex gap-8 mt-10">
        <div className="w-1/2">
          <div className="flex gap-5 items-center">
            <div className="w-full flex items-center gap-2">
              <Form.Item
                label="Supplier "
                name="supplierId"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Please Select a supplier!",
                  },
                ]}
              >
                <Select
                  className="w-full"
                  loading={!allSuppliers}
                  showSearch
                  placeholder="Select a supplier "
                  optionFilterProp="children"
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
                className="-mb-[25px]"
                title="Add New Supplier"
                btnTitle={"Supplier"}
              >
                <AddSup drawer={true} />
              </BigDrawer>
            </div>

            <Form.Item
              name="date"
              label="Date"
              className="w-1/2"
              layout="horizental"
              required
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <DatePicker
                size="small"
                format={"YYYY-MM-DD"}
                className="date-picker"
              />
            </Form.Item>
          </div>

          <div className="-mt-4 flex gap-5 items-center">
            <Form.Item
              className="w-1/2"
              name="supplierMemoNo"
              label="Supplier Memo"
            >
              <Input className="w-full" placeholder="Memo no " />
            </Form.Item>

            <Form.Item className="w-1/2" name="note" label="Purchase Note">
              <Input className="w-full" placeholder="Note" />
            </Form.Item>
          </div>
        </div>

        <div className="py-2  w-1/2">
          <div className="p-1 flex justify-between">
            <strong>Total: </strong>
            <strong>{total.toFixed(2)}</strong>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="">Discount: </span>
            <Form.Item
              className="mb-0"
              name="discount"
              rules={[
                {
                  validator: validateDiscount,
                },
              ]}
            >
              <InputNumber
                className="w-52"
                onChange={() => totalCalculator()}
                size="small"
              />
            </Form.Item>
          </div>
          <div className="py-1 flex justify-between items-center">
            <span>After Discount: </span>
            <span>{afterDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="">Paid Amount: </span>
            <div className="w-72 flex items-center justify-between">
              <button
                className="bg-primary py-1 rounded px-2 text-white"
                type="button"
                onClick={handlePaidAll}
              >
                Paid All
              </button>
              <Form.Item
                className="mb-0"
                name="paidAmount"
                rules={[
                  {
                    validator: validatePaidAmount,
                  },
                ]}
              >
                <InputNumber
                  className="w-52"
                  onChange={() => totalCalculator()}
                  size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className="py-1 mb-4 flex justify-between">
            <strong>Due Amount:</strong>
            <strong>{due.toFixed(2)}</strong>
          </div>
          <Form.Item style={{ marginTop: "15px" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loader}
              onClick={() => setLoader(true)}
            >
              Purchase Product
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddPurchase;
