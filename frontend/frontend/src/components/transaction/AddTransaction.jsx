import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllAccount } from "../../redux/rtk/features/account/accountSlice";
import {
  addTransaction,
  loadAllTransaction,
} from "../../redux/rtk/features/transaction/transactionSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddAccount from "../account/AddAccount";

//Date functionalities
let startdate = moment().startOf("month").format("YYYY-MM-DD");
let enddate = moment().endOf("month").format("YYYY-MM-DD");

const AddTransaction = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { list: accounts, loading } = useSelector((state) => state.accounts);
  const [form] = Form.useForm();

  let [date, setDate] = useState(moment());
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(loadAllAccount());
  }, [dispatch]);

  const onFinish = async (values) => {
    try {
      const data = {
        date: date,
        ...values,
      };

      const resp = await dispatch(addTransaction(data));

      if (resp.meta?.requestStatus === "fulfilled") {
        setLoader(false);
        dispatch(loadAllTransaction({ startdate, enddate }));
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

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <div>
        <Title level={4} className="m-2 text-center">
          Transaction
        </Title>
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          style={{ marginLeft: "40px", marginRight: "40px" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item style={{ marginBottom: "10px" }} label="Date" required>
            <DatePicker
              defaultValue={dayjs()}
              onChange={(value) => setDate(value?._d)}
              label="date"
              name="date"
              className="date-picker date-picker-transaction-create"
              rules={[
                {
                  required: true,
                  message: "Please input date!",
                },
              ]}
            />
          </Form.Item>

          <div className="flex items-end mb-[10px]">
            <Form.Item
              className="flex-grow  mb-0"
              name="debitId"
              label="Debit Account"
              rules={[
                {
                  required: true,
                  message: "Please input debit account!",
                },
              ]}
            >
              <Select
                loading={loading}
                showSearch
                placeholder="Select Debit ID"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
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
            <BigDrawer
              title={"new debit account"}
              btnTitle={"Debit account"}
              // eslint-disable-next-line react/no-children-prop
              children={<AddAccount drawer={true} />}
            />
          </div>

          <div className="flex items-end mb-[10px]">
            <Form.Item
              name="creditId"
              label="Credit Account"
              className="flex-grow mb-0"
              rules={[
                {
                  required: true,
                  message: "Please input debit account!",
                },
              ]}
            >
              <Select
                loading={loading}
                showSearch
                placeholder="Select Credit ID"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
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
            <BigDrawer
              title={"new credit account"}
              btnTitle={"Credit account"}
              // eslint-disable-next-line react/no-children-prop
              children={<AddAccount drawer={true} />}
            />
          </div>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Particulars"
            name="particulars"
            rules={[
              {
                required: true,
                message: "Please input particulars!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-[24px]"
          >
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loader}
              onClick={() => setLoader(true)}
            >
              Pay Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddTransaction;
