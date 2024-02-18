import { Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPurchaseOrder } from "../../redux/rtk/features/productSortList/ProductSortListSlice";
import ProductAdd from "./Products";

export default function AddPurchaseOrder({ list }) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState([]);

  // Form Function
  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
    const data = values.products.map((item) => {
      return {
        productId: item.id,
        productQuantity: item.productQuantity,
      };
    });
    try {
      const resp = await dispatch(addPurchaseOrder(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        navigate(
          `/admin/purchase-reorder-invoice/${resp.payload.data[0]?.reorderInvoiceId}`
        );
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const totalCalculator = () => {
    const productArray = form.getFieldValue("products");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.productPurchasePrice || 0;
        return [...subTotal, price * quantity];
      }, []) || [];

    setSubTotal(subTotal);
  };
  useEffect(() => {
    form.setFieldsValue({ products: list });
    totalCalculator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, list]);
  return (
    <div>
      <Form
        form={form}
        className='w-full '
        name='dynamic_form_nest_item'
        onFinish={onFormSubmit}
        onFinishFailed={() => {
          setLoader(false);
        }}
        layout='vertical'
        size='large'
        autoComplete='off'
        initialValues={{}}
      >
        <ProductAdd
          subTotal={subTotal}
          form={form}
          totalCalculator={totalCalculator}
        />

        <Form.Item style={{ marginTop: "15px" }}>
          <Button
            block
            type='primary'
            htmlType='submit'
            loading={loader}
            onClick={() => setLoader(true)}
          >
            Create Purchase Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
