import { EditOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateColor } from "../../redux/rtk/features/color/colorSlice";

function UpdateProductColor({ data, id }) {
  const dispatch = useDispatch();
  //Loading Old data from URL
  const { name, colorCode } = data;
  const [form] = Form.useForm();
  const [loader, setLoader] = useState();
  const [updatedColorCode, setUpdatedColorCode] = useState(colorCode);

  const [initValues, setInitValues] = useState({
    name: name,
    colorCode: colorCode,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    const data = { ...values, colorCode: updatedColorCode };
    await dispatch(updateColor({ id, data }));
    setIsModalOpen(false);
    setLoader(false);
    setInitValues({
      name: values.name,
      colorCode: updatedColorCode,
    });
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
        title='Edit Color'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
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
                message: "Please input Color name!",
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
              defaultValue={initValues.colorCode}
              onChange={(code) => {
                setUpdatedColorCode(code.toHexString());
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
      </Modal>
    </>
  );
}

export default UpdateProductColor;
