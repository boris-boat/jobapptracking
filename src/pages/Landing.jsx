import React, { useEffect, useState } from "react";
import "./Landing.styles.css";
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
const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, isLoading, tokenLogingIn } = useSelector((state) => state);

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
            <h5 className="login-text mb-3 w-lg-75 w-100 m-auto desc-text">
              We understand how overwhelming it can be to keep track of all the
              job applications you've submitted, and that's why we've created a
              simple, user-friendly platform to help you stay on top of your
              game. With JOB APPLICATION TRACKER, you can easily keep track of
              every job application you've submitted, along with important
              details like application deadlines, interview dates, and follow-up
              actions. Our powerful tracking features help you stay organized
              and ensure that you never miss an opportunity.Whether you're
              looking for a job in tech, finance, or any other field, JOB
              APPLICATION TRACKER can help you stay focused and achieve your
              career goals. Our platform is secure and easy to use, with
              encryption and authentication measures in place to protect your
              sensitive data. You can access JOB APPLICATION TRACKER from
              anywhere, whether you're on your desktop or mobile device, and our
              responsive design ensures a seamless experience across all
              platforms.
            </h5>
          </Row>
          <Row className="w-100 d-flex justify-content-center align-items-center flex-column mt-lg-3">
            <Col lg={8} sm={12}>
              <Button
                className="my-3"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <h4 className="p-1 m-0">Get Started</h4>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
