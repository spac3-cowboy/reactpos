import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import moment from "moment";
import { toast } from "react-toastify";
import { addCustomerPayment } from "../../redux/rtk/features/customerPayment/customerPaymentSlice";

const AddCustPaymentByInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pid } = useParams();
  const { dueAmount } = location?.state;

  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();

  let [date, setDate] = useState(moment());
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    try {
      const data = {
        date: date,
        ...values,
      };

      const resp = await dispatch(addCustomerPayment(data));

      if (resp.payload.message === "success") {
        navigate(-1);
        setLoader(false);
        toast.success("Payment Added Successfully");
      }

      form.resetFields();
    } catch (error) {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <Row className='mr-top'>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={14}
          className='border rounded column-design'
        >
          <Card bordered={false} className='criclebox h-full'>
            <Title level={3} className='m-3 text-center'>
              Sale Invoice Payment
            </Title>
            <Title level={4} className='text-center'>
              Due Amount :{" "}
              <strong style={{ color: "red" }}>
                {dueAmount?.toFixed(3) || 0}
              </strong>
            </Title>
            <Form
              form={form}
              className='m-4'
              name='basic'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
                saleInvoiceNo: pid,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                label='Date'
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <DatePicker
                  onChange={(value) => setDate(value?._d)}
                  defaultValue={dayjs()}
                  style={{ marginBottom: "10px" }}
                  label='date'
                  name='date'
                  rules={[
                    {
                      required: true,
                      message: "Please input Date",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label='Discount'
                name='discount'
                rules={[
                  {
                    required: true,
                    message: "Please input Discount!",
                  },
                  {
                    validator: (rule, value) => {
                      if (value >= 0 && value <= dueAmount) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        `Discount must be gater than or equal ${dueAmount}`
                      );
                    },
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label='Amount'
                name='amount'
                rules={[
                  {
                    required: true,
                    message: "Please input amount!",
                  },
                  {
                    validator: (rule, value) => {
                      if (value >= 0 && value <= dueAmount) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        `Amount must be gater than or equal ${dueAmount}`
                      );
                    },
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label='Sale Invoice No'
                name='saleInvoiceNo'
                validateStatus='success'
              >
                <Input type='number' disabled col />
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
                  Pay Now
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddCustPaymentByInvoice;
