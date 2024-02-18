import React, { Fragment } from "react";
import { FaCoins } from "react-icons/fa";
import {
	FaMoneyBillTransfer,
	FaMoneyBillTrendUp,
	FaMoneyBills,
} from "react-icons/fa6";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import "./Dashboard/style.css";

const DashboardCard = ({ information, count, isCustomer, title }) => {
	// return (
	// 	<Fragment>
	// 		<section className='grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5 mb-5'>
	// 			<div className='ant-shadow dark:bg-[#2e2d35]   flex items-center p-8 bg-white rounded-lg dashboard-card-bg'>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-lg mr-6'>
	// 					<LiaFileInvoiceSolid size={40} />
	// 				</div>
	// 				<div>
	// 					<span className='block text-2xl font-bold'>
	// 						{" "}
	// 						{count?.id ? count?.id : 0}
	// 					</span>
	// 					<span className='block text-gray-500 dark:text-yellow-50'>
	// 						{" "}
	// 						Total Inoices{" "}
	// 					</span>
	// 				</div>
	// 			</div>
	// 			<div className='ant-shadow dark:bg-[#2e2d35]  flex items-center p-8 bg-white rounded-lg dashboard-card-bg'>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-violet-600 bg-violet-100 rounded-lg mr-6'>
	// 					<FaCoins size={30} />
	// 				</div>
	// 				<div>
	// 					<span className='block text-2xl font-bold'>
	// 						{" "}
	// 						{information?.totalAmount
	// 							? Number(information?.totalAmount).toFixed(3)
	// 							: 0}
	// 					</span>
	// 					<span className='block text-gray-500 dark:text-yellow-50'>
	// 						Total Amount
	// 					</span>
	// 				</div>
	// 			</div>
	// 			<div className='ant-shadow dark:bg-[#2e2d35]  flex items-center p-8 bg-white rounded-lg dashboard-card-bg'>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-violet-500 bg-violet-100 rounded-lg mr-6'>
	// 					<FaMoneyBills size={35} />
	// 				</div>
	// 				<div>
	// 					<span className='inline-block text-2xl font-bold'>
	// 						{information?.profit ? Number(information?.profit).toFixed(3) : 0}
	// 					</span>

	// 					<span className='block text-gray-500 dark:text-yellow-50'>
	// 						Total Profit{" "}
	// 					</span>
	// 				</div>
	// 			</div>

	// 			{!isCustomer ? (
	// 				<div className='ant-shadow dark:bg-[#2e2d35]  flex items-center p-8 bg-white rounded-lg dashboard-card-bg'>
	// 					<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-violet-600 bg-violet-100 rounded-lg mr-6'>
	// 						<svg
	// 							width='50px'
	// 							height='50px'
	// 							viewBox='0 0 24 24'
	// 							fill='none'
	// 							xmlns='http://www.w3.org/2000/svg'>
	// 							<g id='SVGRepoBgCarrier' strokeWidth='0'></g>
	// 							<g
	// 								id='SVGRepoTracerCarrier'
	// 								strokeLinecap='round'
	// 								strokeLinejoin='round'></g>
	// 							<g id='SVGRepoIconCarrier'>
	// 								{" "}
	// 								<path
	// 									d='M21.9707 12C21.9707 15.31 19.2807 18 15.9707 18C14.4307 18 13.0307 17.42 11.9707 16.46C13.2007 15.37 13.9707 13.77 13.9707 12C13.9707 10.23 13.2007 8.63 11.9707 7.54C13.0307 6.58 14.4307 6 15.9707 6C19.2807 6 21.9707 8.69 21.9707 12Z'
	// 									fill='#7c3aed'></path>{" "}
	// 								<path
	// 									opacity='0.4'
	// 									d='M13.9707 12C13.9707 13.77 13.2007 15.37 11.9707 16.46C10.9107 17.42 9.5107 18 7.9707 18C4.6607 18 1.9707 15.31 1.9707 12C1.9707 8.69 4.6607 6 7.9707 6C9.5107 6 10.9107 6.58 11.9707 7.54C13.2007 8.63 13.9707 10.23 13.9707 12Z'
	// 									fill='#7c3aed'></path>{" "}
	// 							</g>
	// 						</svg>
	// 					</div>
	// 					<div>
	// 						<span className='inline-block text-2xl font-bold'>
	// 							{information?.paidAmount ? information?.paidAmount : 0}
	// 						</span>

	// 						<span className='block text-gray-500 dark:text-yellow-50'>
	// 							Total Paid Amount{" "}
	// 						</span>
	// 					</div>
	// 				</div>
	// 			) : (
	// 				<div className='ant-shadow dark:bg-[#2e2d35]  flex items-center p-8 bg-white rounded-lg dashboard-card-bg'>
	// 					<div className='flex items-center bg-transparent dashboard-card-bg'>
	// 						<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-indigo-600 bg-indigo-100 rounded-lg mr-6'>
	// 							<FaMoneyBillTransfer size={35} />
	// 						</div>
	// 						<div>
	// 							<span className='block text-2xl font-bold'>
	// 								{" "}
	// 								{information?.paidAmount
	// 									? Number(information?.paidAmount).toFixed(1)
	// 									: 0}
	// 							</span>
	// 							<span className='block text-gray-500 dark:text-yellow-50'>
	// 								{" "}
	// 								Paid Amount{" "}
	// 							</span>
	// 						</div>
	// 					</div>
	// 					<div className='ml-auto'>
	// 						<div className='flex items-center bg-transparent dashboard-card-bg'>
	// 							<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-rose-500 bg-rose-100 rounded-lg mr-6'>
	// 								<FaMoneyBillTrendUp size={30} />
	// 							</div>
	// 							<div>
	// 								<span className='block text-2xl font-bold'>
	// 									{" "}
	// 									{information?.dueAmount
	// 										? Number(information?.dueAmount).toFixed(1)
	// 										: 0}
	// 								</span>
	// 								<span className='block text-gray-500 dark:text-yellow-50'>
	// 									{" "}
	// 									Due Amount{" "}
	// 								</span>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			)}
	// 		</section>
	// 	</Fragment>
	// );
};

export default DashboardCard;
