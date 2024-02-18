import { useState } from "react";
import { Link } from "react-router-dom";

import { Card, Segmented } from "antd";
import { useEffect } from "react";

import { SolutionOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddProd from "./addProd";
import GenerateBarcodePopUp from "./generateBarcodePopUp";

const GetAllProd = (props) => {
	const dispatch = useDispatch();
	const { list, loading, total } = useSelector((state) => state.products);
	const handleOnError = (e) => {
		e.target.src = "/images/default.jpg";
	};
	const columns = [
		{
			id: 1,
			title: "Image",
			dataIndex: "productThumbnailImageUrl",
			render: (productThumbnailImageUrl) => (
				<div className='w-[2.5rem] h-[1.375rem] relative'>
					<img
						className='absolute object-cover w-full h-full'
						alt='product'
						onError={handleOnError}
						src={productThumbnailImageUrl || "/images/default.jpg"}
					/>
				</div>
			),
			key: "image",
		},
		{
			id: 2,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			id: 3,
			title: "SKU",
			dataIndex: "sku",
			key: "sku",
		},
		{
			id: 3,
			title: "Vat",
			dataIndex: "productVat",
			key: "vat",
			render: (item) => <>{item}%</>,
		},
		{
			id: 4,
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (name, { id }) => <Link to={`/admin/product/${id}`}>{name}</Link>,
		},
		{
			id: 5,
			title: "U.M.",
			dataIndex: "unitMeasurement",
			key: "unitMeasurement",
		},
		{
			id: 6,
			title: "QTY",
			dataIndex: "productQuantity",
			key: "productQuantity",
		},
		{
			id: 7,
			title: "Purchase price",
			dataIndex: "productPurchasePrice",
			key: "productPurchasePrice",
			responsive: ["md"],
		},
		{
			id: 8,
			title: "Sale price",
			dataIndex: "productSalePrice",
			key: "productSalePrice",
			responsive: ["md"],
		},
		{
			id: 9,
			title: "Sub Category",
			dataIndex: "productSubCategory",
			key: "productSubCategory",
			render: (productSubCategory) => productSubCategory?.name,
		},
		{
			id: 10,
			title: "Brand",
			dataIndex: "productBrand",
			key: "productBrand",
			render: (productBrand) => productBrand?.name,
		},
		{
			id: 11,
			title: "Unit Type",
			dataIndex: "unitType",
			key: "unitType",
		},

		{
			id: 12,
			title: "Reorder QTY",
			dataIndex: "reorderQuantity",
			key: "reorderQuantity",
		},
		{
			id: 13,
			title: "Action",
			key: "action",
			render: ({ id }) => (
				<div className='flex'>
					<ViewBtn path={`/admin/product/${id}`} />
					<Link
						to={`/admin/print-barcode/${id}`}
						className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-1 px-3 rounded mr-2'>
						Barcode
					</Link>
				</div>
			),
		},
	];
	useEffect(() => {
		dispatch(loadProduct({ status: "true", page: 1, count: 10 }));
	}, [dispatch]);

	const [status, setStatus] = useState("true");
	const onChange = (value) => {
		setStatus(value);
		dispatch(loadProduct({ status: value, page: 1, count: 10 }));
	};

	return (
		<Card
			className='border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]'
			bodyStyle={{ padding: 0 }}>
			<div className='lg:flex items-center justify-between pb-3'>
				<h1 className='text-lg font-bold'>Product List</h1>
				<div className='flex gap-0  md:gap-5 items-center justify-between md:justify-start'>
					<Segmented
						className='text-center rounded text-red-500 '
						size='middle'
						options={[
							{
								label: (
									<span>
										<SolutionOutlined /> Active
									</span>
								),
								value: "true",
							},
							{
								label: (
									<span>
										<UserDeleteOutlined /> Inactive
									</span>
								),
								value: "false",
							},
						]}
						value={status}
						onChange={onChange}
					/>
					<CreateDrawer permission={"create-product"} title={"Create Product"}>
						<AddProd />
					</CreateDrawer>
				</div>
			</div>
			<UserPrivateComponent permission={"readAll-product"}>
				<TableComponent
					list={list}
					total={total}
					loading={loading}
					columns={columns}
					csvFileName='Products'
					paginatedThunk={loadProduct}
				/>
			</UserPrivateComponent>
		</Card>
	);
};

export default GetAllProd;
