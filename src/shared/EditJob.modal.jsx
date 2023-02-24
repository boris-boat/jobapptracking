import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./EditJobModal.styles.css";
import { useDispatch } from "react-redux";
import { editJob } from "../slices/userSlices";
import { useState, useEffect } from "react";

export const EditJobModal = (props) => {
  let dispatch = useDispatch();
  const [editedJob, setEditedJob] = useState(props.job);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            defaultValue={props.job.company}
            name="company"
            onChange={(e) => {
              setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
            }}
          />
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            defaultValue={props.job.position}
            name="position"
            onChange={(e) => {
              setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
            }}
          />{" "}
          <Form.Label>Date Applied</Form.Label>
          <Form.Control
            type="date"
            defaultValue={props.job.dateApplied}
            name="dateApplied"
            onChange={(e) => {
              setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
            }}
          />{" "}
          <Form.Label>Application expiration</Form.Label>
          <Form.Control
            type="date"
            defaultValue={props.job.expDate}
            name="expDate"
            onChange={(e) => {
              setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
            }}
          />{" "}
          <Form.Label>Status</Form.Label>
          <Form.Control
            defaultValue={props.job.status}
            name="status"
            as="select"
            onChange={(e) => {
              setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
            }}
          >
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
          </Form.Control>{" "}
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            name="link"
            defaultValue={props.job.link}
            onChange={(e) => {
              setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
            }}
          ></Form.Control>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="text"
            defaultValue={props.job.notes}
            name="notes"
            onChange={(e) => {
              setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
            }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch(
              editJob({
                data: {
                  jobId: props.job._id,
                  new: editedJob,
                  userId: props.userid,
                },
              })
            );
            setEditedJob({});
            props.onHide();
          }}
        >
          Save
        </Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};
