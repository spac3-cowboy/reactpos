import { Button, Form, Modal, Select } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loadSingleSale } from "../../redux/rtk/features/sale/saleSlice";
import BtnLoader from "../loader/BtnLoader";

const updateOrderStatusapi = async ({ saleId, orderStatus }) => {
	//make a axios post request to update order status api
	try {
		const response = await axios.patch(`sale-invoice/order/`, {
			invoiceId: saleId,
			orderStatus: orderStatus,
		});

		return { response, message: "success" };
	} catch (error) {
	}
};

const ChangeOrderStatus = ({ saleId }) => {
	const { Option } = Select;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(false);
	}, []);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleChange = async (value) => {
		setLoading(true);
		const { message } = await updateOrderStatusapi({
			saleId,
			orderStatus: value,
		});

		if (message === "success") {
			setLoading(false);
			toast.success("Order Status Updated");
			dispatch(loadSingleSale(saleId));
			setIsModalOpen(false);
		} else {
			toast.error("Something went wrong");
			setLoading(false);
		}
	};

	return (
		<>
			<Button type='' danger onClick={showModal}>
				Update Status
			</Button>
			<Modal
				title='Update Order Status'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<Form layout='vertical'>
					<h1 className='text-lg text-center font-semibold text-gray-600'>
						{" "}
						Order ID : {saleId}{" "}
					</h1>
					<Form.Item label='Update Order Status'>
						<Select
							placeholder='Select Order Status'
							style={{ width: "100%" }}
							onChange={handleChange}>
							<Option value='pending'>Pending</Option>
							<Option value='received'>Received</Option>
						</Select>
					</Form.Item>
				</Form>
				<Form.Item>{loading && <BtnLoader />}</Form.Item>
			</Modal>
		</>
	);
};
export default ChangeOrderStatus;
