import { Button } from "antd";
import moment from "moment";
import React, { forwardRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getSetting } from "../../redux/rtk/features/setting/settingSlice";
import numberToWords from "../../utils/numberToWords";

const PrintToPdf = forwardRef(({ data, invoiceData, vatAmount }, ref) => {
	return (
		<div ref={ref} className='invoice flex flex-col m-5 min-h-[29cm] '>
			<div className='flex-grow'>
				<div className='text-center row-span-1 col-span-2'>
					<h1 className='text-2xl font-semibold'>{invoiceData?.companyName}</h1>
					<h3 className='text-base font-medium'>{invoiceData?.tagLine}</h3>
					<p>{invoiceData?.address}</p>
					<p>{invoiceData?.phone}</p>
					<p>Email: {invoiceData?.email}</p>
					<p>Website: {invoiceData?.website}</p>
				</div>

				<div className='my-4 text-center'>
					<hr className='border-t border-dotted border-[#3f3f3f]' />
					<h3 className='text-center font-medium'>SALE INVOICE</h3>
					<hr className='border-t border-dotted border-[#3f3f3f]' />
				</div>

				<div className='flex justify-between gap-3 my-4'>
					<div className=''>
						<table className='table-auto w-full'>
							<tbody>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Client ID
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data?.customerId}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Client Name
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data?.customer.name}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Address
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data?.customer.address}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Contact No
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data?.customer.phone}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className=''>
						<table className='table-auto w-full'>
							<tbody>
								<tr>
									<td className='color-black p-2 text-left border-b border-dotted border-[#ddd] font-bold'>
										Invoice No
									</td>
									<td className='color-black p-2 text-left border-b border-dotted border-[#ddd]'>
										{data?.id}
									</td>
								</tr>
								<tr>
									<td className='color-black p-2 text-left border-b border-dotted border-[#ddd] font-bold'>
										Invoice Date
									</td>
									<td className='color-black p-2 text-left border-b border-dotted border-[#ddd]'>
										{moment(data?.date).format("YYYY-MM-DD")}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className='justify-stretch col-start-1 col-end-4 row-span-4'>
					<table className='table-auto w-full '>
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
								data.saleInvoiceProduct.map((d) => (
									<tr className='even:bg-gray-300 odd:bg-white' key={d.id}>
										<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
											{d.id}
										</td>
										<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
											<p>{d.product.name}</p>
										</td>
										<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
											{d.productQuantity}
										</td>
										<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
											{d.productSalePrice}
										</td>
										<td className='text-left p-[5px] border border-solid border-[#c0c0c0]'>
											{d.productQuantity * d.productSalePrice}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className='flex justify-between gap-4'>
					<div className=' col-start-1 col-end-3 row-span-5'>
						<p>
							<b>In Words: </b>
							{numberToWords(Math.round(data.totalAmount - data?.discount))}
						</p>
					</div>
					<div className=''>
						<table className='table-auto w-full'>
							<tbody>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										{" "}
										Total
									</td>
									<td className='color-black p-2 text-left border-b border-dotted border-[#ddd]'>
										{data.totalAmount - vatAmount}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]font-bold'>
										VAT / TAX{" "}
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{vatAmount}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Sub total
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data.totalAmount}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Discount (-)
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data.discount}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Grand total
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data.totalAmount - data.discount}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Paid
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data.paidAmount}
									</td>
								</tr>
								<tr>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd] font-bold'>
										Due
									</td>
									<td className='color-black p-1 text-left border-b border-dotted border-[#ddd]'>
										{data.dueAmount}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className='text-center'>
				<div className='flex justify-between gap-4 mb-3'>
					<div className='w-1/2'>
						<hr />
						<p>Received By</p>
					</div>

					<div className='w-1/2'>
						<hr />
						<p>Authorized By</p>
					</div>
				</div>
				<hr />
			</div>
		</div>
	);
});

PrintToPdf.displayName = "printToPdf";

const SaleInvoice = ({ data, vatAmount }) => {
	const dispatch = useDispatch();
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const invoiceData = useSelector((state) => state?.setting?.data) || null;

	useEffect(() => {
		dispatch(getSetting());
	}, [dispatch]);

	return (
		<div>
			<div className='hidden'>
				<PrintToPdf
					ref={componentRef}
					data={data}
					invoiceData={invoiceData}
					vatAmount={vatAmount}
				/>
			</div>
			{invoiceData && (
				<Button type='primary' shape='round' onClick={handlePrint}>
					Print PDF
				</Button>
			)}
		</div>
	);
};

export default SaleInvoice;
