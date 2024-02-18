import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Space } from "antd";
import React, { useState } from "react";

const BigDrawer = ({ children, btnTitle, title, className }) => {
  const { Content } = Layout;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        className={`${className ? className : ""} h-[34px] leading-[33px] mx-[5px]`}
        type='primary'
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        {btnTitle}
      </Button>
      <Drawer
        title={`Create a ${title}`}
        width={"40%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button className="h-[34px] leading-[33px] mx-[5px]" type='danger' onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }
      >
        <Content>{children}</Content>
      </Drawer>
    </>
  );
};
export default BigDrawer;
