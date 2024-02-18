import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography, Upload } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getSetting,
  updateSetting,
} from "../../redux/rtk/features/setting/settingSlice";
import fileConfig from "../../utils/fileConfig";
import Loader from "../loader/loader";
//Update Invoice API REQ

const AddDetails = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const data = useSelector((state) => state?.setting?.data) || null;
  const loader = useSelector((state) => state?.setting?.loading) || false;

  const onFinish = async (values) => {
    //convert values to formData to send to server
    const formData = new FormData();
    formData.append("companyName", values.companyName);
    formData.append("tagLine", values.tagLine);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("website", values.website);
    formData.append("footer", values.footer);

    if (!!fileList.length) {
      if (fileConfig() === "laravel") {
        formData.append("images[]", fileList[0].originFileObj);
      } else {
        formData.append("images", fileList[0].originFileObj);
      }
    }
    formData.append("_method", "PUT");
    try {
      const resp = await dispatch(updateSetting(formData));
      if (resp.payload.message === "success") {
        toast.success("Company Updated Successfully");
        window.location.reload();
      }
    } catch (error) {
		
    }
  };

  const onFinishFailed = (errorInfo) => {
  };

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  const handelImageChange = ({ fileList }) => {
    setFileList(fileList);
  };
  return (
    <Fragment>
      <Row className='mr-top' justify='center'>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          className='border rounded column-design'
        >
          <Card bordered={false}>
            <Title level={4} className='m-2 text-center mb-4'>
              Company Setting
            </Title>
            {data ? (
              <Form
                initialValues={{
                  ...data,
                }}
                form={form}
                name='basic'
                labelCol={{
                  span: 7,
                }}
                labelWrap
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
              >
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Company Name" }]}
                  label='Company Name'
                  name='companyName'
                  rules={[
                    {
                      required: true,
                      message: "Please input Company name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Tagline" }]}
                  label='Tagline'
                  name='tagLine'
                  rules={[
                    {
                      required: true,
                      message: "Please input Tagline!",
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
                      message: "Please input Address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Phone Number'
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: "Please input Phone Number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Email Address'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: "Please input Email Address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Website'
                  name='website'
                  rules={[
                    {
                      required: true,
                      message: "Please input Website!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label='Footer'
                  name='footer'
                  rules={[
                    {
                      required: true,
                      message: "Please input Footer!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label='Warnning' name='Warnning'>
                  <p className='font-semibold text-rose-500'>
                    Required image size 180x70 px & transparent png format
                  </p>
                </Form.Item>

                <Form.Item label='Upload Logo' valuePropName='fileList'>
                  <Upload
                    listType='picture-card'
                    beforeUpload={() => false}
                    name='image'
                    fileList={fileList}
                    maxCount={1}
                    onChange={handelImageChange}
                  >
                    <div>
                      <UploadOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  className='flex justify-center mt-[24px]'
                >
                  <Button
                    type='primary'
                    htmlType='submit'
                    shape='round'
                    loading={loader}
                  >
                    Update Details
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Loader />
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddDetails;
