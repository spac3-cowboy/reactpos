import { Button, ColorPicker, Form, Input, Typography } from "antd";

import { Fragment } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSingleColor } from "../../redux/rtk/features/color/colorSlice";

const AddProductColor = ({ drawer }) => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [colorCode, setColorCode] = useState("#1677FF");
  const onClick = () => {
    setLoading(true);
  };

  const onFinish = async (values) => {
    const data = {
      ...values,
      colorCode,
    };
    data.status = true;
    try {
      const resp = await dispatch(addSingleColor(data));

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
      <div className=' h-full'>
        <Title level={4} className='m-2 text-center'>
          Add Product Color
        </Title>
        <Form
          form={form}
          layout='vertical'
          style={{ marginLeft: "40px", marginRight: "40px" }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          labelAlign='left'
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: "Please input color name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Color Code'
            required
          >
            <ColorPicker
              showText
              format='hex'
              onChange={(code) => {
                setColorCode(code.toHexString());
              }}
              presets={[
                {
                  label: "Recommended",
                  colors: [
                    "#000000",
                    "#000000E0",
                    "#000000A6",
                    "#00000073",
                    "#00000040",
                    "#00000026",
                    "#0000001A",
                    "#00000012",
                    "#0000000A",
                    "#00000005",
                    "#F5222D",
                    "#FA8C16",
                    "#FADB14",
                    "#8BBB11",
                    "#52C41A",
                    "#13A8A8",
                    "#1677FF",
                    "#2F54EB",
                    "#722ED1",
                    "#EB2F96",
                    "#F5222D4D",
                    "#FA8C164D",
                    "#FADB144D",
                    "#8BBB114D",
                    "#52C41A4D",
                    "#13A8A84D",
                    "#1677FF4D",
                    "#2F54EB4D",
                    "#722ED14D",
                    "#EB2F964D",
                  ],
                },
                {
                  label: "Recent",
                  colors: [],
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className='flex justify-center mt-[24px]'
          >
            <Button
              loading={loading}
              type='primary'
              htmlType='submit'
              shape='round'
              onClick={onClick}
            >
              Add Color
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};

export default AddProductColor;
