import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { EditJobModal } from "./editJob.modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob } from "../slices/userSlices";
import { Link, useNavigate } from "react-router-dom";
const SingleJob = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title className="text-center">{job.company}</Card.Title>
        <Card.Subtitle className="mb-3 text-center">
          {job.position}
        </Card.Subtitle>
        <Card.Text>
          <h6>
            Date applied :{" "}
            {new Date(job.dateApplied).toLocaleDateString("sr-RS")}
          </h6>
          <h6>
            Application expiration :{" "}
            {job.expDate
              ? new Date(job.expDate).toLocaleDateString("sr-RS")
              : "n/a"}
          </h6>
          <h6>Status : {job.status}</h6>
          <h6>
            Link :{" "}
            {job.link ? (
              <a href={`${job.link}`} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            ) : (
              "n/a"
            )}
          </h6>
          <h6>Notes : {job.notes}</h6>
        </Card.Text>
        <div className="single-item-btn-wrapper d-flex justify-content-end">
          <Button
            variant="success"
            className="me-3"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (
                confirm("Are you sure you want to delete this application ? ")
              )
                dispatch(
                  deleteJob({ data: { jobId: job._id, userId: user._id } })
                );
            }}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
      <EditJobModal
        job={job}
        userid={user._id}
        show={showModal}
        onHide={() => setShowModal(false)}
      ></EditJobModal>
    </Card>
  );
};

export default SingleJob;
