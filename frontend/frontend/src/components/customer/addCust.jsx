import { Alert, Button, Card, Form, Input, Typography } from "antd";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addCustomer,
  loadAllCustomer,
} from "../../redux/rtk/features/customer/customerSlice";
import { CSVLink } from "react-csv";
import UploadMany from "../Card/UploadMany";

const AddCust = ({ drawer }) => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //check the page url has customer on it or not
  const isAdmin = window.location.href.includes("admin");

  const onClick = () => {
    setLoading(true);
  };

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addCustomer(values));
      if (resp.payload?.message === "success") {
        setSuccess(true);
        form.resetFields();
        dispatch(loadAllCustomer({ page: 1, count: 10, status: true }));
        //redirect to customer login page
        // wait for 5 sec and then redirect to home
        if (isAdmin !== true) {
          setTimeout(() => {
            window.location.href = "/customer/login";
            setSuccess(false);
            setLoading(false);
          }, 5000);
        } else {
          setSuccess(false);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };


  return (
    <>
      <div className={isAdmin !== true ? " mt-[5rem]" : ""}>
        {success && (
          <Alert
            message="We have sent you an email with password ."
            description="Please check your email and login to your account."
            type="success"
            showIcon
          />
        )}
        <Title level={4} className="m-2 text-center">
          Register Now
        </Title>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          style={{ marginLeft: "40px", marginRight: "40px" }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input  name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input  email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input Phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-6"
          >
            <Button
              onClick={onClick}
              loading={loading}
              type="primary"
              htmlType="submit"
              shape="round"
            >
              Register Now
            </Button>
          </Form.Item>
        </Form>
        {!isAdmin && (
          <Title className="mt-5 mb-5 text-center text-base">
            Already have an account? <Link to="/customer/login">Login Now</Link>
          </Title>
        )}

        <Card
          className="mt-5"
          title={<span className="text-center font-bold">Import From CSV</span>}
          extra={
            <div className="flex">
              <CSVLink
                className=" text-white bg-black/80 text-xs  md:text-base text-center px-0 py-1 rounded w-[200px]"
                filename={"sample customer list"}
                data={[
                  {
                    name: "custreomer 13",
                    email: "customer13@gmail.com",
                    phone: "01708888842",
                    address: "everywhere",
                  },
                  {
                    name: "customer 14",
                    email: "customer14@gmail.com",
                    phone: "01788880803",
                    address: "everywhere",
                  },
                  {
                    name: "customer 15",
                    email: "rshaon09@gmail.com",
                    phone: "01788888205",
                    address: "everywhere",
                  },
                ]}
              >
                Download Sample CSV
              </CSVLink>
            </div>
          }
        >
          <UploadMany
            urlPath={"customer"}
            loadAllThunk={loadAllCustomer}
            query={{ page: 1, count: 10, status: true }}
          />
        </Card>
      </div>
    </>
  );
};

export default AddCust;
