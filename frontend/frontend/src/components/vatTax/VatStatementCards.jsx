import React, { Fragment } from "react";
import {
	MdOutlineAccountBalance,
	MdOutlineAttachMoney,
	MdOutlineMoneyOffCsred,
} from "react-icons/md";

const VatStatementCards = ({ information }) => {
	// return (
	// 	<Fragment>
	// 		<section className='grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-5 mb-5'>
	// 			<div className='flex items-center p-8 dark:bg-slate-500 dark:text-yellow-50 bg-white ant-shadow rounded-lg'>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-lg mr-6'>
	// 					<MdOutlineMoneyOffCsred size={40} />
	// 				</div>
	// 				<div>
	// 					<span className='block text-2xl font-bold'>
	// 						{" "}
	// 						{information?.totalVatGiven ? information?.totalVatGiven : 0}
	// 					</span>
	// 					<span className='block text-gray-500 dark:text-yellow-50'>
	// 						{" "}
	// 						Total Vat Given{" "}
	// 					</span>
	// 				</div>
	// 			</div>
	// 			<div className='flex items-center p-8 dark:bg-slate-500 dark:text-yellow-50 bg-white ant-shadow rounded-lg dashboard-card-bg'>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-violet-600 bg-violet-100 rounded-lg mr-6'>
	// 					<MdOutlineAttachMoney size={40} />
	// 				</div>
	// 				<div>
	// 					<span className='block text-2xl font-bold'>
	// 						{" "}
	// 						{information?.totalVatReceived
	// 							? Number(information?.totalVatReceived).toFixed(3)
	// 							: 0}
	// 					</span>
	// 					<span className='block text-gray-500 dark:text-yellow-50'>
	// 						Total Vat Received
	// 					</span>
	// 				</div>
	// 			</div>
	// 			<div className='flex items-center dark:bg-slate-500 dark:text-yellow-50 p-8 bg-white ant-shadow rounded-lg dashboard-card-bg'>
	// 				<div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-rose-500 bg-rose-100 rounded-lg mr-6'>
	// 					<MdOutlineAccountBalance size={40} />
	// 				</div>
	// 				<div>
	// 					<span className='inline-block text-2xl font-bold'>
	// 						{information?.totalVat
	// 							? Number(information?.totalVat).toFixed(3)
	// 							: 0}
	// 					</span>

	// 					<span className='block text-gray-500 dark:text-yellow-50'>
	// 						Total Vat Balance{" "}
	// 					</span>
	// 				</div>
	// 			</div>
	// 		</section>
	// 	</Fragment>
	// );
};

export default VatStatementCards;
