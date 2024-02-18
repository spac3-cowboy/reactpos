import { Button } from "antd";
import moment from "moment";
import React, { forwardRef, Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getSetting } from "../../redux/rtk/features/setting/settingSlice";
import numberToWords from "../../utils/numberToWords";

const PrintToPdf = forwardRef(({ data }, ref) => {
	const dispatch = useDispatch();
	const invoiceData = useSelector((state) => state?.setting?.data) || null;
	useEffect(() => {
		dispatch(getSetting());
	}, [dispatch]);

	return (
		<Fragment>
			<div ref={ref} className='invoice p-5 flex flex-col min-h-[29cm]'>
				<div className='flex-grow'>
					<div className='flex flex-col items-center justify-center my-4'>
						<h1 className='text-2xl font-semibold'>
							{invoiceData?.companyName}
						</h1>
						<h3 className='text-base font-medium'>{invoiceData?.tagLine}</h3>
						<p>{invoiceData?.address}</p>
						<p>{invoiceData?.phone}</p>
						<p>Email: {invoiceData?.email}</p>
						<p>Website: {invoiceData?.website}</p>
					</div>

					<div className='text-center col-start-1 col-end-4 row-span-2'>
						<hr className='border-t border-dotted border-gray-700' />
						<h3 className='text-center'>PURCHASE INVOICE</h3>
						<hr className='border-t border-dotted border-gray-700' />
					</div>
					<div className='flex justify-between my-5'>
						<div className='col-start-1 col-end-2 row-span-3'>
							<table className='table-auto w-full'>
								<tr>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd] font-bold'>
										Client ID
									</td>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd]'>
										{data?.supplierId}
									</td>
								</tr>
								<tr>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd] font-bold'>
										Client Name
									</td>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd]'>
										{data?.supplier?.name}
									</td>
								</tr>
								<tr>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd] font-bold'>
										Address
									</td>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd]'>
										{data?.supplier.address}
									</td>
								</tr>
								<tr>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd] font-bold'>
										Contact No
									</td>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd]'>
										{data?.supplier.phone}
									</td>
								</tr>
							</table>
						</div>

						<div className='col-start-3 col-end-4 row-span-3'>
							<table className='table-auto w-full'>
								<tr>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd] font-bold'>
										Invoice No
									</td>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd]'>
										{data?.id}
									</td>
								</tr>
								<tr>
									<td className='text-black p-2 text-left border-b border-solid border-[#ddd] font-bold'>
										Invoice Date
									</td>
									<td>{moment(data?.date).format("YYYY-MM-DD")}</td>
								</tr>
							</table>
						</div>
					</div>

					<div className='justify-stretch'>
						<table className='table-auto w-full'>
							<thead>
								<tr>
									<th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
										Sl
									</th>
									<th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
										Product Description
									</th>
									<th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
										Quantity
									</th>
									<th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
										Unit Price
									</th>
									<th className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
										Total Price
									</th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.purchaseInvoiceProduct.map((d, index) => (
										<tr className='even:bg-gray-300 odd:bg-white' key={index}>
											<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
												{d.id}
											</td>
											<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
												<p>{d.product?.name}</p>
											</td>
											<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
												{d.productQuantity}
											</td>
											<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
												{d.productPurchasePrice}
											</td>
											<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
												{d.productQuantity * d.productPurchasePrice}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>

					<div className='flex justify-between gap-4'>
						<div className=''>
							<p className='p-[6px]'>
								<b>In Words: </b>
								{numberToWords(Math.round(data.totalAmount - data.discount))}
							</p>
							<p className='p-[6px]'>
								<b>Notes: </b>
								{data.note}
							</p>
						</div>

						<div className=''>
							<table className='table-auto w-full'>
								<tr>
									<th className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										Sub total
									</th>
									<td className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										{data.totalAmount}
									</td>
								</tr>
								<tr>
									<th className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										Discount (-)
									</th>
									<td className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										{data.discount}
									</td>
								</tr>
								<tr>
									<th className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										Grand total
									</th>
									<td className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										{data.totalAmount - data.discount}
									</td>
								</tr>
								<tr>
									<th className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										Paid
									</th>
									<td className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										{data.paidAmount}
									</td>
								</tr>
								<tr>
									<th className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										Due
									</th>
									<td className='text-black p-1 text-left border-b border-solid border-[#ddd]'>
										{data.dueAmount}
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>

				<div>
					<div className='flex justify-between gap-4 mb-5'>
						<div className='w-1/2'>
							<hr />
							<p className='p-1'>Received By</p>
						</div>

						<div className='w-1/2'>
							<hr />
							<p className='p-1'>Authorized By</p>
						</div>
					</div>

					<div className='text-center'>
						<hr />
					</div>
				</div>
			</div>
		</Fragment>
	);
});

PrintToPdf.displayName = "printToPdf";
const PurchaseInvoice = ({ data }) => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div>
			<div className='hidden'>
				<PrintToPdf ref={componentRef} data={data} />
			</div>
			<Button type='primary' shape='round' onClick={handlePrint}>
				Print
			</Button>
		</div>
	);
};

export default PurchaseInvoice;
