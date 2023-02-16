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
          if (job.company.toLowerCase().includes(filter.toLowerCase()))
            return job;
        })
      );
    }
  }, [filter, statusFilter, jobs, sort]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center h-100 overflow-auto flex-column "
    >
      <Row className="d-flex justify-content-center align-items-center filter-wrapper mb-3 mt-3">
        <h4 className="text-center">Filter</h4>
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
          <Form.Control
            type="text"
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
          />
        </Form>
      </Row>
      <Row className="d-flex justify-content-center align-items-center h-75 w-100  all-jobs-wrapper ">
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
