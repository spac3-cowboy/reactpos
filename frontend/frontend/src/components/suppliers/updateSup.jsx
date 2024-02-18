import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { updateSupplier } from "../../redux/rtk/features/supplier/supplierSlice";

function UpdateSup() {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loader, setLoader] = useState();
  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const onFinish = async (values) => {
    await dispatch(updateSupplier({ id, values }));
    setLoader(false);
  };

  return (
    <Fragment>
      <div className='text-center'>
        <div className=''>
          <Row className='mr-top'>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={14}
              className='border rounded column-design '
            >
              <Card bordered={false} className='criclebox h-full'>
                <Title level={3} className='m-3 text-center'>
                  Edit Supplier Form
                </Title>
                <Form
                  initialValues={{
                    ...data,
                  }}
                  form={form}
                  className='m-4'
                  name='basic'
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={() => setLoader(false)}
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
                        message: "Please input supplier name!",
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
                        message: "Please input supplier Phone!",
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
                        message: "Please input supplier Address!",
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
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateSup;
