import React, { useEffect, useState } from "react";
import "./Navbar.styles.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { removeLocalStorage } from "../../utils/localStorage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/userSlices";
import { Col, Row, Offcanvas } from "react-bootstrap";
import { HiLogout } from "react-icons/hi";
const NavBar = () => {
  const { pathName } = useLocation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    removeLocalStorage();
    dispatch(logout());
    navigate("/");
  };
  useEffect(() => {
    setShow(false);
  }, [location.href]);

  return (
    <Navbar
      bg="light"
      style={{ height: "15vh" }}
      className="animate__animated animate__fadeInDown"
    >
      <Container
        fluid
        className="d-flex justify-content-center align-items-center w-100 "
      >
        <Row className="d-flex justify-content-center align-items-center w-100">
          <Col lg={4}>
            <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              <h1 className="navbar-text ms-lg-5 user-select-none">
                Job Application's tracker
              </h1>
            </Link>
          </Col>
          <Col className="text-center navbar-text">
            <Row className="flex-lg-column flex-row justify-content-around">
              <Col className="menu-button" sm={2}>
                {" "}
                <h3 onClick={() => setShow(true)} className="user-select-none">
                  Menu
                </h3>
              </Col>
              <Col
                lg={2}
                className="align-self-lg-end align-self-center logout-button"
                style={{ cursor: "pointer" }}
              >
                <h3 onClick={logoutUser} className="user-select-none">
                  Logout <HiLogout />
                </h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container
            fluid
            className="h-100 d-flex justify-content-center align-items-center flex-column gap-3"
          >
            <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              <h3 className="sidebar-text" onClick={() => setShow(false)}>
                Stats
              </h3>
            </Link>
            <Link
              to={"alljobs"}
              style={{ textDecoration: "none" }}
              onClick={() => setShow(false)}
            >
              {" "}
              <h3 className="sidebar-text">All Applications</h3>
            </Link>
            <Link
              to={"addjob"}
              style={{ textDecoration: "none" }}
              onClick={() => setShow(false)}
            >
              {" "}
              <h3 className="sidebar-text">Add new</h3>
            </Link>
            <Link
              to={"sites"}
              style={{ textDecoration: "none" }}
              onClick={() => setShow(false)}
            >
              {" "}
              <h3 className="sidebar-text">Sites</h3>
            </Link>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};

export default NavBar;
