import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateProductBrand } from "../../redux/rtk/features/productBrand/productBrandSlice";

function UpdateProductBrand({ brand }) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState();
  const [initValues, setInitValues] = useState({
    name: brand.name,
  });

  const onFinish = async (values) => {
    try {
      await dispatch(updateProductBrand({ id, values }));
      setInitValues({});
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const onFinishFailed = () => {};

  return (
    <>
      <div className='text-center'>
        <div className=''>
          <Form
            initialValues={{
              ...initValues,
            }}
            form={form}
            layout='vertical'
            name='basic'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              style={{ marginBottom: "10px" }}
              fields={[{ name: "Name" }]}
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: "Please input Category name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: "10px" }}>
              <Button
                onClick={() => setLoader(true)}
                block
                type='primary'
                htmlType='submit'
                loading={loader}
                shape='round'
              >
                Update Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default UpdateProductBrand;
