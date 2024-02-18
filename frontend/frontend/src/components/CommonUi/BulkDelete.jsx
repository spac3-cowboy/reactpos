import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function BulkDelete({
	selected,
	setSelected,
	updateThunk,
	loadThunk,
}) {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const showPopconfirm = () => {
		setOpen(true);
	};
	const handleOk = async () => {
		setConfirmLoading(true);
		try {
			const update = await dispatch(updateThunk(selected));

			if (update?.payload?.message === "success") {
				setOpen(false);
				setSelected([]);
				setConfirmLoading(false);
				dispatch(loadThunk({}));
			}
		} catch (err) {
			setOpen(false);
			setConfirmLoading(false);
		}
	};
	const handleCancel = () => {
		setOpen(false);
	};
	return (
		<Popconfirm
			title={`You are going to delete ${selected.length} items. Are you sure?`}
			open={open}
			placement='topLeft'
			onConfirm={handleOk}
			okButtonProps={{
				loading: confirmLoading,
			}}
			onCancel={handleCancel}>
			<Button type='danger' onClick={showPopconfirm}>
				Delete {selected.length} items
			</Button>
		</Popconfirm>
	);
}
