import { Card, Table } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import ViewBtn from "../Buttons/ViewBtn";

function CustomerInvoiceList({ list, linkTo }) {
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
			key: "totalAmount",
		},
		{
			title: "Discount",
			dataIndex: "discount",
			key: "discount",
			responsive: ["md"],
		},
		{
			title: "Due Amount",
			dataIndex: "dueAmount",
			key: "dueAmount",
			responsive: ["md"],
		},
		{
			title: "Paid Amount",
			dataIndex: "paidAmount",
			key: "paidAmount",
			responsive: ["md"],
		},
		{
			title: "Profit",
			dataIndex: "profit",
			key: "profit",
			responsive: ["md"],
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "payment",
			render: (id, { dueAmount }) => (
				<div className='flex'>
					<ViewBtn path={`${linkTo}/${id}`} />
					<Link
						to={dueAmount ? `/admin/payment/customer/${id}` : "#"}
						state={{ dueAmount: dueAmount || 0 }}>
						<button
							className=' bg-violet-500 hover:bg-violet-700 text-white font-bold py-1  px-3  rounded mr-2 disabled:bg-gray-400'
							disabled={!dueAmount}>
							Payment
						</button>
					</Link>
				</div>
			),
			fixed: "right",
		},
	];

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='mt-1'>
			<Card
				className='header-solid h-full'
				bordered={false}
				title={
					<h5 className='font-semibold m-0 text-center'>
						Customer Invoice Information
					</h5>
				}
				bodyStyle={{ paddingTop: "0" }}>
				<Table
					scroll={{ x: true }}
					loading={!list}
					// pagination={{
					//   defaultPageSize: 10,
					//   pageSizeOptions: [10, 20, 50, 100, 200],
					//   showSizeChanger: true,
					//   total: total,

					//   // onChange: (page, count) => {
					//   //   dispatch(loadSuppliers({ page, count }));
					//   // },
					// }}
					columns={columns}
					dataSource={list ? addKeys(list) : []}
				/>
			</Card>
		</div>
	);
}

export default CustomerInvoiceList;
