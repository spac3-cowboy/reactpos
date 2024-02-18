import { Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";

import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import {
  addSupplier,
  loadSuppliers,
} from "../../redux/rtk/features/supplier/supplierSlice";
import UploadMany from "../Card/UploadMany";

const AddSup = ({ drawer }) => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
  };
  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addSupplier(values));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    setLoading(false);
  };

  return (
    <>
      <div className='h-full'>
        <Title level={4} className=' text-center'>
          Add Supplier
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
          autoComplete='off'
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
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

          {/* //Due amount droped */}

          <Form.Item
            style={{ marginBottom: "10px" }}
            className='flex justify-center mt-[24px]'
          >
            <Button
              loading={loading}
              type='primary'
              htmlType='submit'
              shape='round'
              onClick={onClick}
            >
              Add Supplier
            </Button>
          </Form.Item>
        </Form>

        <Card
          title={<span className='text-center font-bold'>Import From CSV</span>}
          className='mt-5'
          extra={
            <div className='flex'>
              <CSVLink
                className=' text-white bg-black/80 text-xs  md:text-base text-center px-0 py-1 rounded w-[200px]'
                filename={"sample supplier"}
                data={[
                  {
                    name: "supplier 1",
                    phone: "01788888084",
                    address: "everywhere",
                  },
                  {
                    name: "supplier 2",
                    phone: "0178888885",
                    address: "everywhere",
                  },
                  {
                    name: "supplier 3",
                    phone: "0178888886",
                    address: "everywhere",
                  },
                  {
                    name: "supplier 4",
                    phone: "0178888886",
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
            urlPath={"supplier"}
            loadAllThunk={loadSuppliers}
            query={{ status: true, page: 1, count: 10 }}
          />
        </Card>
      </div>
    </>
  );
};

export default AddSup;
