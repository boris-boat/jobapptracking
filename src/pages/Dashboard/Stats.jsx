import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter } from "../../slices/userSlices";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const pending = user.jobs.filter((job) => job.status === "Pending");
  const declined = user.jobs.filter((job) => job.status === "Declined");
  const [quote, setQuote] = useState("");
  const handleClick = (filter) => {
    dispatch(setStatusFilter(filter));
    navigate("alljobs");
  };
  useEffect(() => {
    // const getQuote = async () => {
    //   const res = await fetch("http://localhost:3001/jat/getquote")
    //     .then((res) => res.json())
    //     .then((quote) => setQuote(quote[0]));
    // };
    // getQuote();
  }, []);
  return (
    <Container
      className="h-100 d-flex justify-content-center align-items-center flex-column pb-5 "
      fluid
    >
      <div className="greetings d-flex justify-content-around align-items-center flex-column">
        {/* <Row>
          <div className="quote mb-5">
            <h5 className="quote-text text-center">"{quote.q}"</h5>

            <h6 className="text-center">{quote.a}</h6>
          </div>
        </Row> */}
        <Row className="text-center mb-5">
          <h1>Welcome </h1>
          <h1>{user?.name}</h1>
        </Row>
      </div>
      <Row className="w-100 text-center flex-column flex-lg-col align-items-center d-flex g-4 animate__animated animate__fadeIn">
        <Col lg={4}>
          <Card>
            <Card.Body
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
