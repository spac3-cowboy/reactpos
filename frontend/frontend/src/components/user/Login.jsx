import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/rtk/features/user/userSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;

  const onFinish = async (values) => {
    const resp = await dispatch(addUser(values));
    if (resp.payload.message === "success") {
      setLoader(false);
      window.location.href = "/admin/dashboard";
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    toast.error("Error at login Please try again");
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <>
      <Row className='card-row'>
        <Col span={24}>
          <Card bordered={false} className="w-full max-w-[30rem] mt-[30px] mx-auto">
            <Title level={3} className='m-3 text-center'>
              Login
            </Title>
            <Form
              name='basic'
              onFinish={onFinish}
              style={{ marginLeft: "20px", marginRight: "20px" }}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                className='mb-4'
                name='username'
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder='Enter username' />
              </Form.Item>

              <Form.Item
                className='mb-2'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                  },
                ]}
              >
                <Input.Password placeholder='Enter Password' />
              </Form.Item>

              <Form.Item className="flex justify-center">
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Submit
                </Button>
              </Form.Item>

              <div className='flex justify-center my-5'>
                <LoginTable />
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
