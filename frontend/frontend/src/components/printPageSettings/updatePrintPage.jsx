import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePrintPage } from "../../redux/rtk/features/printPage/printPageSlice";

function UpdatePrintPage({ data, id }) {
  const dispatch = useDispatch();

  const { pageSizeName, width, height } = data;
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [UpdatePageSizeName, setUpdatePageSizeName] = useState(pageSizeName);
  const [UpdateWidth, setUpdateWidth] = useState(width);
  const [UpdateHeight, setUpdateHeight] = useState(height);
  
  const [initValues, setInitValues] = useState({
    pageSizeName: pageSizeName,
    width: width,
    height: height,
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

  const onFinish = async () => {
    const data = {
      pageSizeName: UpdatePageSizeName,
      width: UpdateWidth,
      height: UpdateHeight,
    };
    await dispatch(updatePrintPage({ id, data }));
    setIsModalOpen(false);
    setLoader(false);
    setInitValues({
      pageSizeName: UpdatePageSizeName,
      width: UpdateWidth,
      height: UpdateHeight,
    });
  };

  const onFinishFailed = () => {
    setLoader(false);
  };

  return (
    <>
      <EditOutlined
        onClick={showModal}
        className="bg-gray-600 p-2 text-white rounded-md"
        style={{ fontSize: "15px" }}
      />

      <Modal
        title="Edit Print Page"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginLeft: "40px", marginRight: "40px" }}
          initialValues={{
            ...initValues,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Page Size Name"
            name="pageSizeName"
            onChange={(e) => setUpdatePageSizeName(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input page size name!",
              },
            ]}
          >
            <Input placeholder="page name" />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              label="Width"
              required
              className="w-1/2"
              name="width"
              onChange={(e) => setUpdateWidth(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input Page Width!",
                },
              ]}
            >
              <InputNumber placeholder="Input width in inches" />
            </Form.Item>
            <Form.Item
              label="Height"
              required
              className="w-1/2"
              name="height"
              onChange={(e) => setUpdateHeight(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input page height!",
                },
              ]}
            >
              <InputNumber placeholder="Input height in inches" />
            </Form.Item>
          </div>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-[24px]"
          >
            <Button
              loading={loader}
              onClick={() => setLoader(true)}
              type="primary"
              htmlType="submit"
              shape="round"
            >
              Update Print Page
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdatePrintPage;
