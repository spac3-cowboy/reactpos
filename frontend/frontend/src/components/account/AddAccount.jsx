import { Button, Card, Form, Input, Select, Typography } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAccount,
  loadAllAccount,
  loadMainAccount,
} from "../../redux/rtk/features/account/accountSlice";

const AddAccount = ({ drawer }) => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  const accounts = useSelector((state) => state?.accounts?.mainAccount) || null;
  useEffect(() => {
    dispatch(loadMainAccount());
  }, [dispatch]);

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addAccount(values));
      if (resp.payload.message === "success") {
        setLoader(false);
        dispatch(loadAllAccount());
      }
      form.resetFields();
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
  };

  return (
    <div>
      <div>
        <Title level={4} className="m-2 text-center">
          Add Account
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input debit account!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            name="accountId"
            label="Account Type"
            rules={[
              {
                required: true,
                message: "Please input debit account!",
              },
            ]}
          >
            <Select
              loading={!accounts}
              showSearch
              style={{
                width: "100%",
              }}
              placeholder="Select Account Type"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {accounts &&
                accounts.map((acc) => (
                  <Select.Option key={acc.id} value={acc.id}>
                    {acc.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-6"
          >
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loader}
              onClick={() => setLoader(true)}
            >
              Add New Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddAccount;
