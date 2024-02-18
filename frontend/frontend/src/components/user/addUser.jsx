import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDesignation } from "../../redux/rtk/features/designation/designationSlice";
import { loadAllRole } from "../../redux/rtk/features/hr/role/roleSlice";
import {
  addStaff,
  loadAllStaff,
} from "../../redux/rtk/features/user/userSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddRole from "../role/AddRole";

const AddUser = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { Option } = Select;

  // useSelector to get designations from redux
  const designation = useSelector((state) => state.designations?.list);

  const { list } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(loadAllDesignation({ query: "all" }));
    dispatch(loadAllRole({ status: true, count: 30, page: 1 }));
  }, [dispatch]);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = {
      ...values,
      roleId: parseInt(values.roleId),
      designationId: parseInt(values.designationId),
    };
    try {
      const resp = await dispatch(addStaff(formData));
      setLoader(true);

      if (resp.payload?.message === "success") {
        setLoader(false);
        dispatch(loadAllStaff({ status: "true", count: 10, page: 1 }));
      } else {
        setLoader(false);
      }

      form.resetFields();
    } catch (error) {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
  };

  return (
    <>
      <div>
        <Title level={4} className="m-2 text-center">
          Add New Staff
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
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="User Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password !",
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
                message: "Please input email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Joining Date"
            name="joinDate"
            rules={[
              {
                required: true,
                message: "Please input joining date!",
              },
            ]}
          >
            <DatePicker className="date-picker hr-staffs-date-picker" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Leave Date"
            name="leaveDate"
          >
            <DatePicker className="date-picker hr-staffs-date-picker" />
          </Form.Item>

          <div className="flex items-end mb-[10px]">
            <Form.Item label="Role" name={"roleId"} className="flex-grow mb-0">
              <Select
                loading={!list}
                showSearch
                allowClear
                placeholder="Please select"
              >
                {list &&
                  list.map((role) => (
                    <Option value={role.id} key={role.id}>
                      {role.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <BigDrawer
              title={"new Role"}
              btnTitle={"Role"}
              // eslint-disable-next-line react/no-children-prop
              children={<AddRole drawer={true} />}
            />
          </div>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Id No"
            name="idNo"
            rules={[
              {
                required: true,
                message: "Please input id no",
              },
            ]}
          >
            <Input placeholder="OE-012" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input phone",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Salary"
            name="salary"
            rules={[
              {
                required: true,
                message: "Please input salary",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Blood Group"
            name="bloodGroup"
            rules={[
              {
                required: true,
                message: "Please input blood group",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Pleases Select Designation!",
              },
            ]}
            label="Designation"
            name={"designationId"}
            style={{ marginBottom: "20px" }}
          >
            <Select
              loading={!designation}
              optionFilterProp="children"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              mode="single"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
            >
              {designation &&
                designation.map((desg) => (
                  <Option key={desg.id}>{desg.name}</Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              xs: {
                offset: 0,
                span: 24,
              },
              sm: {
                offset: 4,
                span: 16,
              },
            }}
          >
            <Button
              onClick={() => setLoader(true)}
              block
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loader}
            >
              Add New Staff
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
