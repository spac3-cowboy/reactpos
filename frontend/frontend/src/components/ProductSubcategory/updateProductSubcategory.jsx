import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { updateProductSubCategory } from "../../redux/rtk/features/productSubCategory/productSubCategorySlice";

function UpdateProductSubCategory({ subcategory }) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [initValues, setInitValues] = useState({
    name: subcategory.name,
  });
  const [loader, setLoader] = useState();
  const onFinish = async (values) => {
    setInitValues({});
    await dispatch(updateProductSubCategory({ id, values }));
    setLoader(false);
  };

  const onFinishFailed = (errorInfo) => {};

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <div className='text-center'>
        <div>
          <Form
            initialValues={{
              ...initValues,
            }}
            form={form}
            className='m-4'
            name='basic'
            layout='vertical'
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
                  message: "Please input Subcategory name!",
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
                shape='round'
                loading={loader}
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

export default UpdateProductSubCategory;
