import { Select, Tag } from "antd";
import React from "react";
import fileConfig from "../../utils/fileConfig";

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
      }}
    >
      {label}
    </Tag>
  );
};

const ColorDropdown = ({ data, selectedColors, colorsHandler }) => {
  const modDataFiltered = data.filter((dataSingle) => {
    if (fileConfig() === "laravel") {
      return dataSingle.status === "true";
    } else {
      return dataSingle.status === true;
    }
  });

  const modData = modDataFiltered.map((dataSingle) => {
    return {
      label: (
        <span>
          <span
            style={{
              backgroundColor: dataSingle.colorCode,
              width: "12px",
              height: "12px",
              display: "inline-block",
              marginRight: "6px",
            }}
          ></span>
          {dataSingle.name}
        </span>
      ),
      value: dataSingle.id,
      id: dataSingle.id,
    };
  });

  const handleChange = (selectedColor) => {
    const selectedColorId = selectedColor.map((item) => {
      const foundColor = modData.find((modDataItem) => modDataItem.id === item);

      return foundColor?.id;
    });

    colorsHandler(selectedColorId);
  };

  return (
    <Select
      mode='multiple'
      tagRender={tagRender}
      style={{
        width: "100%",
      }}
      maxTagCount={0}
      options={modData}
      defaultValue={selectedColors}
      maxTagPlaceholder={`${selectedColors?.length} items Selected`}
      placeholder='Nothing Selected'
      onChange={handleChange}
    />
  );
};
export default ColorDropdown;
