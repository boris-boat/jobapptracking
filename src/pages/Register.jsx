import React, { useEffect, useState } from "react";
import "./Register.styles.css";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/userSlices";
import { Link, useNavigate } from "react-router-dom";
import LoginSvg from "../assets/undraw_interview_re_e5jn.svg";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    password: "",
  });
  const registerUser = () => {
    if (!credentials.username || !credentials.password || !credentials.name) {
      toast.error("Please fill in all fields !");
      return;
    } else {
      dispatch(register(credentials))
        .then((res) => {
          if (res.payload.error) toast.error("Username allready exists");
          else {
            toast.success("User created! Please login.");
            navigate("/");
          }
        })
        .catch((res) => console.log(res));
    }
  };
  const passwordBorder = () => {
    let length = credentials.password.length;
    if (length >= 1 && length <= 5) return "red";
    if (length > 5) return "green";
    else return "";
  };
  return (
    <Container
      fluid
      className="login-wrapper d-flex justify-content-center align-items-center"
    >
      <Row className="w-100 w-sm-75 d-flex justify-content-center align-items-center flex-column flex-lg-row">
        <Col className="animate__animated animate__fadeIn">
          <img src={LoginSvg} alt="" className="login-img" />
        </Col>
        <Col className="d-flex justify-content-center align-items-center flex-column ">
          <Row>
            <h1 className="mb-lg-5  mb-2 mt-2 login-text text-center">
              JOB APPLICATION TRACKER
            </h1>
            <h4 className="mb-lg-5 mb-3 text-center">Create an account !</h4>
          </Row>
          <Row className="w-100 d-flex justify-content-center align-items-center flex-column">
            <Col lg={8} sm={12}>
              <Form
                className=" register-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  registerUser();
                }}
              >
                {" "}
                <Form.Group className="mb-3" controlId="formBasicFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    name="name"
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className={passwordBorder()}
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Row className="w-100 m-0">
                  <Col sm={4} className="mt-2 mt-lg-0 p-0 login-button">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={credentials.password.length <= 5}
                    >
                      Register
                    </Button>
                  </Col>
                  <Col className="text-center mt-3 mt-lg-0 d-flex justify-content-center align-items-center">
                    <Link to="/login">Back to login?</Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
