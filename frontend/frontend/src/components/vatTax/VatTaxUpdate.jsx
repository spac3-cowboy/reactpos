import { Button, Card, Form, Input, InputNumber } from "antd";

import { Fragment } from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVatTax } from "../../redux/rtk/features/vatTax/vatTaxSlice";

const VatTaxUpdate = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { edit } = useSelector((state) => state.vatTax);

  const onFinish = async (values) => {
    await dispatch(updateVatTax({ id: edit.id, values }));
    handleCancel();
    setLoading(false);
  };

  const onFinishFailed = () => {
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldValue("title", edit.title);
    form.setFieldValue("percentage", edit.percentage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  return (
    <Fragment>
      <Card bordered={false} className='h-full'>
        <Form
          form={form}
          className=''
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: "Please enter vat/tax type name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Percentage'
            name='percentage'
            rules={[
              {
                required: true,
                message: "Please enter vat/tax percentage name!",
              },
            ]}
          >
            <InputNumber className='w-full' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className='flex justify-center mt-6'
          >
            <Button
              type='primary'
              htmlType='submit'
              shape='round'
              loading={loading}
              onClick={() => setLoading(true)}
            >
              Update Vat/Tax Type
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Fragment>
  );
};

export default VatTaxUpdate;
