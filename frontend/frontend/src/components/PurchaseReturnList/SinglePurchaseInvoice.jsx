import { SolutionOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadSinglePurchaseReturnInvoice } from "../../redux/rtk/features/PurchaseReturnList/PurchaseReturnListSlice";
import PurchaseReturnInvoice from "../Invoice/PurchaseReturnInvoice";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";

export default function SinglePurchaseInvoice() {
	const dispatch = useDispatch();
	const { id } = useParams("id");
	const [columnsToShow, setColumnsToShow] = useState([]);
	const { returnPurchase, loading } = useSelector(
		(state) => state.purchaseReturn
	);
	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			id: 2,
			title: "Product Name",
			key: "product",
			dataIndex: "product",
			render: (product) => product?.name,
		},
		{
			id: 3,
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => moment(date).format("DD/MM/YYYY"),
		},

		{
			id: 4,
			title: "Product Quantity",
			dataIndex: "productQuantity",
			key: "productQuantity",
		},
		{
			id: 5,
			title: "Purcahse Price",
			dataIndex: "productPurchasePrice",
			key: "productPurchasePrice",
		},
	];
	useEffect(() => {
		setColumnsToShow(columns);
		dispatch(loadSinglePurchaseReturnInvoice(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr?.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24} className='mt-2'>
				<div className='md:flex flex justify-between md:mb-8 items-center gap-2'>
					<h5 className='flex items-center'>
						<SolutionOutlined />
						<span className='mr-left'>ID : {id}</span>
					</h5>
				</div>
				<Card
					className='header-solid h-full'
					bordered={false}
					title={
						<div className='text-[18px] font-medium'>Purchase Return List</div>
					}
					bodyStyle={{ paddingTop: "0" }}
					extra={<PurchaseReturnInvoice data={returnPurchase} />}>
					{returnPurchase && (
						<div>
							<div className='flex justify-between my-3'>
								<ColVisibilityDropdown
									options={columns}
									columns={columns}
									columnsToShowHandler={columnsToShowHandler}
								/>

								<div className='flex justify-between'>
									<div className='bg-gray-100 px-2 py-1 rounded-sm m-1'>
										Purchase Invoice Id: {returnPurchase?.purchaseInvoiceId}
									</div>
									<div className='bg-gray-100 px-2 py-1 rounded-sm m-1'>
										Date:{" "}
										{moment(returnPurchase?.createdAt).format("DD/MM/YYYY")}
									</div>
								</div>
							</div>
						</div>
					)}
					<div className='col-info'>
						<Table
							scroll={{ x: true }}
							loading={!returnPurchase}
							columns={columnsToShow}
							dataSource={
								returnPurchase
									? addKeys(returnPurchase?.returnPurchaseInvoiceProduct)
									: []
							}
						/>
					</div>
					<div className='font-bold text-[16px]'>
						Total Return Amount: {returnPurchase?.totalAmount}
					</div>
					<h6 className=' m-0 max-w-[500px] py-2'>
						<span className='font-bold'>Return Note:</span>
						<span className='font-medium'> {returnPurchase?.note}</span>{" "}
					</h6>
				</Card>
			</Col>
		</Row>
	);
}
