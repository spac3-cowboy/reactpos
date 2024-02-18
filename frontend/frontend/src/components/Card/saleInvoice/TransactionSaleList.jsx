import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewBtn from "../../Buttons/ViewBtn";
import ColVisibilityDropdown from "../../Shared/ColVisibilityDropdown";

const TransactionSaleList = ({ list }) => {
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
		},
		{
			id: 2,
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => moment(date).format("DD/MM/YYYY"),
		},
		{
			id: 3,
			title: "Debit",
			dataIndex: "debit",
			key: "debit",
			render: (debit) => debit.name,
		},
		{
			id: 4,
			title: "Credit",
			dataIndex: "credit",
			key: "credit",
			render: (credit) => credit.name,
		},

		{
			id: 5,
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
		},

		{
			id: 6,
			title: "Type ",
			dataIndex: "type",
			key: "type",
		},
		{
			id: 7,
			title: "Particulars",
			dataIndex: "particulars",
			key: "particulars",
		},
		{
			id: 8,
			title: "Action",
			key: "action",
			render: ({ id }) => <ViewBtn path={`/admin/transaction/${id}`} />,
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
						<h6 className='font-semibold m-0 text-center'>
							Transaction Information
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

export default TransactionSaleList;
