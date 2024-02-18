import { Button, Drawer, Layout, Space } from "antd";
import React, { useState } from "react";

const AddProductDrawer = ({ children, btnTitle, title }) => {
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
      <Button type='primary' className="h-[34px] leading-[33px] mx-[5px]"  onClick={showDrawer}>
        <span style={{ textAlign: "center" }}>+</span>
      </Button>
      <Drawer
        title={`Create a ${title}`}
        width={"50%"}
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
export default AddProductDrawer;
