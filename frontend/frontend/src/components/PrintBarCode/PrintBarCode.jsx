import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleProduct } from "../../redux/rtk/features/product/productSlice";
import { Form, InputNumber, Select } from "antd";
import { FaEye } from "react-icons/fa";
import PreviewBarCode from "./PreviewBarCode";
import AllCodePrint from "./AllCodePrint";
import { loadAllPrintPagePaginated } from "../../redux/rtk/features/printPage/printPageSlice";
import { useParams } from "react-router-dom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import AddPrintPage from "../printPageSettings/AddPrintPage";

export default function PrintBarCode() {
	const { id } = useParams("id");
	const dispatch = useDispatch();
	const { product, loading } = useSelector((state) => state.products);
	const { list: printPage, loading: printLoading } = useSelector(
		(state) => state.print
	);
	const [preview, setPreview] = useState(false);

	const [printPaper, setPrintPaper] = useState({
		pageName: "A4",
		row: 10,
		col: 3,
	});

	useEffect(() => {
		dispatch(loadSingleProduct(id));
		dispatch(loadAllPrintPagePaginated({ status: "true", page: 1, count: 10 }));
	}, [dispatch, id]);

	return (
		<div>
			<div>
				<div>
					<div className='mt-[40px] '>
						<div className='flex justify-around'>
							<div className='w-[60%] '>
								<Form className='grid grid-cols-9 gap-1'>
									<Form.Item className='col-span-3'>
										<Select
											name='pageSize'
											loading={printLoading}
											showSearch
											placeholder='page size'
											optionFilterProp='children'
											filterOption={(input, option) =>
												option.children.includes(input)
											}
											filterSort={(optionA, optionB) =>
												optionA.children
													.toLowerCase()
													.localeCompare(optionB.children.toLowerCase())
											}
											defaultValue={"A4"}
											onChange={(value) => {
												setPrintPaper({ ...printPaper, pageName: value });
											}}>
											{printPage &&
												printPage.map((page) => (
													<Select.Option
														key={page.id}
														value={page.pageSizeName}>
														{page.pageSizeName}
													</Select.Option>
												))}
										</Select>
									</Form.Item>
									<Form.Item
										className='col-span-2'
										onChange={(value) =>
											setPrintPaper({ ...printPaper, col: value.target.value })
										}>
										<CreateDrawer
											permission={"create-pageSize"}
											title={"Page Size"}
											small={true}
											width={30}>
											{<AddPrintPage />}
										</CreateDrawer>
									</Form.Item>
									<Form.Item
										className='col-span-2'
										label='Column'
										onChange={(value) =>
											setPrintPaper({ ...printPaper, col: value.target.value })
										}>
										<InputNumber
											defaultValue={printPaper?.col}
											size='small'
											placeholder='3'
										/>
									</Form.Item>
									<Form.Item
										className='col-span-2'
										label='Row'
										onChange={(value) =>
											setPrintPaper({ ...printPaper, row: value.target.value })
										}>
										<InputNumber
											defaultValue={printPaper?.row}
											size='small'
											placeholder='10'
										/>
									</Form.Item>
								</Form>
							</div>
							<div className=' flex'>
								<div>
									<button
										onClick={() => setPreview(true)}
										className=' bg-green-500 hover:bg-green-500/80 duration-200 font-medium mx-3 px-5 py-2 text-white rounded'>
										Preview <FaEye className='inline' />{" "}
									</button>
								</div>
								{printPage && (
									<AllCodePrint
										product={product}
										printPaper={printPaper}
										printPage={printPage}
									/>
								)}
							</div>
						</div>
						<div className='mt-[40px]'>
							{product && preview && (
								<PreviewBarCode
									printPage={printPage}
									product={product}
									printPaper={printPaper}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
