import { Button, Form, Input, Typography } from "antd";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addRole, getRoles } from "./roleApis";

const AddRole = ({ drawer }) => {
  const [list, setList] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getRoles()
      .then((d) => setList(d))
      .catch(() => {});
  }, []);

  const { Title } = Typography;

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await addRole(values);

    if (resp.message === "success") {
      setLoader(false);
      const newList = [...list];
      newList.push(resp.data);
      setList(newList);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding role");
    setLoader(false);
  };
  return (
    <>
      <Title level={4} className='m-2 mt-5 text-center'>
        Add New Role
      </Title>
      <Form
        eventKey='role-form'
        name='basic'
        // labelCol={{
        //   span: 6,
        // }}
        // wrapperCol={{
        //   span: 12,
        // }}
        layout='vertical'
        style={{ marginLeft: "40px", marginRight: "40px" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div>
          <Form.Item
            style={{ marginBottom: "20px" }}
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button
              onClick={() => setLoader(true)}
              type='primary'
              size='small'
              htmlType='submit'
              block
              loading={loader}
            >
              Add New Role
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default AddRole;
