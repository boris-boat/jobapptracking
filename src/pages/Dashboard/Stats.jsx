import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter } from "../../slices/userSlices";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";

import "./Stats.styles.css";
import { useGetQuote } from "../../utils/useGetQuote";
const Stats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const pending = user.jobs.filter((job) => job.status === "Pending");
  const declined = user.jobs.filter((job) => job.status === "Declined");
  const handleClick = (filter) => {
    dispatch(setStatusFilter(filter));
    navigate("alljobs");
  };
  const { quote } = useGetQuote();
  return (
    <Container
      className="h-100 w-100 d-flex justify-content-center align-items-center flex-column pb-5 overflow-hidden gap-5"
      fluid
    >
      <div className="greetings d-flex justify-content-around align-items-center flex-column w-75">
        <Row className="w-lg-100">
          <div className="quote mb-5 ">
            {quote && (
              <>
                <h5 className="quote-text text-center animate__animated animate__fadeIn">
                  {quote.text}
                </h5>
                <h6 className="text-center animate__animated animate__fadeIn">
                  {quote.author}
                </h6>
              </>
            )}
          </div>
        </Row>

        <Row className="text-center">
          <h1>Welcome </h1>
          <h1>{user?.name}</h1>
        </Row>
      </div>
      <Row className="w-100 text-center flex-column flex-lg-col align-items-center d-flex g-4 animate__animated animate__fadeInUp">
        <Col lg={4}>
          <Card>
            <Card.Body
              className="stats-item"
              onClick={() => {
                handleClick("");
              }}
            >
              <Card.Text>Total jobs : {user?.jobs.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>{" "}
        <Col lg={4}>
          <Card>
            <Card.Body
              className="stats-item"
              onClick={() => {
                handleClick("Pending");
              }}
            >
              <Card.Text>Pending jobs : {pending?.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>{" "}
        <Col lg={4}>
          <Card>
            <Card.Body
              className="stats-item"
              onClick={() => {
                handleClick("Declined");
              }}
            >
              <Card.Text>Jobs declined : {declined?.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
