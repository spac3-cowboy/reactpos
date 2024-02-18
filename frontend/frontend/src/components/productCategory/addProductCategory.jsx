import { Button, Card, Form, Input, Typography } from "antd";

import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import {
  addProductCategory,
  loadAllProductCategory,
} from "../../redux/rtk/features/productCategory/productCategorySlice";
import UploadMany from "../Card/UploadMany";

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
  };

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addProductCategory(values));

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

  return (
    <>
      <div className='h-full md:'>
        <Title level={4} className='text-center'>
          Add Product Category
        </Title>
        <Form
          form={form}
          className=''
          name='basic'
          
          layout='vertical'
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
                message: "Please input category Dname!",
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
              loading={loading}
              type='primary'
              htmlType='submit'
              shape='round'
              onClick={onClick}
            >
              Add Category
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
                filename={"sample product category"}
                data={[
                  {
                    name: "category 11",
                  },
                  {
                    name: "category 21",
                  },
                  {
                    name: "category 31",
                  },
                ]}
              >
                Download Sample CSV
              </CSVLink>
            </div>
          }
        >
          <UploadMany
            urlPath={"product-category"}
            loadAllThunk={loadAllProductCategory}
            query={{ page: 1, count: 10, status: true }}
          />
        </Card>
      </div>
    </>
  );
};

export default AddProductCategory;
