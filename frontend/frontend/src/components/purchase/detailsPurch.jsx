import { SolutionOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Row, Typography } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
	clearPurchase,
	loadSinglePurchase,
} from "../../redux/rtk/features/purchase/purchaseSlice";
import CardComponent from "../Card/card.components";
import PurchaseProductListCard from "../Card/purchaseInvoice/PurchaseProductListCard";
import ReturnPurchaseInvoiceList from "../Card/purchaseInvoice/ReturnPurchaseInvoiceList";
import TransactionPurchaseList from "../Card/purchaseInvoice/TransactionPurchaseList";
import PurchaseInvoice from "../Invoice/PurchaseInvoice";
import Loader from "../loader/loader";

const DetailsPurchase = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const purchase = useSelector((state) => state.purchases.purchase);
	const {
		status,
		totalPaidAmount,
		totalReturnAmount,
		dueAmount,
		singlePurchaseInvoice,
		returnPurchaseInvoice,
		transactions,
	} = purchase ? purchase : {};

	useEffect(() => {
		dispatch(loadSinglePurchase(id));
		return () => {
			dispatch(clearPurchase());
		};
	}, [dispatch, id]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<div>
				{singlePurchaseInvoice ? (
					<Fragment key={singlePurchaseInvoice.id}>
						<Card bordered={false} className='criclebox h-full'>
							<div className='flex justify-between'>
								<h5>
									<SolutionOutlined />
									<span className='mr-left'>
										ID : {singlePurchaseInvoice.id} |
									</span>
								</h5>
								<div className='card-header flex justify-between'>
									<div className='mr-4'>
										<Link
											to={`/admin/payment/supplier/${singlePurchaseInvoice.id}`}
											state={{ dueAmount: dueAmount }}>
											<Button
												type='primary'
												className='btn-sm'
												disabled={!dueAmount}>
												Payment
											</Button>
										</Link>
									</div>
									<div className='mr-4'>
										<Link to={`/admin/purchase/return/${id}`}>
											<Button type='primary' shape='round'>
												{" "}
												Return Product{" "}
											</Button>
										</Link>
									</div>

									<div className={"text-end mr-4"}>
										<PurchaseInvoice data={singlePurchaseInvoice} />
									</div>
								</div>
							</div>
							<div className='card-body mt-4'>
								<Row justify='space-around'>
									<Col span={11}>
										<Badge.Ribbon
											text={status}
											color={status === "PAID" ? "green" : "red"}>
											<CardComponent title='Purchase Invoice Information '>
												<h5 className='text-center mt-2 mb-2'>
													{" "}
													Initial Invoice Info{" "}
												</h5>
												<p>
													<Typography.Text strong>
														Total Amount :
													</Typography.Text>{" "}
													<strong>{singlePurchaseInvoice.totalAmount} </strong>
												</p>

												<p>
													<Typography.Text strong>Due Amount :</Typography.Text>{" "}
													<strong className='text-danger'>
														{" "}
														{singlePurchaseInvoice.dueAmount}
													</strong>
												</p>

												<p>
													<Typography.Text strong>
														Paid Amount :
													</Typography.Text>{" "}
													<strong>{singlePurchaseInvoice.paidAmount}</strong>
												</p>

												<p>
													<Typography.Text strong>Discount :</Typography.Text>{" "}
													<strong>{singlePurchaseInvoice.discount}</strong>
												</p>

												<p>
													<Typography.Text strong>
														Purchase Date :
													</Typography.Text>{" "}
													<strong>
														{singlePurchaseInvoice.createdAt.slice(0, 10)}
													</strong>
												</p>

												<p>
													<Typography.Text strong>
														Supplier Memo No :
													</Typography.Text>{" "}
													<strong>
														{singlePurchaseInvoice.supplierMemoNo}
													</strong>
												</p>

												<p>
													<Typography.Text strong>Note :</Typography.Text>{" "}
													<strong>{singlePurchaseInvoice.note}</strong>
												</p>

												<div>
													<h5 className='text-center mt-2 mb-2'>
														Update Invoice Info
													</h5>

													<p>
														<Typography.Text strong>
															Total Paid Amount :
														</Typography.Text>{" "}
														<strong>{totalPaidAmount}</strong>
													</p>

													<p>
														<Typography.Text strong>
															Total Return Amount:
														</Typography.Text>{" "}
														<strong>{totalReturnAmount}</strong>
													</p>

													<p>
														<Typography.Text strong>
															Due Amount :
														</Typography.Text>{" "}
														<strong style={{ color: "red" }}>
															{dueAmount}
														</strong>
													</p>
												</div>
											</CardComponent>
										</Badge.Ribbon>
									</Col>
									<Col span={12}>
										<CardComponent title='Supplier Information'>
											<p>
												<Typography.Text strong>
													Supplier Name :
												</Typography.Text>{" "}
												<strong>{singlePurchaseInvoice.supplier?.name}</strong>
											</p>

											<p>
												<Typography.Text strong>Phone :</Typography.Text>{" "}
												<strong>{singlePurchaseInvoice.supplier?.phone}</strong>
											</p>

											<p>
												<Typography.Text strong>Address :</Typography.Text>{" "}
												<strong>
													{singlePurchaseInvoice.supplier?.address}
												</strong>
											</p>
										</CardComponent>
									</Col>
								</Row>
								<br />

								<PurchaseProductListCard
									list={singlePurchaseInvoice.purchaseInvoiceProduct}
								/>
								<ReturnPurchaseInvoiceList list={returnPurchaseInvoice} />

								<TransactionPurchaseList list={transactions} />
							</div>
						</Card>
					</Fragment>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default DetailsPurchase;
