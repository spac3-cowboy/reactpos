import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ColVisibilityDropdown from "../../Shared/ColVisibilityDropdown";
import ReturnPurchaseInvoiceProductList from "../../popUp/returnPurchaseProductList";

const ReturnPurchaseInvoiceList = ({ list }) => {
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 2,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			id: 3,
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => moment(date).format("DD/MM/YYYY"),
		},

		{
			id: 3,
			title: "Total Amount",
			dataIndex: "totalAmount",
			key: "totalAmount",
		},
		{
			id: 4,
			title: "Note",
			dataIndex: "note",
			key: "note",
		},
		{
			id: 1,
			title: "Action",
			dataIndex: "returnPurchaseInvoiceProduct",
			key: "returnPurchaseInvoiceProduct",
			render: (returnPurchaseInvoiceProduct) => (
				<ReturnPurchaseInvoiceProductList list={returnPurchaseInvoiceProduct} />
			),
		},
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24} className='mt-2'>
				<Card
					className='header-solid h-full'
					bordered={false}
					title={[
						<h6 className='font-semibold m-0 text-center' key={"return"}>
							Return Purchase Information
						</h6>,
					]}
					bodyStyle={{ paddingTop: "0" }}>
					{list && (
						<div style={{ marginBottom: "30px" }}>
							<ColVisibilityDropdown
								options={columns}
								columns={columns}
								columnsToShowHandler={columnsToShowHandler}
							/>
						</div>
					)}
					<div className='col-info'>
						<Table
							scroll={{ x: true }}
							loading={!list}
							columns={columnsToShow}
							dataSource={list ? addKeys(list) : []}
						/>
					</div>
				</Card>
			</Col>
		</Row>
	);
};

export default ReturnPurchaseInvoiceList;
