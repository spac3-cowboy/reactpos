import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";

export const SupplierDetail = ({ supplier }) => {
  return (
    <div className="d-flex justify-content-start">
      <Avatar
        className="me-2"
        shape="square"
        size={"small"}
        style={{
          backgroundColor: "#87d068",
        }}
        icon={<UserOutlined />}
      />
      <div>
        <Tag>{supplier.name}</Tag>
        <Tag>{supplier.phone}</Tag>
        <Tag>{supplier.address}</Tag>
        <Tag>
          Due Amount : <strong>{supplier.dueAmount}</strong>
        </Tag>
      </div>
    </div>
  );
};
