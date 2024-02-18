import moment from "moment";
import React, { forwardRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getSetting } from "../../redux/rtk/features/setting/settingSlice";

const PrintToPdf = forwardRef(
	({ data, settingData, date, user, total }, ref) => {
		// make the sum of all the discount in the data array
		const totalDiscount = data?.reduce((acc, item) => {
			return acc + item?.discount;
		}, 0);

		return (
			<>
				<div ref={ref} className={`invoice flex flex-col p-10 h-screen`}>
					<div className='flex-grow h-full flex flex-col gap-4'>
						<div className='p-2 col-span-3 flex items-center justify-center flex-col'>
							<h1 className='text-2xl font-bold'>{settingData?.companyName}</h1>
							<h3 className='text-lg font-semibold'>{settingData?.tagLine}</h3>
							<p>{settingData?.address}</p>
							<p>{settingData?.phone}</p>
							<p>Email: {settingData?.email}</p>
							<p>Website: {settingData?.website}</p>
						</div>
						<div className='p-2 col-span-3 md:hover:text-black text-center'>
							<hr className='border-t border-dotted border-gray-300' />
							<h3 className='text-center'>SALES REPORT</h3>
							<hr className='border-t border-dotted border-gray-300' />
						</div>

						<div className='flex justify-between'>
							<div className='p-2'>
								<table className='w-full'>
									<tbody>
										<tr>
											<td className='font-bold pr-5'>Type</td>
											<td>All</td>
										</tr>
										<tr>
											<td className='font-bold pr-5'>Sales Person</td>
											<td>{user ? data[0]?.user?.username : "All"} </td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className='p-2'>
								<table className='w-full'>
									<tbody>
										<tr>
											<td className='font-bold pr-5'>From Date</td>
											<td>{date?.startdate}</td>
										</tr>
										<tr>
											<td className='font-bold pr-5'>To Date</td>
											<td>{date?.enddate}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className='p-2 flex justify-stretch'>
							<table className='text-xs w-full'>
								<thead>
									<tr>
										<th className='border border-gray-300'>Date</th>
										<th className='border border-gray-300'>Invoice</th>
										<th className='border border-gray-300'>Staff</th>
										<th className='border border-gray-300'>Customer</th>
										<th className='border border-gray-300'>Product</th>
										<th className='border border-gray-300'>Qty</th>
										<th className='border border-gray-300'>U.M</th>
										<th className='border border-gray-300'>U.T</th>
										<th className='border border-gray-300'>Total</th>
										<th className='border border-gray-300'>S Total</th>
										<th className='border border-gray-300'>Discount</th>
										<th className='border border-gray-300'>G Total</th>
										<th className='border border-gray-300'>Paid</th>
										<th className='border border-gray-300'>Due</th>
									</tr>
								</thead>
								<tbody>
									{data &&
										data?.map((i, index) => (
											<tr key={index}>
												<td className='border border-gray-300'>
													{moment(i?.date).format("ll")}
												</td>
												<td className='border border-gray-300'>
													<p>{i?.id}</p>
												</td>
												<td className='border border-gray-300'>
													{i?.user?.username}
												</td>
												<td className='border border-gray-300'>
													{i?.customer?.name}
												</td>
												<td className='border border-gray-300'>
													{i?.saleInvoiceProduct?.map((s, index) => (
														<p key={index}>{s.product?.name}</p>
													))}
												</td>
												<td className='border border-gray-300'>
													{i?.saleInvoiceProduct?.map((s, index) => (
														<p key={index}>{s?.productQuantity}</p>
													))}
												</td>
												<td className='border border-gray-300'>
													{i?.saleInvoiceProduct?.map((s, index) => (
														<p key={index}>{s?.product?.unitMeasurement}</p>
													))}
												</td>
												<td className='border border-gray-300'>
													{i?.saleInvoiceProduct?.map((s, index) => (
														<p key={index}>{s?.product?.unitType}</p>
													))}
												</td>
												<td className='border border-gray-300'>
													{i?.saleInvoiceProduct?.map((s, index) => (
														<p key={index}>
															{s?.productQuantity * s?.productSalePrice}
														</p>
													))}
												</td>
												<td className='border border-gray-300'>
													{i.totalAmount}
												</td>
												<td className='border border-gray-300'>{i.discount}</td>
												<td className='border border-gray-300'>
													{i.totalAmount - i.discount}
												</td>
												<td className='border border-gray-300'>
													{i.paidAmount}
												</td>
												<td className='border border-gray-300'>
													{i.dueAmount}
												</td>
											</tr>
										))}

									<tr className='font-weight-bold'>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td className='border border-gray-300'>Total</td>
										<td className='border border-gray-300'>
											{total?.totalUnitQuantity}
										</td>
										<td className='border border-gray-300'>
											{total?.totalUnitMeasurement}
										</td>
										<td className='border border-gray-300'></td>
										<td className='border border-gray-300'></td>
										<td className='border border-gray-300'>
											{total?.totalAmount}
										</td>
										<td className='border border-gray-300'>{totalDiscount}</td>
										<td className='border border-gray-300'>
											{total?.totalAmount - totalDiscount}
										</td>
										<td className='border border-gray-300'>
											{total?.paidAmount}
										</td>
										<td className='border border-gray-300'>
											{total?.dueAmount}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className='col-span-3 text-center'>
						<hr />
						<p>
							Powered by{" "}
							{settingData?.footer || "OMEGA SOLUTION | Contact: 01885 996601"}
						</p>
					</div>
				</div>
			</>
		);
	}
);

PrintToPdf.displayName = "printToPdf";

const SaleReportPrint = ({ data, date, user, total }) => {
	const componentRef = useRef();
	const dispatch = useDispatch();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: "Sale Report",
	});
	const setting = useSelector((state) => state?.setting?.data) || null;

	useEffect(() => {
		dispatch(getSetting());
	}, [dispatch]);

	return (
		<div>
			{data && (
				<div className='hidden'>
					<PrintToPdf
						ref={componentRef}
						data={data}
						settingData={setting}
						date={date}
						user={user}
						total={total}
					/>
				</div>
			)}
			{setting && (
				<div className='w-full mx-0 md:py-2 text-center bg-violet-700 hover:bg-violet-500 text-white font-bold py-1 px-3 rounded mr-2 ml-2'>
					<button onClick={handlePrint}>Print Sale Report</button>
				</div>
			)}
		</div>
	);
};

export default SaleReportPrint;
