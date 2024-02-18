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
      }}
    >
      {label}
    </Tag>
  );
};

const ColVisibilityDropdown = ({ options, columns, columnsToShowHandler }) => {
  const modOptions = options.map((option) => {
    return {
      id: option.id,
      value: option.title,
    };
  });

  const defaultValue = modOptions.map((option) => {
    return option.value;
  });

  const handleChange = (selectedCols) => {
    const columnsToShow = columns.filter((column) => {
      const colFound = selectedCols.find(
        (selectedCol) => column.title === selectedCol
      );
      return colFound;
    });

    columnsToShowHandler(columnsToShow);
  };

  return (
    <Select
      mode='multiple'
      tagRender={tagRender}
      defaultValue={defaultValue}
      style={{
        width: "180px",
      }}
      maxTagCount={0}
      options={modOptions}
      maxTagPlaceholder='Column Selected'
      placeholder='Column Visibility'
      onChange={handleChange}
    />
  );
};
export default ColVisibilityDropdown;
