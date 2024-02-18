import { Button } from "antd";
import moment from "moment";
import React, { forwardRef, Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getSetting } from "../../redux/rtk/features/setting/settingSlice";
import "./posPrint.css";

const PrintToPdf = forwardRef(({ data, invoiceData, vatAmount }, ref) => {
	return (
		<Fragment>
			<div ref={ref} className='pos'>
				<div className=' font-sans text-black text-center flex flex-col items-center text-[15px]'>
					<div className=''>
						<div className=''>
							<h3 className='font-bold'>{invoiceData?.companyName}</h3>
							<div className=''>{invoiceData?.tagLine}</div>
							<div className='address'>
								{invoiceData?.address} <br /> {invoiceData?.phone}
							</div>
							<div className='email'>{invoiceData?.email}</div>
							<div className='website'>{invoiceData?.website} </div>
							<div className='bill-details'>
								<div className='flex justify-content-center'>
									<div>BILL NO: {data?.saleInvoiceProduct[0].invoiceId}</div>
								</div>
								<div className='flex justify-content-center'>
									<div>
										BILL DATE: {moment(data?.date).format("YYYY-MM-DD")}
									</div>
								</div>
							</div>
						</div>
					</div>
					<table className='table'>
						<tr className='header'>
							<th>Particulars</th> <th>Rate</th> <th>Qty</th>
							<th>Amount</th>
						</tr>

						{data &&
							data.saleInvoiceProduct.map((d) => (
								<tr key={d.id} className='data'>
									<td>{d.product.name}</td>
									<td>{d.productSalePrice}</td>
									<td>{d.productQuantity}</td>
									<td>{d.productQuantity * d.productSalePrice}</td>
								</tr>
							))}
						<tr className='subtotal'>
							<td></td>
							<td>Total</td>
							<td>
								{data.saleInvoiceProduct?.reduce(
									(totalQty, item) => totalQty + item.productQuantity,
									0
								)}
							</td>
							<td>{data.totalAmount - vatAmount}</td>
						</tr>
						<tr className='vat'>
							<td></td>
							<td>Vat/Tax</td>
							<td></td>
							<td>{vatAmount}</td>
						</tr>

						<tr className='subTotal'>
							<td></td>
							<td>Sub Total</td>
							<td></td>
							<td>{data.totalAmount}</td>
						</tr>

						<tr className='discount'>
							<td></td>
							<td>Discount(-)</td>
							<td></td>
							<td>{data.discount}</td>
						</tr>
						<tr className='total'>
							<td></td>
							<td>Grand Total</td>
							<td></td>
							<td>{data.totalAmount - data.discount}</td>
						</tr>
					</table>
					{invoiceData?.footer} <br />
				</div>
			</div>
		</Fragment>
	);
});

PrintToPdf.displayName = "printToPdf";

const PosPrint = ({ data, vatAmount }) => {
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
					POS Print
				</Button>
			)}
		</div>
	);
};

export default PosPrint;
