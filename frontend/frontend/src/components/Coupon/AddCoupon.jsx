import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";

import { Fragment } from "react";

import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSingleCoupon } from "../../redux/rtk/features/Coupon/couponSlice";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
  };

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addSingleCoupon(values));

      if (resp.payload.message === "success") {
        setLoading(false);
        form.resetFields();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(false);
  };

  return (
    <Fragment>
      <div className=" h-full">
        <Title level={4} className="m-2 text-center">
          Add Coupon
        </Title>
        <Form
          form={form}
          layout="vertical"
          style={{ marginLeft: "40px", marginRight: "40px" }}
          initialValues={{
            remember: true,
            startDate: dayjs(),
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Coupon Code"
            name="couponCode"
            rules={[
              {
                required: true,
                message: "Please input coupon code!",
              },
            ]}
          >
            <Input placeholder="Enter coupon code" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Type"
            name={"type"}
            rules={[
              {
                required: true,
                message: "Please select coupon type!",
              },
            ]}
          >
            <Select placeholder="Select type">
              <Select.Option key={"percentage"}>Percentage</Select.Option>
              <Select.Option key={"flat"}>Flat</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Value"
            name={"value"}
            rules={[
              {
                required: true,
                message: "Please input coupon value!",
              },
            ]}
          >
            <InputNumber size="small" placeholder="15" />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              label="Start Date"
              required
              className="w-1/2"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please input Start Date!",
                },
              ]}
            >
              <DatePicker
                label="StartDate"
                size="small"
                format={"YYYY-MM-DD"}
              />
            </Form.Item>
            <Form.Item
              label="End Date"
              required
              className="w-1/2"
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please input End Date!",
                },
              ]}
            >
              <DatePicker label="endDate" size="small" format={"YYYY-MM-DD"} />
            </Form.Item>
          </div>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-[24px]"
          >
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              shape="round"
              onClick={onClick}
            >
              Add Coupon
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};

export default AddCoupon;
