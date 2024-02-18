import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Typography,
} from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addSupplierPayment } from "../../redux/rtk/features/supplierPayment/supplierPaymentSlice";

const AddSupPaymentByInvoice = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { pid } = useParams();
	const { dueAmount } = location?.state;

	const dispatch = useDispatch();
	const { Title } = Typography;

	const [form] = Form.useForm();

	let [date, setDate] = useState(moment());
	const [loader, setLoader] = useState(false);

	const onFinish = async (values) => {
		try {
			const data = {
				date: date,
				purchaseInvoiceNo: parseInt(values.purchaseInvoiceNo),
				...values,
			};

			const resp = await dispatch(addSupplierPayment(data));

			if (resp.payload.message === "success") {
				setLoader(false);
				navigate(-1);
			}
			toast.success("Payment Successfully done");

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
			<Row className='mr-top'>
				<Col
					xs={24}
					sm={24}
					md={12}
					lg={12}
					xl={14}
					className='border rounded column-design'>
					<Card bordered={false} className='criclebox h-full'>
						<Title level={3} className='m-3 text-center'>
							Purchase Invoice Payment
						</Title>

						<Title level={4} className='text-center'>
							Due Amount : <strong style={{ color: "red" }}>{dueAmount}</strong>
						</Title>
						<Form
							form={form}
							className='m-4'
							name='basic'
							labelCol={{
								span: 8,
							}}
							wrapperCol={{
								span: 16,
							}}
							initialValues={{
								remember: true,
								purchaseInvoiceNo: pid,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<Form.Item label='Date' required>
								<DatePicker
									defaultValue={moment()}
									onChange={(value) => setDate(value?._d)}
									style={{ marginBottom: "10px" }}
									label='date'
									name='date'
									rules={[
										{
											required: true,
											message: "Please input date!",
										},
									]}
								/>
							</Form.Item>
							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Discount'
								name='discount'
								rules={[
									{
										required: true,
										message: "Please input discount!",
									},
									{
										validator: (rule, value) => {
											if (value >= 0 && value <= dueAmount) {
												return Promise.resolve();
											}
											return Promise.reject(
												`Discount must be gater than or equal ${dueAmount}`
											);
										},
									},
								]}>
								<InputNumber />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Amount'
								name='amount'
								rules={[
									{
										required: true,
										message: "Please input amount!",
									},
									{
										validator: (rule, value) => {
											if (value >= 0 && value <= dueAmount) {
												return Promise.resolve();
											}
											return Promise.reject(
												`Amount must be gater than or equal ${dueAmount}`
											);
										},
									},
								]}>
								<InputNumber />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Purchase Invoice No'
								name='purchaseInvoiceNo'>
								<Input type='number' disabled />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								wrapperCol={{
									offset: 8,
									span: 16,
								}}>
								<Button
									block
									type='primary'
									htmlType='submit'
									shape='round'
									loading={loader}
									onClick={() => setLoader(true)}>
									Pay Now
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default AddSupPaymentByInvoice;
