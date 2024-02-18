import { Button, Card, Checkbox, Col, Form, Row, Typography } from "antd";

import { Fragment, useEffect, useState } from "react";
import {
	Navigate,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import Loader from "../loader/loader";
import { addPermission, loadPermission } from "./roleApis";

function PermissionList(props) {
	const permissionNames = props.permissionNames;
	const { selectedPermission, setSelectedPermission } = props;

	const permissionElements = permissionNames.map((item) => (
		<Fragment key={item.id}>
			<Checkbox
				value={item.id}
				onChange={() => {
					setSelectedPermission((prev) => {
						return {
							...prev,
							[item.id]: !prev[item.id],
						};
					});
				}}
				checked={selectedPermission[item.id]}>
				{item.name}
			</Checkbox>
		</Fragment>
	));

	const rows = [];
	for (let i = 0; i < permissionElements.length; i += 5) {
		rows.push(
			<div
				key={i}
				className='flex justify-between m-4 border-2 border-indigo-100 px-4 py-3'>
				{permissionElements.slice(i, i + 5)}
				<br />
			</div>
		);
	}
	return <div>{rows}</div>;
}

const AddPermission = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [permissions, setPermissions] = useState([]);
	const [selectedPermission, setSelectedPermission] = useState({});
	//Loading Old data from URL
	const location = useLocation();
	const { data } = location.state;
	const roleName = data.name;
	const rolePermissions = data.rolePermission;

	const { Title } = Typography;
	const [form] = Form.useForm();
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		loadPermission().then((d) => {
			setPermissions(d);
			const permissions = d.reduce((acc, item) => {
				acc[item.id] = rolePermissions.some((i) => i.permissionId === item.id);
				return acc;
			}, {});
			setSelectedPermission(permissions);
		});
	}, [id]);

	const permisionIds = Object.entries(selectedPermission).reduce(
		(acc, [key, value]) => {
			if (value) {
				acc.push(key);
			}
			return acc;
		},
		[]
	);

	const onFinish = async (values) => {
		setLoader(true);
		try {
			const data = {
				roleId: parseInt(id),
				permissionId: permisionIds.map(Number),
			};

			const resp = await addPermission(data); //permision func

			if (resp.message === "success") {
				navigate(-1);
				setLoader(false);
			}
			if (resp.message === "error") {
				toast.error("Error at giving permission, Try again");
				setLoader(false);
				form.resetFields();
			}

			form.resetFields();
		} catch (error) {
			setLoader(false);
		}
	};

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/admin/auth/login"} replace={true} />;
	}

	return (
		<>
			<UserPrivateComponent permission={"create-rolePermission"}>
				<Row className='mr-top' justify={"center"}>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={24}
						xl={24}
						className='border rounded column-design'>
						<Card bordered={false} className='criclebox h-full'>
							<Title level={3} className='m-3 text-center mb-5'>
								Add Permission :{" "}
								<span className='text-primary'>{roleName}</span>
							</Title>

							{permissions.length > 0 ? (
								<>
									<PermissionList
										permissionNames={permissions}
										hasPermissions={rolePermissions}
										setSelectedPermission={setSelectedPermission}
										selectedPermission={selectedPermission}
									/>

									<div className='text-center'>
										<Button
											className='m-3 w-80 '
											onClick={onFinish}
											type='primary'
											htmlType='submit'
											size='large'
											shape='round'
											loading={loader}>
											Permit Now
										</Button>
									</div>
								</>
							) : (
								<Loader />
							)}
						</Card>
					</Col>
				</Row>
			</UserPrivateComponent>
		</>
	);
};

export default AddPermission;
