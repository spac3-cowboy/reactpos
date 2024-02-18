import { Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { updateCustomer } from "../../redux/rtk/features/customer/customerSlice";

function UpdateCust() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState();
  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const onFinish = async (values) => {
    await dispatch(updateCustomer({id, values}));
    setLoader(false);
  };

  return (
    <>
      <div className='text-center'>
        <div className=''>
          <Row className='mr-top'>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={14}
              className='border rounded column-design'
            >
              <Title level={3} className='m-4 text-center'>
                Edit Customer Form
              </Title>
              <Form
                initialValues={data}
                form={form}
                className='m-6'
                name='basic'
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
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
                      message: "Please input customer name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Phone'
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: "Please input customer Phone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Address'
                  name='address'
                  rules={[
                    {
                      required: true,
                      message: "Please input customer Address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 5,
                    span: 16,
                  }}
                >
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
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default UpdateCust;
