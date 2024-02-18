import { EditOutlined } from "@ant-design/icons";
import { Card, Col, Image, Row } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
	clearProduct,
	deleteProduct,
	loadSingleProduct,
} from "../../redux/rtk/features/product/productSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import Loader from "../loader/loader";
import GenerateBarcode from "./barcodeGenerator";
import { BiBarcodeReader } from "react-icons/bi";

const DetailsProd = () => {
	const { id } = useParams();

	//dispatch
	const dispatch = useDispatch();
	const product = useSelector((state) => state.products.product);

	useEffect(() => {
		dispatch(loadSingleProduct(id));
		return () => {
			dispatch(clearProduct());
		};
	}, [dispatch, id]);
	const handleOnError = (e) => {
		e.target.src = "/images/default.jpg";
	};

	return (
		<div className='rounded p-4 bg-[#eff3f7]'>
			<div className='flex justify-between items-center'>
				<h1 className='text-[25px] text-gray-600 font-semibold pb-4 '>
					Products Details
				</h1>
				<div className='card-header flex justify-between m-3'>
					<div className='flex items-center gap-3 bg-[#eff3f7]'>
						<Link
							to={`/admin/print-barcode/${id}`}
							className='className=m-2  bg-blue-500 p-2 text-white rounded-md flex justify-between items-center'>
							<BiBarcodeReader className='p-0 w-7 h-7 text-xl mr-2' /> Print
							Barcode
						</Link>
						<Link
							className='m-2 inline-block bg-blue-500 p-2 text-white rounded-md'
							to={`/admin/product/${product?.id}/update`}
							state={{ data: product }}>
							<EditOutlined className='p-0 w-7 h-7 text-xl' />
						</Link>
						<CommonDelete
							id={id}
							className={"p-1 w-11 h-11 text-xl"}
							permission={"delete-product"}
							deleteThunk={deleteProduct}
							navigatePath={"/admin/product"}
						/>
					</div>
				</div>
			</div>
			<div className='bg-white rounded-md p-[30px]'>
				{product ? (
					<>
						<Fragment key={product?.id}>
							<Card bordered={false} className='card-custom'>
								<Row className='flex'>
									<Col xs={24} xl={14} className='flex'>
										<div className='w-full'>
											<div className='border-b-2 border-gray-200 px-5 py-4 flex justify-start'>
												<span className='text-gray-600 text-[16px] font-semibold w-[60%]'>
													Product
												</span>
												<span className='text-gray-600 text-[16px] font-semibold w-[40%]'>
													{product?.name}
												</span>
											</div>
											<div className='border-b-2 border-gray-200 px-5 py-4 flex justify-start'>
												<span className='text-gray-600 text-[16px] font-semibold w-[60%]'>
													Category
												</span>
												<span className='text-gray-600 text-[16px] font-semibold w-[40%]'>
													{product?.productSubCategory?.name}
												</span>
											</div>
											<div className='border-b-2 border-gray-200 px-5 py-4 flex justify-start'>
												<span className='text-gray-600 text-[16px] font-semibold w-[60%]'>
													Brand
												</span>
												<span className='text-gray-600 text-[16px] font-semibold w-[40%]'>
													{product?.productBrand?.name}
												</span>
											</div>
											<div className='border-b-2 border-gray-200 px-5 py-4 flex justify-start'>
												<span className='text-gray-600 text-[16px] font-semibold w-[60%]'>
													Cost
												</span>
												<span className='text-gray-600 text-[16px] font-semibold w-[40%]'>
													$ {product?.productPurchasePrice}
												</span>
											</div>
											<div className='border-b-2 border-gray-200 px-5 py-4 flex justify-start'>
												<span className='text-gray-600 text-[16px] font-semibold w-[60%]'>
													Price
												</span>
												<span className='text-gray-600 text-[16px] font-semibold w-[40%]'>
													$ {product?.productSalePrice}
												</span>
											</div>
											<div className='border-b-2 border-gray-200 px-5 py-4 flex justify-start'>
												<span className='text-gray-600 text-[16px] font-semibold w-[60%]'>
													Unit
												</span>
												<span className='text-gray-600 text-[16px] font-semibold w-[40%]'>
													<span className='text-violet-400 bg-violet-200/60 py-[2px] px-3 rounded-sm'>
														{product.unitType}
													</span>
												</span>
											</div>
											<div className='border-b-2 border-gray-200 px-5 py-4 flex justify-start'>
												<span className='text-gray-600 text-[16px] font-semibold w-[60%]'>
													Tax
												</span>
												<span className='text-gray-600 text-[16px] font-semibold w-[40%]'>
													{product?.productVat}%{" "}
												</span>
											</div>
											<div className='border-b-2 border-gray-200 px-5 py-4 flex justify-start'>
												<span className='text-gray-600 text-[16px] font-semibold w-[60%]'>
													Stock Amount
												</span>
												<span className='text-gray-600 text-[16px] font-semibold w-[40%]'>
													{product?.productQuantity}
												</span>
											</div>
										</div>
									</Col>
									{/* image slider column */}
									<Col xs={24} xl={10} className='flex flex-col items-center'>
										<div className='mb-[40px]'>
											<GenerateBarcode sku={product.sku} />
										</div>

										<Image
											className='fluid  max-w-[500px]'
											src={
												product?.productThumbnailImageUrl ||
												"/images/default.jpg"
											}
											onError={handleOnError}
										/>
										<div className='mt-5'>
											<span className='text-lg flex justify-start items-center gap-3'>
												{product?.productColor?.map((item, index) => (
													<span key={index} className='flex gap-1 items-center'>
														<span
															style={{
																backgroundColor: item.color?.colorCode,
															}}
															className='w-5 h-5 rounded-full inline-block'></span>
													</span>
												))}
											</span>
										</div>
									</Col>
								</Row>

								<div className='productDescription'>
									<h1 className='font-medium text-xl text-center py-5 mt-10'>
										Product description
									</h1>
									<p
										className='text-lg'
										dangerouslySetInnerHTML={{
											__html: product?.description,
										}}></p>
								</div>
							</Card>
						</Fragment>
					</>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default DetailsProd;
