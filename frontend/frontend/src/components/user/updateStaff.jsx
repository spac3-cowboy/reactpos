import React, { useState } from "react";

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadAllDesignation } from "../../redux/rtk/features/designation/designationSlice";
import { loadRolePaginated } from "../../redux/rtk/features/hr/role/roleSlice";
import { updateStaff } from "../../redux/rtk/features/user/userSlice";
import { removeFalsyProperties } from "../../utils/functions";

function UpdateStaff() {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;
  const designation = useSelector((state) => state.designations?.list);
  const { list } = useSelector((state) => state.role);
  useEffect(() => {
    dispatch(loadAllDesignation({ status: true, page: 1, count: 50 }));
    dispatch(loadRolePaginated({ status: true, page: 1, count: 50 }));
  }, [dispatch]);

  const user = data;

  const [initValues, setInitValues] = useState({
    username: user.username,
    email: user.email,
    roleId: user.roleId,
    address: user.address,
    phone: user.phone,
    designationId: user.designationId,
    bloodGroup: user.bloodGroup,
    department: user.department,
    idNo: user.idNo,
    salary: user.salary,
    status: user.status,
    joinDate: user?.joinDate && dayjs(user?.joinDate),
    leaveDate: user?.leaveDate && dayjs(user?.leaveDate),
  });
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const { Option } = Select;

  const onFinish = async (values) => {
    const data = {
      ...values,
      designationId: parseInt(values.designationId),
      roleId: parseInt(values.roleId),
    };
    const value = removeFalsyProperties(data);

    const res = await dispatch(updateStaff({ id, values: value }));

    if (res.payload?.data === "success") {
      setInitValues({});
      setLoader(false);
      if (role !== "admin") {
        navigate("/admin/auth/logout");
      }
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = () => {
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
              className='border rounded column-design '
            >
              <Card bordered={false} className='criclebox h-full'>
                <Title level={3} className='m-3 text-center'>
                  Edit : {initValues.username}
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
                    span: 20,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete='off'
                >
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    fields={[{ name: "Name" }]}
                    label='Username'
                    name='username'
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Change Password'
                    name='password'
                  >
                    <Input />
                  </Form.Item>

                  {role === "admin" ? (
                    <Form.Item
                      label='Staff Type '
                      name={"roleId"}
                      style={{ marginBottom: "20px" }}
                    >
                      <Select
                        optionFilterProp='children'
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        mode='single'
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder='Please select'
                      >
                        {list &&
                          list.map((role) => (
                            <Option key={role.id} value={role.id}>
                              {role.name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    ""
                  )}

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Email'
                    name='email'
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Joining Date'
                    name='joinDate'
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Leave Date'
                    name='leaveDate'
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Id No'
                    name='idNo'
                  >
                    <Input placeholder='OE-012' />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Phone'
                    name='phone'
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Address'
                    name='address'
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Salary'
                    name='salary'
                  >
                    <InputNumber />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label='Blood Group'
                    name='bloodGroup'
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label='Designation'
                    name='designationId'
                    style={{ marginBottom: "20px" }}
                  >
                    <Select
                      loading={!designation}
                      optionFilterProp='children'
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      mode='single'
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder='Please select'
                    >
                      {designation &&
                        designation.map((desg) => (
                          <Option key={desg.id} value={desg.id}>
                            {desg.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    wrapperCol={{
                      offset: 8,
                    }}
                  >
                    <Button
                      onClick={() => setLoader(true)}
                      loading={loader}
                      block
                      type='primary'
                      htmlType='submit'
                      shape='round'
                    >
                      Change Now
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default UpdateStaff;
