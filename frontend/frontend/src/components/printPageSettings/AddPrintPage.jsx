import {
  Button,
  Form,
  Input,
  InputNumber,
  Typography,
} from "antd";

import { Fragment } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSinglePrintPage } from "../../redux/rtk/features/printPage/printPageSlice";

const AddPrintPage = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
  };

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addSinglePrintPage(values));

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
          Add Print Page
        </Title>
        <Form
          form={form}
          layout="vertical"
          style={{ marginLeft: "40px", marginRight: "40px" }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Page Name"
            name="pageSizeName"
            rules={[
              {
                required: true,
                message: "Please input print Page Name !",
              },
            ]}
          >
            <Input placeholder="Enter Page Name" />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              label="Width"
              required
              className="w-1/2"
              name="width"
              rules={[
                {
                  required: true,
                  message: "Please input page width!",
                },
              ]}
            >
              <InputNumber size="small" placeholder="width in inches" />
            </Form.Item>
            <Form.Item
              label="Height"
              required
              className="w-1/2"
              name="height"
              rules={[
                {
                  required: true,
                  message: "Please input height!",
                },
              ]}
            >
              <InputNumber size="small" placeholder="height in inches" />
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
              Add Print Page
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};

export default AddPrintPage;
