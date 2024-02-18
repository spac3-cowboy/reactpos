import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function CreateDrawer({
	title,
	width,
	permission,
	children,
	update,
	color,
}) {
	// Drawer state
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};
	return (
		<>
			<UserPrivateComponent permission={permission}>
				<button
					onClick={() => setOpen(true)}
					className={`xs:px-3 px-1 text-sm md:text-base py-1 lg:px-5  border ${
						color ? color : "bg-violet-700"
					} hover:bg-violet-500 text-white rounded cursor-pointer`}>
					<div className='flex items-center justify-center gap-2'>
						{update ? <EditOutlined /> : <PlusOutlined />}
						<div className='min-w-[110px]'>{title}</div>
					</div>
				</button>
				<Drawer
					width={
						window.innerWidth <= 768 ? "100%" : width ? `${width}%` : "45%"
					}
					title={`${title}`}
					placement='right'
					onClose={onClose}
					open={open}>
					<div className='px-5 pt-5'> {children}</div>
				</Drawer>
			</UserPrivateComponent>
		</>
	);
}
