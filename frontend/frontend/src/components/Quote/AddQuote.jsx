import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import Products from "./Products";
import { useState } from "react";
import { addQuote, loadAllQuote } from "../../redux/rtk/features/quote/quoteSlice";
import { loadAllStaff } from "../../redux/rtk/features/user/userSlice";

export default function AddQuote() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);

   const allStaff = useSelector((state) => state.users.list);
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const totalCalculator = () => {
    const productArray = form.getFieldValue("quoteProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.unitPrice || 0;
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

  };


  useEffect(() => {
    dispatch(loadAllStaff({ status: "true" }));
    dispatch(loadProduct({ page: 1, count: 10 }));
  }, [dispatch]);



  const onFormSubmit = async(values) => {
    const resp = await dispatch(addQuote(values));
    if (resp.payload.message == "success") {
      dispatch(loadAllQuote({ status: true, page: 1, count: 10 }));
      form.resetFields();
    }
  };
  return (
    <div className="px-5">
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFormSubmit}
        onFinishFailed={() => {
          // setLoader(false);
        }}
        size="large"
        autoComplete="off"
        layout="vertical"
      >
        <div className="-mt-5 flex justify-between gap-8">
          <Form.Item
            label="Quote Name"
            name="quoteName"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input quote name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quote Owner"
            name="quoteOwnerId"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input quote owner!",
              },
            ]}
          >
            <Select
              className="w-full"
              loading={!allStaff}
              showSearch
              placeholder="Select a customer "
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {allStaff &&
                allStaff?.map((sup) => (
                  <Select.Option key={sup.id} value={sup.id}>
                    {sup.username}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div className="-mt-5 flex justify-between gap-8">
          <Form.Item
            label="Quote Date"
            name="quoteDate"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input quote date!",
              },
            ]}
          >
            <DatePicker placeholder="Select Quotation date" />
          </Form.Item>

          <Form.Item
            label="Expiration date"
            name="expirationDate"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input quote expire date!",
              },
            ]}
          >
            <DatePicker placeholder="Select Expiration Date" />
          </Form.Item>
        </div>
        <div className="-mt-5">
          <Form.Item
            label="Terms And Conditions"
            name="termsAndConditions"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input quote terms and conditions!",
              },
            ]}
          >
            <Input placeholder="Terms" />
          </Form.Item>
        </div>
        <div className="-mt-5 ">
          <Form.Item
            label="Description"
            name="description"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input quote description!",
              },
            ]}
          >
            <Input.TextArea placeholder="description" rows={3} />
          </Form.Item>
        </div>

        <Products
          form={form}
          totalCalculator={totalCalculator}
          subTotal={subTotal}
          productList={productList}
          productLoading={productLoading}
        />

        <div>
          <div className="flex justify-between my-1 text-[16px] font-medium">
            <span>Total:</span>
            <span className="pr-2">{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center my-1text-[16px] font-medium">
            <span>Discount:</span>
            <Form.Item name="discount">
              <InputNumber
                className="mt-4"
                onChange={() => totalCalculator()}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between my-1 text-[16px] font-medium">
            <span>Total Amount:</span>
            <span className="pr-2">{afterDiscount.toFixed(2)}</span>
          </div>
        </div>

        <div className="">
          <Form.Item style={{ marginTop: "15px" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={productLoading}
            >
              Create
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
