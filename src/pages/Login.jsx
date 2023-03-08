import React, { useEffect, useState } from "react";
import "./Login.styles.css";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  loginWithToken,
  tokenLogingInToggle,
} from "../slices/userSlices";
import { Link, useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../utils/localStorage";
import LoginSvg from "../assets/undraw_interview_re_e5jn.svg";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";
const Login = () => {
  const { loggedIn, isLoading, tokenLogingIn } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (loggedIn) navigate("/dashboard");
  }, [loggedIn]);
  useEffect(() => {
    let token = getTokenFromLocalStorage();
    if (token) {
      dispatch(loginWithToken(token));
    }
  }, []);

  return (
    <Container
      fluid
      className="login-wrapper d-flex justify-content-center align-items-center"
    >
      {" "}
      {tokenLogingIn && (
        <div className="overlay">
          <SpinnerCircular
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </div>
      )}
      <Row className="d-flex justify-content-center align-items-center flex-column flex-lg-row h-100">
        <Col className="animate__animated animate__fadeIn">
          <img src={LoginSvg} alt="" className="login-img" />
        </Col>
        <Col className="d-flex justify-content-center align-items-center flex-column text-center p-lg-5 me-3 right-side mt-4">
          <Row>
            <h1 className="login-text m-0 ">JOB APPLICATION TRACKER</h1>
            <h3 className="login-text">
              the ultimate solution for managing your job applications!
            </h3>
          </Row>
          <Row className="w-100 d-flex justify-content-center align-items-center flex-column mt-lg-3">
            <Col lg={8} sm={12}>
              <Form
                className="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!credentials.username || !credentials.password) {
                    toast.error("Please fill in all fields !");
                    return;
                  } else {
                    dispatch(login(credentials)).then((res) => {
                      if (res.payload.error) toast.error(res.payload.error);
                    });
                  }
                }}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                      disabled={isLoading}
                    >
                      Login
                    </Button>
                  </Col>
                  <Col className="text-center mt-3 mt-lg-0 d-flex justify-content-center align-items-center">
                    <Link to="/register">Create an account?</Link>
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

export default Login;
