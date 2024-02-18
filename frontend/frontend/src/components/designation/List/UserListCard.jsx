import { Card, Col, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const UserListCard = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "idNo",
      key: "idNo",
      render: (idNo, { id }) => (
        <Link to={`/admin/hr/staffs/${id}`}>{idNo}</Link>
      ),
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => role.name,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "salary",
      dataIndex: "salary",
      key: "salary",
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24}>
        <Card
          className='header-solid h-full'
          bordered={false}
          title={
            <h5 className='font-semibold m-0 text-center text-xl'>
              Staffs Information
            </h5>
          }
          bodyStyle={{ padding: "0" }}
        >
          <div className='col-info'>
            <Table
              scroll={{ x: true }}
              loading={!list}
              columns={columns}
              dataSource={list ? addKeys(list) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UserListCard;
