import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Upload } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/rtk/features/product/productSlice";
import { loadAllProductBrand } from "../../redux/rtk/features/productBrand/productBrandSlice";
import { loadAllProductCategory } from "../../redux/rtk/features/productCategory/productCategorySlice";
import { loadAllProductSubCategory } from "../../redux/rtk/features/productSubCategory/productSubCategorySlice";

import { loadColorPaginated } from "../../redux/rtk/features/color/colorSlice";
import fileConfig from "../../utils/fileConfig";
import BigDrawer from "../Drawer/BigDrawer";
import AddProductCategory from "../ProductSubcategory/addProductSubcategory";
import AddProductBrand from "../productBrand/addProductBrand";
import ColorDropdown from "./colorDropDown";

const AddProd = ({ drawer }) => {
	const unitType = ["kg", "ltr", "pc"];

	const category = useSelector((state) => state.productCategories?.list);
	const subCategory = useSelector((state) => state.productSubCategories?.list);
	const brand = useSelector((state) => state.productBrands?.list);

	const { list: color } = useSelector((state) => state.colors);

	const dispatch = useDispatch();
	//useEffect for loading category list from redux
	useEffect(() => {
		dispatch(loadAllProductCategory({ page: 1, count: 100, status: true }));
		dispatch(loadAllProductSubCategory({ page: 1, count: 100, status: true }));
		dispatch(loadAllProductBrand({ page: 1, count: 100, status: true }));
		dispatch(loadColorPaginated({ count: 50 }));
	}, [dispatch]);

	const [thumbFileList, setThumbFileList] = useState([]);
	const [loader, setLoader] = useState(false);

	const [prodSubCat, setProdSubCat] = useState(null);
	const [prodBrand, setProdBrand] = useState(null);
	const [prodDescription, setProdDescription] = useState("");

	// Quill modules to add features like toolbar, image upload, etc.
	const textEditorModule = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ list: "ordered" }, { list: "bullet" }],
			["bold", "italic", "underline"],
			["link", "image"],
			[{ color: [] }, { background: [] }],
			["clean"],
		],
	};

	// Quill formats to specify allowed styles
	const textEditorFormats = [
		"header",
		"font",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
		"color",
		"background",
	];

	const prodSubCatHandler = (val) => {
		setProdSubCat(val);
	};

	const prodBrandHandler = (val) => {
		setProdBrand(val);
	};

	const prodDescriptionHandler = (val) => {
		setProdDescription(val);
	};

	const [selectedColors, setSelectedColors] = useState([]);

	const colorsHandler = (val) => {
		setSelectedColors(val);
	};

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		try {
			let formData = new FormData();

			formData.append("colors", selectedColors);
			if (fileConfig() === "laravel") {
				formData.append("images[]", thumbFileList[0].originFileObj);
			} else {
				formData.append("images", thumbFileList[0].originFileObj);
			}

			formData.append("name", values.name);
			formData.append("productSubCategoryId", prodSubCat);
			formData.append("productBrandId", prodBrand);
			formData.append("sku", values.sku);
			formData.append("unitType", values.unitType);
			formData.append("unitMeasurement", values.unitMeasurement);
			formData.append("productPurchasePrice", values.productPurchasePrice);
			formData.append("productSalePrice", values.productSalePrice);
			formData.append("productQuantity", values.productQuantity);
			formData.append("reorderQuantity", values.reorderQuantity);
			formData.append("description", prodDescription);
			formData.append("productVat", parseInt(values.productVat));

			const resp = await dispatch(addProduct(formData));

			if (resp.payload.message === "success") {
				form.resetFields();
				setThumbFileList([]);

				setSelectedColors([]);
				setProdDescription("");

				setThumbFileList([]);

				setLoader(false);
			} else {
				setLoader(false);
			}
		} catch (error) {
			setLoader(false);
		}
	};

	const onFinishFailed = (errorInfo) => {
		setLoader(false);
	};

	const handelThumbImageChange = ({ fileList }) => {
		setThumbFileList(fileList);
	};

	return (
		<>
			<Form
				form={form}
				name='basic'
				layout='vertical'
				style={{ marginLeft: "40px", marginRight: "40px" }}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'>
				<Form.Item
					style={{ marginBottom: "15px" }}
					label='Name'
					name='name'
					rules={[
						{
							required: true,
							message: "Please input Product name!",
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					style={{ marginBottom: "15px" }}
					name='productSubCategoryId'
					label='Select Subcategory'
					rules={[
						{
							required: prodSubCat === null,
							message: "Please select sub-category!",
						},
					]}>
					<Space.Compact block>
						<Select
							name='productSubCategoryId'
							loading={!subCategory}
							showSearch
							placeholder='Select Subcategory'
							optionFilterProp='children'
							filterOption={(input, option) => option.children.includes(input)}
							filterSort={(optionA, optionB) =>
								optionA.children
									.toLowerCase()
									.localeCompare(optionB.children.toLowerCase())
							}
							onChange={prodSubCatHandler}>
							{subCategory &&
								subCategory.map((subcat) => (
									<Select.Option key={subcat.id} value={subcat.id}>
										{subcat.name}
									</Select.Option>
								))}
						</Select>
						<BigDrawer btnTitle={"Sub Category"} title='new Sub-Category'>
							<AddProductCategory drawer={true} />
						</BigDrawer>
					</Space.Compact>
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					name='productBrandId'
					label='Select Brand'
					rules={[
						{
							required: prodBrand === null,
							message: "Please select brand!",
						},
					]}>
					<Space.Compact block>
						<Select
							name='productBrandId'
							loading={!brand}
							showSearch
							placeholder='Select Brand'
							optionFilterProp='children'
							filterOption={(input, option) => option.children.includes(input)}
							filterSort={(optionA, optionB) =>
								optionA.children
									.toLowerCase()
									.localeCompare(optionB.children.toLowerCase())
							}
							onChange={prodBrandHandler}>
							{brand &&
								brand.map((brandSingle) => (
									<Select.Option key={brandSingle.id} value={brandSingle.id}>
										{brandSingle.name}
									</Select.Option>
								))}
						</Select>
						<BigDrawer btnTitle={"Brand"} title='new Brand'>
							<AddProductBrand drawer={true} />
						</BigDrawer>
					</Space.Compact>
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					name='unitType'
					label='Select Unit Type '
					rules={[
						{
							required: true,
							message: "Please select unit type!",
						},
					]}>
					<Select
						name='unitType'
						loading={!category}
						showSearch
						placeholder='Select Unit Type'
						optionFilterProp='children'
						filterOption={(input, option) => option.children.includes(input)}
						filterSort={(optionA, optionB) =>
							optionA.children
								.toLowerCase()
								.localeCompare(optionB.children.toLowerCase())
						}>
						{unitType &&
							unitType.map((unit) => (
								<Select.Option key={unit} value={unit}>
									{unit}
								</Select.Option>
							))}
					</Select>
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					label='Unit Measurement'
					name='unitMeasurement'
					rules={[
						{
							required: true,
							message: "Please input Unit Measurement!",
						},
					]}>
					<Input type='number' />
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					label='Quantity'
					name='productQuantity'
					rules={[
						{
							required: true,
							message: "Please input Quantity!",
						},
					]}>
					<Input type='number' />
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					label='Purchase Price'
					name='productPurchasePrice'
					rules={[
						{
							required: true,
							message: "Please input Purchase Price!",
						},
					]}>
					<Input type='number' />
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					label='Sale Price'
					name='productSalePrice'
					rules={[
						{
							required: true,
							message: "Please input Sale Price!",
						},
					]}>
					<Input type='number' />
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					label='Reorder Quantity'
					name='reorderQuantity'
					rules={[
						{
							required: false,
							message: "Please input  Reorder Quantity!",
						},
					]}>
					<Input type='number' />
				</Form.Item>

				{color?.length && (
					<Form.Item
						style={{ marginBottom: "15px" }}
						label='Colors'
						rules={[
							selectedColors?.length === 0 && {
								required: false,
								message: "Please input Color!",
							},
						]}>
						<ColorDropdown
							data={color}
							selectedColors={selectedColors}
							colorsHandler={colorsHandler}
						/>
					</Form.Item>
				)}

				<Form.Item
					label='Upload Thumbnail Image'
					valuePropName='thumbnail_image'
					required={false}>
					<Upload
						listType='picture-card'
						beforeUpload={() => false}
						name='image'
						fileList={thumbFileList}
						maxCount={1}
						onChange={handelThumbImageChange}>
						<div>
							<PlusOutlined />
							<div
								style={{
									marginTop: 8,
								}}>
								Upload
							</div>
						</div>
					</Upload>
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					label='SKU No'
					name='sku'
					rules={[
						{
							required: false,
							message: "Please input SKU!",
						},
					]}
					initialValue="{Date.now().toString()}"
					>
					<Input disabled />
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					label='Product Vat%'
					name='productVat'>
					<Input type='number' placeholder='Enter vat/tax percentage' />
				</Form.Item>

				{/* make a description item in form */}
				<Form.Item
					style={{ marginBottom: "25px" }}
					label='Product Description '>
					<ReactQuill
						value={prodDescription}
						onChange={prodDescriptionHandler}
						modules={textEditorModule}
						formats={textEditorFormats}
					/>
				</Form.Item>

				<Form.Item
					style={{ marginBottom: "15px" }}
					className='flex justify-center mt-[24px]'>
					<Button
						type='primary'
						htmlType='submit'
						shape='round'
						loading={loader}
						onClick={() => {
							setLoader(true);
						}}>
						Add Product
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default AddProd;
