import React, { useEffect, useState } from "react";
import SingleJob from "../../shared/SingleJob";
import "./AllJobs.styles.css";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter } from "../../slices/userSlices";

const AllJobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.user.jobs);
  const statusFilter = useSelector((state) => state.statusFilter);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("company");

  const [sort, setSort] = useState("latest");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let tmpArr = [...jobs];
    if (statusFilter === "") setDisplayJobs(tmpArr);
    else {
      tmpArr = tmpArr.filter((job) => job.status === statusFilter);
      setDisplayJobs(tmpArr);
    }
    if (sort == "latest") {
      setDisplayJobs(
        tmpArr.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
      );
    }
    if (sort == "oldest") {
      setDisplayJobs(
        tmpArr.sort((a, b) => new Date(a.dateApplied) - new Date(b.dateApplied))
      );
    }
    if (filter !== "") {
      setDisplayJobs(
        tmpArr.filter((job) => {
          if (job[searchCriteria].toLowerCase().includes(filter.toLowerCase()))
            return job;
        })
      );
    }
  }, [filter, statusFilter, jobs, sort]);

  return (
    <Container
      fluid
      className="d-flex justify-content-start align-items-center h-100 overflow-auto flex-column mb-3"
    >
      <Row className="d-flex justify-content-center align-items-center filter-wrapper mt-lg-5 mt-3 mb-lg-3">
        <h4 className="text-center mb-3">Filter</h4>
        <Form.Select
          value={statusFilter}
          name=""
          id=""
          onChange={(e) => dispatch(setStatusFilter(e.target.value))}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </Form.Select>
        <Form.Select
          name=""
          id=""
          onChange={(e) => setSort(e.target.value)}
          className="mt-3"
        >
          <option value="latest">Newest application's first</option>
          <option value="oldest">Oldest application's first</option>
        </Form.Select>
        <Form className="p-0 mt-3">
          <Row className="w-100 m-0 p-0 ">
            <Col className="p-0 me-4 mb-1 mb-lg-0" lg={3}>
              <Form.Select
                name=""
                id=""
                onChange={(e) => setSearchCriteria(e.target.value)}
              >
                <option value="company">Company</option>
                <option value="position">Position</option>
              </Form.Select>
            </Col>
            <Col className="p-0">
              <Form.Control
                className="m-0"
                type="text"
                placeholder="Search"
                onChange={(e) => setFilter(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="d-flex justify-content-center align-items-center w-100 all-jobs-wrapper mt-3 mt-lg-0 animate__animated animate__fadeIn">
        {displayJobs.length == 0 && (
          <h1 className="text-center no-apps-text mt-5">
            No applications here,time to apply !
          </h1>
        )}
        {displayJobs?.map((job, index) => (
          <Col lg={4} md={6} key={index}>
            <SingleJob job={job}></SingleJob>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllJobs;
