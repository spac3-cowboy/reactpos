import { Col, Row } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";
import checkTokenExp from "../../../utils/checkTokenExp";

import QuickLink from "../../layouts/QuickLink";
import Content from "../RecentContent/Content";
import DemoLine from "./Demoline";

const Dashboard = () => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  //Looging Out if token is expried
  const accessToken = localStorage.getItem("access-token");
  checkTokenExp(accessToken);
  return (
    <>
      <div>
        <div className='mb-5'>
          <QuickLink />
          <Row>
            <Col span={24}>
              <DemoLine />
            </Col>
          </Row>
        </div>
        <div className='mb-5'>
          <Content />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
