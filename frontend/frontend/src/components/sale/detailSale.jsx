import { Badge, Button, Card, Col, Row, Typography } from "antd";
import { SolutionOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	clearSale,
	deleteSale,
	loadSingleSale,
} from "../../redux/rtk/features/sale/saleSlice";
import CardComponent from "../Card/card.components";
import ReturnSaleInvoiceList from "../Card/saleInvoice/ReturnSaleInvoiceList";
import SaleProductListCard from "../Card/saleInvoice/SaleProductListCard";
import TransactionSaleList from "../Card/saleInvoice/TransactionSaleList";
import PackingSlip from "../Invoice/PackingSlip";
import PosPrint from "../Invoice/PosPrint";
import SaleInvoice from "../Invoice/SaleInvoice";
import Loader from "../loader/loader";
import ChangeOrderStatus from "./ChangeOrderStatus";
//PopUp

const DetailSale = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const sale = useSelector((state) => state?.sales?.sale);
	const {
		status,
		totalPaidAmount,
		totalVatAmount,
		totalReturnAmount,
		dueAmount,
		singleSaleInvoice,
		returnSaleInvoice,
		transactions,
	} = sale ? sale : {};

	//Delete Customer
	const onDelete = () => {
		try {
			dispatch(deleteSale(id));

			setVisible(false);
			return navigate("/admin/salelist");
		} catch (error) {}
	};
	// Delete Customer PopUp
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadSingleSale(id));
		return () => {
			dispatch(clearSale());
		};
	}, [id, dispatch]);

	return (
		<div>
			<div className='mr-top'>
				{singleSaleInvoice ? (
					<Fragment key={singleSaleInvoice.id}>
						<Card bordered={false} className='card-custom'>
							<h5 className='m-2 text-xl'>
								<SolutionOutlined />
								<span className='mr-left'>ID : {singleSaleInvoice.id} |</span>
							</h5>
							<div className='card-header flex justify-center '>
								<div className='mr-2'>
									<Link
										to={`/admin/payment/customer/${singleSaleInvoice.id}`}
										state={{ dueAmount: dueAmount }}>
										<Button
											type='primary'
											className='btn-sm'
											disabled={!dueAmount}>
											Payment
										</Button>
									</Link>
								</div>
								<div className='mr-2'>
									<Link to={`/admin/sale/return/${id}`}>
										<Button type='primary' shape='round'>
											{" "}
											Return Product{" "}
										</Button>
									</Link>
								</div>

								<div className={"text-end mr-2"}>
									<SaleInvoice
										data={singleSaleInvoice}
										vatAmount={totalVatAmount}
									/>
								</div>
								<div className={"text-end mr-2"}>
									<PackingSlip data={singleSaleInvoice} />
								</div>
								<div className={"text-end mr-2"}>
									<PosPrint
										data={singleSaleInvoice}
										vatAmount={totalVatAmount}
									/>
								</div>
								<div className='text-end mr-2'>
									<ChangeOrderStatus saleId={singleSaleInvoice.id} />
								</div>
							</div>
							<div className='card-body mt-5'>
								<Row justify='space-around'>
									<Col span={11}>
										<Badge.Ribbon
											text={status}
											color={status === "PAID" ? "green" : "red"}>
											<Badge.Ribbon
												text={singleSaleInvoice.orderStatus}
												color={
													singleSaleInvoice.orderStatus === "received"
														? "success"
														: "orange"
												}
												className='mt-10'>
												<CardComponent title='Sale Invoice Information '>
													<h5 className='text-center mt-2 mb-2'>
														Initial Invoice Info
													</h5>

													<p>
														<Typography.Text strong>
															Total Amount :
														</Typography.Text>{" "}
														<strong>
															{singleSaleInvoice?.totalAmount
																? Number(singleSaleInvoice.totalAmount).toFixed(
																		3
																  )
																: 0}
														</strong>
													</p>

													<p>
														<Typography.Text strong>
															Due Amount :
														</Typography.Text>{" "}
														<strong style={{ color: "red" }}>
															{" "}
															{singleSaleInvoice?.dueAmount
																? Number(singleSaleInvoice.dueAmount).toFixed(3)
																: 0}
														</strong>
													</p>

													<p>
														<Typography.Text strong>
															Paid Amount :
														</Typography.Text>{" "}
														<strong>
															{singleSaleInvoice?.paidAmount
																? Number(singleSaleInvoice.paidAmount).toFixed(
																		3
																  )
																: 0}
														</strong>
													</p>

													<p>
														<Typography.Text strong>Discount :</Typography.Text>{" "}
														<strong>
															{singleSaleInvoice?.discount
																? Number(singleSaleInvoice.discount).toFixed(3)
																: 0}
														</strong>
													</p>

													<p>
														<Typography.Text strong>Profit :</Typography.Text>{" "}
														<strong>
															{singleSaleInvoice?.profit
																? Number(singleSaleInvoice.profit).toFixed(3)
																: 0}
														</strong>
													</p>

													<p>
														<Typography.Text strong>
															Sale Date :
														</Typography.Text>{" "}
														<strong>
															{singleSaleInvoice.createdAt.slice(0, 10)}
														</strong>
													</p>

													<div>
														<h5 className='text-center mt-2 mb-2'>
															Update Invoice Info
														</h5>

														<p>
															<Typography.Text strong>
																Total Paid Amount :
															</Typography.Text>{" "}
															<strong>
																{totalPaidAmount
																	? Number(totalPaidAmount).toFixed(3)
																	: 0}
															</strong>
														</p>
														<p>
															<Typography.Text strong>
																Total Vat Amount :
															</Typography.Text>{" "}
															<strong>
																{totalVatAmount
																	? Number(totalVatAmount).toFixed(3)
																	: 0}
															</strong>
														</p>

														<p>
															<Typography.Text strong>
																Total Return Amount:
															</Typography.Text>{" "}
															<strong>
																{totalReturnAmount
																	? Number(totalReturnAmount).toFixed(3)
																	: 0}
															</strong>
														</p>

														<p>
															<Typography.Text strong>
																Due Amount :
															</Typography.Text>{" "}
															<strong style={{ color: "red" }}>
																{dueAmount ? Number(dueAmount).toFixed(3) : 0}
															</strong>
														</p>
													</div>
												</CardComponent>
											</Badge.Ribbon>
										</Badge.Ribbon>
									</Col>
									<Col span={12}>
										<CardComponent title='Customer Information'>
											<p>
												<Typography.Text strong>
													Customer Name :
												</Typography.Text>{" "}
												<strong>{singleSaleInvoice.customer.name}</strong>
											</p>

											<p>
												<Typography.Text strong>Phone :</Typography.Text>{" "}
												<strong>{singleSaleInvoice.customer.phone}</strong>
											</p>

											<p>
												<Typography.Text strong>Address :</Typography.Text>{" "}
												<strong>{singleSaleInvoice.customer.address}</strong>
											</p>
										</CardComponent>
									</Col>
								</Row>
								<br />
							</div>
						</Card>
						<SaleProductListCard list={singleSaleInvoice.saleInvoiceProduct} />

						<ReturnSaleInvoiceList list={returnSaleInvoice} />

						<TransactionSaleList list={transactions} />
					</Fragment>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default DetailSale;
