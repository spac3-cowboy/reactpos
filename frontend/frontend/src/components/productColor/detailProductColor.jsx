import {
	DeleteOutlined,
	EditOutlined,
	SolutionOutlined,
} from "@ant-design/icons";
import { Button, Card, Popover, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	clearCategory,
	deleteProductCategory,
	loadSingleProductCategory,
} from "../../redux/rtk/features/productCategory/productCategorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import Loader from "../loader/loader";

//PopUp

function CustomTable({ list, categoryName }) {
	const [columnsToShow, setColumnsToShow] = useState([]);

	const columns = [
		{
			id: 1,
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			id: 2,
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (name, { id }) => (
				<Link to={`/admin/product-subcategory/${id}`}>{name}</Link>
			),
		},
		{
			id: 3,
			title: "action",
			key: "action",
			render: ({ id }) => <ViewBtn path={`/admin/product-subcategory/${id}`} />,
		},
	];

	useEffect(() => {
		setColumnsToShow(columns);
	}, []);

	const columnsToShowHandler = (val) => {
		setColumnsToShow(val);
	};

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='card card-custom border'>
			<div className='card-body'>
				<div className='card-title d-flex justify-content-between'>
					<h5>Product List</h5>
					{list && (
						<div>
							<CSVLink
								data={list}
								className='bg-gray-700 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded mr-2 '
								filename={`category_${categoryName}`}>
								Download CSV
							</CSVLink>
						</div>
					)}
				</div>

				{list && (
					<div style={{ marginBottom: "30px" }}>
						<ColVisibilityDropdown
							options={columns}
							columns={columns}
							columnsToShowHandler={columnsToShowHandler}
						/>
					</div>
				)}

				<Table
					scroll={{ x: true }}
					loading={!list}
					columns={columnsToShow}
					dataSource={list ? addKeys(list) : []}
				/>
			</div>
		</div>
	);
}

const DetailProductColor = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	//dispatch
	const dispatch = useDispatch();
	const color = useSelector((state) => state.productCategories.category);

	//Delete Supplier
	const onDelete = () => {
		try {
			dispatch(deleteProductCategory(id));

			setVisible(false);
			toast.warning(`Product : ${color.name} is removed `);
			return navigate("/admin/product-color");
		} catch (error) {
		}
	};
	// Delete Supplier PopUp
	const [visible, setVisible] = useState(false);

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	useEffect(() => {
		dispatch(loadSingleProductCategory(id));
		return () => {
			dispatch(clearCategory());
		};
	}, [id]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<div>
			<div className='mr-top'>
				{color ? (
					<Fragment key={color.id}>
						<Card bordered={false} className='card-custom'>
							<div
								className='card-header d-flex justify-content-between'
								style={{ padding: 0 }}>
								<div className='w-50'>
									<h5>
										<SolutionOutlined />
										<span className='mr-left'>
											ID : {color.id} | {color.name}
										</span>
									</h5>
								</div>
								<div className='text-end w-50'>
									<Link
										className='me-3 d-inline-block'
										to={`/admin/product-color/${color.id}/update`}
										state={{ data: color }}>
										<Button
											type='primary'
											shape='round'
											icon={<EditOutlined />}></Button>
									</Link>
									<Popover
										content={
											<a onClick={onDelete}>
												<Button type='primary' danger>
													Yes Please !
												</Button>
											</a>
										}
										title='Are you sure you want to delete ?'
										trigger='click'
										open={visible}
										onOpenChange={handleVisibleChange}>
										<Button
											type='danger'
											DetailProductCategory
											shape='round'
											icon={<DeleteOutlined />}></Button>
									</Popover>
								</div>
							</div>

							<div className='my-2 table-responsive'>
								<h5 className='text-center mb-2'>
									Products under <strong>{color.name} </strong>
								</h5>

								<CustomTable
									list={color?.productSubCategory}
									categoryName={color?.name}
								/>
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

export default DetailProductColor;
