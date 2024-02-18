import {
	AppstoreAddOutlined,
	BranchesOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./layouts.css";
const { Header, Content, Footer, Sider } = Layout;

const HomeLayout = ({ children }) => (
	<Layout>
		<Sider
			breakpoint='lg'
			collapsedWidth='0'
			onBreakpoint={(broken) => {}}
			onCollapse={(collapsed, type) => {}}>
			<div className='logo '>
				<Link to='/admin'>
					<h3 className=' text-white my-[20px] mx-[10px]'>Smart ERP V1</h3>
				</Link>
			</div>

			<br />
			<br />
			<Menu
				theme='dark'
				mode='inline'
				items={[
					{
						key: 1,
						label: <NavLink to={"/admin/supplier"}>Suppliers</NavLink>,
						icon: <BranchesOutlined />,
					},
					{
						key: 2,
						label: <NavLink to={"/admin/product"}>Products</NavLink>,
						icon: <SaveOutlined />,
					},
					{
						key: 3,
						label: <NavLink to={"/admin/purchase"}>Purchase New</NavLink>,
						icon: <AppstoreAddOutlined />,
					},
					{
						key: 4,
						label: <NavLink to={"/admin/users"}>User List</NavLink>,
						icon: <AppstoreAddOutlined />,
					},
				]}
			/>
		</Sider>
		<Layout>
			<Header
				className='text-white'
				style={{
					padding: 0,
				}}
			/>
			<Content
				style={{
					margin: "24px 16px 0",
				}}>
				<div
					className='text-white'
					style={{
						padding: 24,
						minHeight: 360,
					}}>
					{children}
				</div>
			</Content>
			<Footer
				style={{
					textAlign: "center",
				}}></Footer>
		</Layout>
	</Layout>
);

export default HomeLayout;
