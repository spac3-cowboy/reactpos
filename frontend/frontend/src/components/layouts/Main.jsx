import { Affix, Drawer, Layout, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSetting } from "../../redux/rtk/features/setting/settingSlice";
import Sidenav from "../Sidenav/Sidenav";
import Footer from "./Footer";
import Header from "./Header";

const { Content, Sider } = Layout;

function Main({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	const [sideNavOpenKeys, setSideNavOpenKeys] = useState("");
	const data = useSelector((state) => state?.setting?.data) || null;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSetting());
	}, [dispatch]);

	const sideNavOpenKeysHandler = (val) => {
		setSideNavOpenKeys(val);
	};

	const handleCollapsed = (val) => {
		setCollapsed(val);
	};

	const [visible, setVisible] = useState(false);
	const [placement, setPlacement] = useState("right");
	const [imageError, setImageError] = useState();
	const [sidenavColor, setSidenavColor] = useState("#1890ff");
	const [sidenavType, setSidenavType] = useState("transparent");
	const [fixed, setFixed] = useState(false);

	const openDrawer = () => setVisible(!visible);
	const handleSidenavType = (type) => setSidenavType(type);
	const handleSidenavColor = (color) => setSidenavColor(color);
	const handleFixedNavbar = (type) => setFixed(type);

	let { pathname } = useLocation();
	pathname = pathname.replace("/", " ");

	const pathArr = pathname.split("/");

	useEffect(() => {
		if (pathname === "rtl") {
			setPlacement("left");
		} else {
			setPlacement("right");
		}
	}, [pathname]);

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	return (
		<Layout className='min-h-screen z-10'>
			{isLogged && (
				<Drawer
					title={false}
					placement={placement === "right" ? "left" : "right"}
					closable={false}
					onClose={() => setVisible(false)}
					open={visible}
					key={placement === "right" ? "left" : "right"}
					width={220}>
					{/* for small device */}
					<Layout>
						<Sider
							trigger={null}
							width={220}
							theme='light'
							className='pt-[16px] min-h-screen'>
							<Sidenav color={sidenavColor} sideNavOpenKeys={sideNavOpenKeys} />
						</Sider>
					</Layout>
				</Drawer>
			)}
			{isLogged && (
				<Sider
					breakpoint='lg'
					trigger={null}
					collapsible
					collapsed={collapsed}
					width={220}
					theme='light'
					className='hidden md:block pt-[16px] fixed top-0 left-0 bottom-0 h-screen z-10  overflow-auto no-scrollbar'>
					{collapsed ? (
						""
					) : (
						<div className='flex items-center justify-center'>
							<Skeleton loading={!data}>
								{data?.logo && !imageError ? (
									<img
										className='text-white text-center mt-2 mb-1  '
										alt='logo'
										src={data?.logo}
										style={{ width: "180PX", height: "70px" }}
										onError={() => setImageError(true)}
									/>
								) : (
									<h2
										className='text-white text-center mt-2 mb-1 flex items-center justify-center gap-2'
										style={{ fontSize: "20px" }}>
										Inventory
										<strong style={{ color: "#55F	", fontWeight: "bold" }}>
											Innova
										</strong>
									</h2>
								)}
							</Skeleton>
						</div>
					)}
					{isLogged && (
						<Sidenav color={sidenavColor} sideNavOpenKeys={sideNavOpenKeys} />
					)}
				</Sider>
			)}
			<Layout
				className={
					isLogged
						? collapsed
							? "ml-[15px] md:ml-[100px]"
							: "ml-[15px] md:ml-[240px]"
						: "ml-0"
				}>
				{fixed ? (
					<Affix>
						<Header
							onPress={openDrawer}
							name={pathname}
							subName={pathname}
							handleSidenavColor={handleSidenavColor}
							handleSidenavType={handleSidenavType}
							handleFixedNavbar={handleFixedNavbar}
							collapsed={collapsed}
							handleCollapsed={handleCollapsed}
							isLogged={isLogged}
						/>
					</Affix>
				) : (
					<Affix>
						<Header
							onPress={openDrawer}
							name={pathname}
							subName={pathname}
							handleSidenavColor={handleSidenavColor}
							handleSidenavType={handleSidenavType}
							handleFixedNavbar={handleFixedNavbar}
							collapsed={collapsed}
							handleCollapsed={handleCollapsed}
						/>
						{/* <BreadcrumbCustom /> */}
					</Affix>
				)}
				<Content className='mr-4'>{children}</Content>

				<Footer data={data} />
			</Layout>
		</Layout>
	);
}

export default Main;
