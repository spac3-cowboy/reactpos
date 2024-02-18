import { Select, Tag } from "antd";
import React from "react";

const tagRender = (props) => {
	const { label, closable, onClose } = props;
	const onPreventMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};
	return (
		<Tag
			onMouseDown={onPreventMouseDown}
			closable={closable}
			onClose={onClose}
			style={{
				marginRight: 3,
			}}>
			{label}
		</Tag>
	);
};

const AttributesDropdown = ({ data, attributes, attributesHandler }) => {
	const modData = data.map((dataSingle) => {
		return {
			label: dataSingle.name,
			value: dataSingle.name,
			status: dataSingle.status,
		};
	});

	const modDataFiltered = modData.filter(
		(dataSingle) => dataSingle.status === true
	);

	const handleChange = (selectedAttr) => {
		attributesHandler(selectedAttr);
	};

	return (
		<Select
			mode='multiple'
			
			tagRender={tagRender}
			style={{
				width: "100%",
			}}
			maxTagCount={0}
			options={modDataFiltered}
			maxTagPlaceholder={`${attributes.length} items Selected`}
			placeholder='Nothing Selected'
			onChange={handleChange}
		/>
	);
};
export default AttributesDropdown;
