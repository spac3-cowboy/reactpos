import React, { Fragment } from "react";
import { BiCartAdd, BiCartDownload } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import "./style.css";

const NewDashboardCard = ({ information }) => {
	// return (
	// 	<Fragment>
	// 		<section className='grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5 mb-5'>
	// 			<div className='ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex items-center md:p-8 p-2 bg-white rounded-lg dashboard-card-bg '>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-lg mr-6'>
	// 					<BiCartAdd size={40} />
	// 				</div>
	// 				<div>
	// 					<span className='block text-2xl font-bold'>
	// 						{" "}
	// 						{information?.purchaseTotal ? information?.purchaseTotal : 0}
	// 					</span>
	// 					<span className='block dark:text-yellow-100 text-gray-500'>
	// 						{" "}
	// 						Total Purchase
	// 					</span>
	// 				</div>
	// 			</div>
	// 			<div className='ant-shadow sm:p-2 dark:bg-[#2e2d35] flex items-center md:p-8 p-2 bg-white rounded-lg dashboard-card-bg'>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-violet-600 bg-violet-100 rounded-lg mr-6'>
	// 					<BiCartDownload size={40} />
	// 				</div>
	// 				<div>
	// 					<span className='block text-2xl font-bold'>
	// 						{" "}
	// 						{information?.saleTotal
	// 							? Number(information?.saleTotal).toFixed(3)
	// 							: 0}
	// 					</span>
	// 					<span className='block text-gray-500 dark:text-yellow-100'>
	// 						Total Sale
	// 					</span>
	// 				</div>
	// 			</div>
	// 			<div className='ant-shadow sm:p-2 dark:bg-[#2e2d35] flex items-center md:p-8 p-2 bg-white rounded-lg dashboard-card-bg'>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-violet-500 bg-violet-100 rounded-lg mr-6'>
	// 					<FaMoneyBills size={40} />
	// 				</div>
	// 				<div>
	// 					<span className='inline-block text-2xl font-bold'>
	// 						{information?.saleProfit
	// 							? Number(information?.saleProfit).toFixed(3)
	// 							: 0}
	// 					</span>

	// 					<span className='block text-gray-500 dark:text-yellow-100'>
	// 						Total Profit{" "}
	// 					</span>
	// 				</div>
	// 			</div>

	// 			<div className='ant-shadow sm:p-2 dark:bg-[#2e2d35]  flex items-center justify-center md:p-2 p-4 bg-white rounded-lg dashboard-card-bg'>
	// 				<div className='items-center bg-transparent grid grid-cols-2 gap-1  dashboard-card-bg'>
	// 					<div className='grid grid-cols-2 gap-0 items-center bg-transparent dashboard-card-bg'>
	// 						<div className='inline-flex items-center justify-center h-12 w-12 text-indigo-600 bg-indigo-100 rounded-lg'>
	// 							<LiaFileInvoiceSolid size={25} />
	// 						</div>
	// 						<div>
	// 							<span className='block text-xl font-bold'>
	// 								{" "}
	// 								{information?.saleCount ? information?.saleCount : 0}
	// 							</span>
	// 							<span className='text-gray-500 text-xs dark:text-yellow-50'>
	// 								{" "}
	// 								Sale Invoices{" "}
	// 							</span>
	// 						</div>
	// 					</div>
	// 					<div className='ml-auto'>
	// 						<div className='grid grid-cols-2  gap-0  items-center bg-transparent dashboard-card-bg'>
	// 							<div className='inline-flex items-center justify-center h-12 w-12 text-violet-600 bg-violet-100 rounded-lg'>
	// 								<LiaFileInvoiceSolid size={25} />
	// 							</div>
	// 							<div>
	// 								<span className='block text-xl font-bold'>
	// 									{" "}
	// 									{information?.purchaseCount
	// 										? information?.purchaseCount
	// 										: 0}
	// 								</span>
	// 								<span className='text-gray-500 text-xs dark:text-yellow-50'>
	// 									{" "}
	// 									Purchase Invoices{" "}
	// 								</span>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</section>
	// 	</Fragment>
	// );
};

export default NewDashboardCard;
