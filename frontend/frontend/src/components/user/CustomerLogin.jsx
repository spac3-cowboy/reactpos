import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/rtk/features/customer/customerSlice";

import { Link } from "react-router-dom";

const CustomerLogin = () => {
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const [success, setSuccess] = useState(false);
	const { Title } = Typography;

	const onFinish = async (values) => {
		try {
			const resp = await dispatch(addUser(values));

			if (resp.payload.message === "success") {
				localStorage.setItem("access-token", resp?.payload.data.token);
				localStorage.setItem("email", resp?.payload.data.email);
				localStorage.setItem("username", resp?.payload.data.name);
				localStorage.setItem("id", resp?.payload.data.id);
				localStorage.setItem("phone", resp?.payload.data.phone);
				localStorage.setItem("address", resp?.payload.data?.address);
				localStorage.setItem("isLogged", true);
				setSuccess(true);

				// wait for 2 sec and then redirect to home
				setTimeout(() => {
					window.location.href = "/";
					setSuccess(false);
					setLoader(false);
				}, 2000);

				// window.location.href = "/";
			} else {
				setLoader(false);
				setSuccess(false);
			}
		} catch (error) {
			setLoader(false);
			setSuccess(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		setLoader(false);
	};

	return (
		<>
			<Row className='card-row'>
				<Col span={24}>
					<Card
						bordered={false}
						className={`w-full max-w-[480px] border-solid border-2 mx-auto border-black-300 mt-[5rem]`}>
						{success && (
							<Alert
								message='Login Success'
								description='Redirecting to Homepage'
								type='success'
								showIcon
							/>
						)}
						<Title level={3} className='mt-10 mb-10 text-center'>
							Login Now
						</Title>
						<Form
							name='basic'
							labelCol={{
								span: 6,
							}}
							wrapperCol={{
								span: 16,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<Form.Item
								className='mb-5'
								label='Email'
								name='email'
								rules={[
									{
										required: true,
										message: "Please input your email!",
									},
								]}>
								<Input type='email' />
							</Form.Item>

							<Form.Item
								className='mb-5'
								label='Password'
								name='password'
								rules={[
									{
										required: true,
										message: "Please input your password!",
									},
								]}>
								<Input.Password />
							</Form.Item>

							<Form.Item className="flex justify-center">
								<Button
									type='primary'
									htmlType='submit'
									loading={loader}
									onClick={() => setLoader(true)}>
									Submit
								</Button>
							</Form.Item>
						</Form>

						<Title className='mt-5 mb-5 text-center text-base'>
							Don't have an account?{" "}
							<Link to='/customer/register'>Register Now</Link>
						</Title>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default CustomerLogin;
