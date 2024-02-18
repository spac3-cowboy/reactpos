import { Card } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllPurchase } from "../../../redux/rtk/features/purchase/purchaseSlice";
import { loadAllSale } from "../../../redux/rtk/features/sale/saleSlice";
import { loadAllTransaction } from "../../../redux/rtk/features/transaction/transactionSlice";
import { loadVatTaxStatement } from "../../../redux/rtk/features/vatTax/vatTaxSlice";
import DashboardTable from "./DashboardTable";

const saleColumns = [
	{
		id: 1,
		title: "Invoice No",
		dataIndex: "id",
		key: "id",
		render: (name, { id }) => <Link to={`/admin/sale/${id}`}>{id}</Link>,
	},

	{
		id: 3,
		title: "Customer",
		dataIndex: `customer`,
		key: "customerId",
		render: (customer) => customer?.name,
	},

	{
		id: 4,
		title: "Total",
		dataIndex: "totalAmount",
		key: "totalAmount",
	},
	{
		id: 6,
		title: "Due",
		dataIndex: "dueAmount",
		key: "dueAmount",
		responsive: ["md"],
	},
	{
		id: 7,
		title: "Paid",
		dataIndex: "paidAmount",
		key: "paidAmount",
		responsive: ["md"],
	},
	{
		id: 2,
		title: "Date",
		dataIndex: "date",
		key: "date",
		render: (date) => moment(date).format("ll"),
	},
	{
		id: 10,
		title: "Action",
		dataIndex: "id",
		key: "payment",
		render: (id, { dueAmount }) => (
			<div className='flex '>
				<Link
					to={dueAmount ? `/admin/payment/customer/${id}` : "#"}
					state={{ dueAmount: dueAmount || 0 }}>
					<button
						className='btn btn-dark btn-sm bg-violet-500 hover:bg-violet-700 text-white font-bold py-1  px-3  rounded mr-2 disabled:bg-gray-400'
						disabled={!dueAmount}>
						Payment
					</button>
				</Link>
			</div>
		),
	},
];

const purchaseColumns = [
	{
		id: 1,
		title: "ID",
		dataIndex: "id",
		key: "id",
		render: (name, { id }) => <Link to={`/admin/purchase/${id}`}>{id}</Link>,
	},
	{
		id: 3,
		title: "Supplier",
		dataIndex: `supplier`,
		key: "supplierId",
		render: (supplier) => supplier?.name,
	},
	{
		id: 4,
		title: "Total",
		dataIndex: "totalAmount",
		key: "totalAmount",
	},
	{
		id: 6,
		title: "Due",
		dataIndex: "dueAmount",
		key: "dueAmount",
	},
	{
		id: 7,
		title: "Paid",
		dataIndex: "paidAmount",
		key: "paidAmount",
	},

	{
		id: 2,
		title: "Date",
		dataIndex: "date",
		key: "date",
		render: (date) => moment(date).format("ll"),
	},

	{
		id: 8,
		title: "Action",
		dataIndex: "id",
		key: "id",
		render: (id, { dueAmount }) => (
			<div div className='flex flex-row'>
				<Link
					to={dueAmount ? `/admin/payment/supplier/${id}` : "#"}
					state={{ dueAmount: dueAmount }}>
					<button
						className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-1  px-3  rounded mr-2 disabled:bg-gray-400'
						disabled={!dueAmount}>
						Payment
					</button>
				</Link>
			</div>
		),
	},
];
const transactionColumns = [
	{
		id: 1,
		title: "ID",
		dataIndex: "id",
		key: "id",
		render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
	},

	{
		id: 3,
		title: "Debit Account",
		dataIndex: "debit",
		key: "debit",
		render: (debit) => debit?.name,
	},

	{
		id: 4,
		title: "Credit Account",
		dataIndex: "credit",
		key: "credit",
		render: (credit) => credit?.name,
	},

	{
		id: 5,
		title: "Amount",
		dataIndex: "amount",
		key: "amount",
		responsive: ["md"],
	},
	{
		id: 6,
		title: "Particulars",
		dataIndex: "particulars",
		key: "particulars",
	},
	{
		id: 2,
		title: "Date",
		dataIndex: "date",
		key: "date",
		render: (date) => moment(date).format("ll"),
	},
];

