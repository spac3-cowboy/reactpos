import { Button, DatePicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "./Products";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { addAdjustInventory } from "../../redux/rtk/features/adjustInventory/adjustInventorySlice";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import getStaffId from "../../utils/getStaffId";

const AddAdjustInventory = () => {
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const id = getStaffId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct({ status: true, page: 1, count: 10 }));
  }, [dispatch]);

  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );

  // Form Function
  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
    try {
      const mergedObject = values.adjustInvoiceProduct.map((item) => {
        return {
          productId: item.productId,
          adjustType: item.adjustType,
          adjustQuantity: item.adjustQuantity,
        };
      });

      const mergedArray = Object.values(mergedObject);

      const data = {
        ...values,
        userId: id,
        adjustInvoiceProduct: mergedArray,
      };
      const resp = await dispatch(addAdjustInventory(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        navigate(`/admin/adjust-inventory/${resp.payload.data.id}`);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // total calculate
  const totalCalculator = () => {
    const productArray = form.getFieldValue("adjustInvoiceProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const price = current.productPurchasePrice || 0;
        const adjustType = current.adjustType;
        const adjustQuantity = current.adjustQuantity || 0;
        const multiple = price * adjustQuantity;
        let total = 0;
        if (adjustType === "increment") {
          total = price * adjustQuantity;
        } else if (adjustType === "decrement") {
          total = price * adjustQuantity;
        } else {
          total = multiple;
        }

        return [...subTotal, { total, adjustType }];
      }, []) || [];

    setSubTotal(subTotal);
  };

  return (
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
      initialValues={{
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
      <div className='flex gap-8 mt-10'>
        <Form.Item
          name='date'
          label='Date'
          className='w-1/3'
          required
          rules={[
            {
              required: true,
              message: "Please input Date!",
            },
          ]}
        >
          <DatePicker
            size='small'
            format={"YYYY-MM-DD"}
            className='date-picker'
          />
        </Form.Item>
        <Form.Item className='w-1/3' name='note' label='Note'>
          <Input className='w-full' placeholder='Note' />
        </Form.Item>

        <Form.Item className='w-1/3' label=' '>
          <Button
            block
            type='primary'
            htmlType='submit'
            loading={loader}
            onClick={() => setLoader(true)}
          >
            Adjust Inventory
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddAdjustInventory;
