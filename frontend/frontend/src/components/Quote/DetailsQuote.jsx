import { SolutionOutlined } from "@ant-design/icons";
import { Badge, Card } from "antd";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	deleteQuote,
	loadSingleQuote,
} from "../../redux/rtk/features/quote/quoteSlice";
import CardComponent from "../Card/card.components";
import CommonDelete from "../CommonUi/CommonDelete";
import QuoteSlip from "../Invoice/QuoteSlip";
import Loader from "../loader/loader";
import QuoteProductList from "./QuoteProductlist";

export default function DetailsQuote() {
	const { id } = useParams("id");
	const dispatch = useDispatch();
	const { quote, loading } = useSelector((state) => state.quote);

	useEffect(() => {
		dispatch(loadSingleQuote(id));
	}, [dispatch, id]);
	return (
		<div>
			<div>
				{quote ? (
					<Fragment key={quote.id}>
						<Card bordered={false} className=' h-full'>
							<div className='flex justify-between'>
								<h5>
									<SolutionOutlined />
									<span>ID : {quote.id} |</span>
								</h5>
								<div className='card-header flex justify-between'>
									<div className={"flex items-center gap-2"}>
										<QuoteSlip data={quote} />
										<CommonDelete
											permission={"delete-quote"}
											deleteThunk={deleteQuote}
											id={id}
											className={"p-3"}
											navigatePath={"/admin/quote/"}
										/>
									</div>
								</div>
							</div>
							<div className='card-body mt-4'>
								<div className='flex justify-between gap-10'>
									<div className='w-1/2'>
										<Badge.Ribbon
											text={quote.status ? "Accepted" : "Pending"}
											color={quote.status ? "green" : "red"}>
											<CardComponent title='Quote Information'>
												<p>
													<span className='text-[14px] font-medium'>
														Quote Name:
													</span>
													<span className='text-[14px] font-bold'>
														{" "}
														{quote.quoteName}
													</span>
												</p>
												<p>
													<span className='text-[14px] font-medium'>
														Quote Date:
													</span>
													<span className='text-[14px] font-bold'>
														{" "}
														{quote.quoteDate}
													</span>
												</p>
												<p>
													<span className='text-[14px] font-medium'>
														Expiration Date:
													</span>
													<span className='text-[14px] font-bold'>
														{" "}
														{quote.expirationDate}
													</span>
												</p>
												<p>
													<span className='text-[14px] font-medium'>
														Terms And Conditions
													</span>
													<span className='text-[14px] font-bold'>
														{" "}
														{quote.termsAndConditions}
													</span>
												</p>

												<div>
													<h5 className='text-center mt-2 mb-2 border-b'>
														Description
													</h5>
													<p>{quote.description}</p>
												</div>
											</CardComponent>
										</Badge.Ribbon>
									</div>
									<div className='w-1/2'>
										<CardComponent title='Price Summary'>
											<p>
												<span className='text-[14px] font-medium'>
													Total Amount:
												</span>
												<span className='text-[14px] font-bold'>
													{" "}
													{quote.totalAmount}
												</span>
											</p>
											<p>
												<span className='text-[14px] font-medium'>
													Discount:
												</span>
												<span className='text-[14px] font-bold'>
													{" "}
													{quote.discount}
												</span>
											</p>
										</CardComponent>
									</div>
								</div>
								<br />

								{quote && (
									<QuoteProductList quoteProduct={quote.quoteProduct} />
								)}
							</div>
						</Card>
					</Fragment>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
}
