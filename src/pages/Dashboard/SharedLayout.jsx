import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import "./SharedLayout.styles.css";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const SharedLayout = () => {
  return (
    <div className="dashboard-wrapper ">
      <Container fluid>
        <Row>
          <NavBar />
        </Row>
        <Row>
          <Col lg={2} className="p-0">
            <SideBar />
          </Col>
          <Col lg={10}>
            <div className="data-wrapper ">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SharedLayout;
