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
      className="h-100 d-flex justify-content-center align-items-center flex-column "
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
      <Row className="w-lg-50 w-100 text-center mt-5 flex-column flex-lg-row d-flex g-4 animate__animated animate__fadeIn">
        <Col>
          <Card>
            <Card.Body
              className="stats-categories"
              onClick={() => {
                dispatch(setStatusFilter(""));
                navigate("alljobs");
              }}
            >
              <Card.Text>Total jobs : {user?.jobs.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>{" "}
        <Col>
          <Card>
            <Card.Body
              onClick={() => {
                dispatch(setStatusFilter("Pending"));
                navigate("alljobs");
              }}
            >
              <Card.Text>Pending jobs : {pending?.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>{" "}
        <Col>
          <Card>
            <Card.Body
              onClick={() => {
                dispatch(setStatusFilter("Declined"));
                navigate("alljobs");
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
