import { Button, Card, Form, Input, Typography } from "antd";

import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import {
  addProductBrand,
  loadAllProductBrand,
} from "../../redux/rtk/features/productBrand/productBrandSlice";
import UploadMany from "../Card/UploadMany";

const AddProductBrand = ({ drawer }) => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addProductBrand(values));

      if (resp.payload.message === "success") {
        setLoading(false);
        form.resetFields();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    setLoading(false);
  };

  const onClick = () => {
    setLoading(true);
  };

  return (
    <>
      <div className='h-full'>
        <Title level={4} className='m-3 text-center'>
          Add Product Brand
        </Title>
        <Form
          form={form}
          className=''
          name='basic'
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
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
                message: "Please input category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className='flex justify-center mt-[24px]'
          >
            <Button
              type='primary'
              htmlType='submit'
              shape='round'
              loading={loading}
              onClick={onClick}
            >
              Add Brand
            </Button>
          </Form.Item>
        </Form>

        <Card
          className='mt-5'
          title={<span className='text-center font-bold'>Import From CSV</span>}
          extra={
            <div className='flex'>
              <CSVLink
                className=' text-white bg-black/80 text-xs  md:text-base text-center px-0 py-1 rounded w-[200px]'
                filename={"sample product brand"}
                data={[
                  {
                    name: "Rich Man",
                  },
                  {
                    name: "Blue Dream",
                  },
                  {
                    name: "Easy",
                  },
                ]}
              >
                Download Sample CSV
              </CSVLink>
            </div>
          }
        >
          <UploadMany
            urlPath={"product-brand"}
            loadAllThunk={loadAllProductBrand}
            query={{ page: 1, count: 10, status: true }}
          />
        </Card>
      </div>
    </>
  );
};

export default AddProductBrand;
