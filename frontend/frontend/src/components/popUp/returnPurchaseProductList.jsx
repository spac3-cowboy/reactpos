import { Card, Col, Modal, Row, Table } from "antd";
import React, { useState } from "react";

import ViewBtnOnly from "../Buttons/ViewBtnOnly";

const CustomTable = ({ list }) => {
	const columns = [
		{
			title: "Name",
			dataIndex: "product",
			key: "product",
			render: (product) => product?.name,
		},
		{
			title: "Product Quantity",
			dataIndex: "productQuantity",
			key: "productQuantity",
		},
		{
			title: "Product Unit Price ",
			dataIndex: "productPurchasePrice",
			key: "productPurchasePrice",
		},
		{
			title: "Total Amount",
			dataIndex: "",
			render: ({ productQuantity, productPurchasePrice }) =>
				productQuantity * productPurchasePrice,
		},
	];
	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24} className='mt-2'>
				<Card
					className='header-solid h-full'
					bordered={false}
					bodyStyle={{ paddingTop: "0" }}>
					<div className='col-info'>
						<Table
							loading={!list}
							columns={columns}
							dataSource={list ? addKeys(list) : []}
						/>
					</div>
				</Card>
			</Col>
		</Row>
	);
};

const ReturnPurchaseInvoiceProductList = ({ list }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button className='btn btn-primary btn-sm' onClick={showModal}>
				<ViewBtnOnly />
			</button>
			<Modal
				width={1000}
				title={`View Details of Product`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<CustomTable list={list} />
				<div className='text-start ms-3'>
					<h6>
						Total Quantity:{"  "}{" "}
						<strong>
							{list?.reduce((acc, item) => acc + item.productQuantity, 0)}
						</strong>
					</h6>
					<h6>
						Total Amount:{"  "}{" "}
						<strong>
							{list?.reduce(
								(acc, item) =>
									acc + item.productQuantity * item.productPurchasePrice,
								0
							)}
						</strong>
					</h6>
				</div>
			</Modal>
		</>
	);
};

export default ReturnPurchaseInvoiceProductList;
