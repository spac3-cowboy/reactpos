import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCoupon } from "../../redux/rtk/features/Coupon/couponSlice";

function UpdateCoupon({ data, id }) {
  const dispatch = useDispatch();

  const { couponCode, type, value, startDate, endDate } = data;
  const [form] = Form.useForm();
  const [loader, setLoader] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [initValues, setInitValues] = useState({
    couponCode: couponCode,
    type: type,
    value: value,
    startDate: dayjs(startDate, "YYYY-MM-DD"),
    endDate: dayjs(endDate, "YYYY-MM-DD"),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const data = {
      ...values,
      startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
    };
    await dispatch(updateCoupon({ id, values: data }));
    setIsModalOpen(false);
    setLoader(false);
  };

  const onFinishFailed = () => {
    setLoader(false);
  };

  return (
    <>
      <EditOutlined
        onClick={showModal}
        className='bg-gray-600 p-2 text-white rounded-md'
        style={{ fontSize: "15px" }}
      />

      <Modal
        title='Edit Coupon'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          layout='vertical'
          style={{ marginLeft: "40px", marginRight: "40px" }}
          initialValues={initValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          labelAlign='left'
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Coupon Code'
            name='couponCode'
            rules={[
              {
                required: true,
                message: "Please input coupon code!",
              },
            ]}
          >
            <Input placeholder='Select coupon code' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Type'
            name={"type"}
            required
          >
            <Select>
              <Select.Option key={"percentage"}>Percentage</Select.Option>
              <Select.Option key={"flat"}>Flat</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Value'
            name={"value"}
            required
            rules={[
              {
                required: true,
                message: "Please input coupon Value!",
              },
            ]}
          >
            <InputNumber size='small' placeholder='15' />
          </Form.Item>

          <div className='flex gap-4'>
            <Form.Item
              label='Start Date'
              required
              className='w-1/2'
              name='startDate'
              rules={[
                {
                  required: true,
                  message: "Please input Start Date!",
                },
              ]}
            >
              <DatePicker
                label='StartDate'
                size='small'
                format={"YYYY-MM-DD"}
              />
            </Form.Item>
            <Form.Item
              label='End Date'
              required
              className='w-1/2'
              name='endDate'
              rules={[
                {
                  required: true,
                  message: "Please input End Date!",
                },
              ]}
            >
              <DatePicker label='endDate' size='small' format={"YYYY-MM-DD"} />
            </Form.Item>
          </div>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className='flex justify-center mt-[24px]'
          >
            <Button
              loading={loader}
              onClick={() => setLoader(true)}
              type='primary'
              htmlType='submit'
              shape='round'
            >
              Update Coupon
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateCoupon;