export default function Content() {
	const dispatch = useDispatch();
	const startdate = moment().startOf("month").format("YYYY-MM-DD");
	const enddate = moment().endOf("month").format("YYYY-MM-DD");

	const { list: saleList, loading: saleLoading } = useSelector(
		(state) => state.sales
	);
	const { list: purchaseList, loading: purchaseLoading } = useSelector(
		(state) => state.purchases
	);

	const { list: transactionList, loading: transactionLoading } = useSelector(
		(state) => state.transactions
	);
	const information = useSelector((state) => state.vatTax.statement);
	useEffect(() => {
		dispatch(
			loadAllSale({
				page: 1,
				count: 5,
				startdate: startdate,
				enddate: enddate,
				user: "",
			})
		);
		dispatch(
			loadAllPurchase({
				status: true,
				page: 1,
				count: 5,
				startdate,
				enddate,
			})
		);
		dispatch(
			loadAllTransaction({
				page: 1,
				count: 5,
				startdate,
				enddate,
			})
		);
		dispatch(loadVatTaxStatement());
	}, [dispatch, enddate, startdate]);

	// return (
	// 	<div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 pb-3'>
	// 		<div className='w-full md:col-span-1'>
	// 			<DashboardTable
	// 				list={saleList}
	// 				loading={saleLoading}
	// 				title={"Recent sales"}
	// 				columns={saleColumns}
	// 				slug={"sale"}
	// 			/>
	// 		</div>
	// 		<div className='w-full md:col-span-1'>
	// 			<DashboardTable
	// 				list={purchaseList}
	// 				loading={purchaseLoading}
	// 				title={"Recent Purchase"}
	// 				columns={purchaseColumns}
	// 				slug={"purchase"}
	// 			/>
	// 		</div>
	// 		<div className='w-full md:col-span-1'>
	// 			<DashboardTable
	// 				list={transactionList}
	// 				loading={transactionLoading}
	// 				title={"Recent transaction"}
	// 				columns={transactionColumns}
	// 				slug={"transaction"}
	// 			/>
	// 		</div>
	// 		<div className='w-full md:col-span-1'>
	// 			<Card
	// 				headStyle={{ padding: "0px 16px" }}
	// 				bodyStyle={{ padding: 0 }}
	// 				style={{ height: 332 }}
	// 				extra={
	// 					<Link className='dark:text-white' to={`/admin/vat-tax`}>
	// 						Details
	// 					</Link>
	// 				}
	// 				title={"Vat/Tax info"}
	// 				// loading={"loading"}
	// 			>
	// 				<div className='p-5 pl-10'>
	// 					<h2 className='text-lg font-normal'>Total vat Balance</h2>
	// 					<h1 className='text-4xl font-bold'>
	// 						{information?.totalVat
	// 							? Number(information?.totalVat).toFixed(3)
	// 							: 0}
	// 					</h1>
	// 					<p className='text-sm font-light'>last updated recently</p>
	// 				</div>
	// 				<div className='flex items-center justify-evenly'>
	// 					<div className='flex items-center p-4 dark:bg-slate-500 dark:text-yellow-50 bg-white ant-shadow rounded-lg'>
	// 						<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-lg mr-6'>
	// 							<MdOutlineMoneyOffCsred size={40} />
	// 						</div>
	// 						<div>
	// 							<span className='block text-2xl font-bold'>
	// 								{" "}
	// 								{information?.totalVatGiven ? information?.totalVatGiven : 0}
	// 							</span>
	// 							<span className='block text-gray-500 dark:text-yellow-50'>
	// 								{" "}
	// 								Total Vat Given{" "}
	// 							</span>
	// 						</div>
	// 					</div>
	// 					<div className='flex items-center p-4 dark:bg-slate-500 dark:text-yellow-50 bg-white ant-shadow rounded-lg dashboard-card-bg'>
	// 						<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-violet-600 bg-violet-100 rounded-lg mr-6'>
	// 							<MdOutlineAttachMoney size={40} />
	// 						</div>
	// 						<div>
	// 							<span className='block text-2xl font-bold'>
	// 								{" "}
	// 								{information?.totalVatReceived
	// 									? Number(information?.totalVatReceived).toFixed(3)
	// 									: 0}
	// 							</span>
	// 							<span className='block text-gray-500 dark:text-yellow-50'>
	// 								Total Vat Received
	// 							</span>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</Card>
	// 		</div>
	// 	</div>
	// );
}
