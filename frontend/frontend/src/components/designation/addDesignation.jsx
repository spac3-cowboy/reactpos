import { Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import {
  addDesignation,
  loadAllDesignation,
} from "../../redux/rtk/features/designation/designationSlice";
import UploadMany from "../Card/UploadMany";
import CreateDrawer from "../CommonUi/CreateDrawer";

const AddDesignation = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [loader, setLoader] = useState(false);
  const onClickLoading = () => {
    setLoader(true);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addDesignation(values));
      if (resp.payload.message === "success") {
        setLoader(false);
        form.resetFields();
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const onFinishFailed = () => {
    setLoader(false);
  };

  return (
    <>
      <CreateDrawer
        permission={"create-designation"}
        title={"Create Designation"}
        width={35}
      >
        <div className='h-full'>
          <Title level={4} className='text-center'>
            Add Designation
          </Title>
          <Form
            form={form}
            name='basic'
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            layout='vertical'
            style={{ marginLeft: "40px", marginRight: "40px" }}
          >
            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: "Please input designation name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: "10px", textAlign: "center" }}>
              <Button
                onClick={onClickLoading}
                type='primary'
                htmlType='submit'
                shape='round'
                loading={loader}
              >
                Add designation
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Card
          className='mt-5'
          title={<span className='text-center font-bold'>Import From CSV</span>}
          extra={
            <div className='flex'>
              <CSVLink
                className=' text-white bg-black/80 text-xs  md:text-base text-center px-0 py-1 rounded w-[200px]'
                filename={"sample designation"}
                data={[
                  {
                    name: "des2",
                  },
                  {
                    name: "des3",
                  },
                  {
                    name: "des4",
                  },
                ]}
              >
                Download Sample CSV
              </CSVLink>
            </div>
          }
        >
          <UploadMany
            urlPath={"designation"}
            loadAllThunk={loadAllDesignation}
            query={{ page: 1, count: 10, status: true }}
          />
        </Card>
      </CreateDrawer>
    </>
  );
};

export default AddDesignation;
