import { Card, Table } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import ViewBtn from "../Buttons/ViewBtn";
import "./card.css";

function SupplierInvoiceTable({ list, linkTo }) {
	const columns = [
		{
			title: "Invoice ",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`${linkTo}/${id}`}>{id}</Link>,
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => moment(date).format("ll"),
		},
		{
			title: "Total Amount",
			dataIndex: "totalAmount",
			key: "total_amount",
		},
		{
			title: "Discount",
			dataIndex: "discount",
			key: "discount",
			responsive: ["md"],
		},
		{
			title: "Paid Amount",
			dataIndex: "paidAmount",
			key: "paid_amount",
			responsive: ["md"],
		},
		{
			title: "Due Amount",
			dataIndex: "dueAmount",
			key: "dueAmount",
			responsive: ["md"],
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "payment",
			render: (id, { dueAmount }) => (
				<div className='flex '>
					<ViewBtn path={`${linkTo}/${id}`} />
					<Link
						to={dueAmount ? `/admin/payment/supplier/${id}` : "#"}
						state={{ dueAmount: dueAmount }}>
						<button
							className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-1  px-3  rounded mr-2 disabled:bg-gray-400'
							disabled={!dueAmount}>
							{" "}
							Payment
						</button>
					</Link>
				</div>
			),
		},
	];

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Card
			className='header-solid h-full'
			bordered={false}
			title={
				<h6 className='font-semibold m-0 text-center'>
					Supplier Invoice Information
				</h6>
			}
			bodyStyle={{ paddingTop: "0" }}>
			<Table
				scroll={{ x: true }}
				loading={!list}
				columns={columns}
				dataSource={list ? addKeys(list) : []}
			/>
		</Card>
	);
}

export default SupplierInvoiceTable;
