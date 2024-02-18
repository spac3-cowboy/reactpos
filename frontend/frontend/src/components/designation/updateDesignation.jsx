import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { updateDesignation } from "../../redux/rtk/features/designation/designationSlice";

function UpdateDesignation() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const cust = data;
  const [initValues, setInitValues] = useState({
    name: cust.name,
    phone: cust.phone,
    address: cust.address,
    dueAmount: cust.dueAmount,
  });

  const onFinish = async (values) => {
    await dispatch(updateDesignation(id, values));
    setLoader(false);
    setInitValues({});
  };

  return (
    <>
      <div className='text-center'>
        <Card className='mt-2'>
          <Row className='mr-top'>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={10}
              xl={10}
              className='border rounded column-design '
            >
              <Title level={3} className='m-3 text-center'>
                Edit Designation Form
              </Title>
              <Form
                initialValues={{
                  ...initValues,
                }}
                form={form}
                className='m-4'
                name='basic'
                labelCol={{
                  span: 8,
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
                      message: "Please input Designation name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 8,
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
        </Card>
      </div>
    </>
  );
}

export default UpdateDesignation;
