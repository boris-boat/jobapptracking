import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./AddJob.styles.css";
import { addJob } from "../../slices/userSlices";
const AddJob = () => {
  const initalFormData = {
    company: "",
    position: "",
    dateApplied: "",
    expDate: "",
    status: "Pending",
    notes: "",
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState(initalFormData);
  const addJob2 = () => {
    dispatch(addJob({ _id: user._id, data: formData }));
    setFormData(initalFormData);
    toast.success("Job added !", {
      position: "bottom-center",
      autoClose: 1000,
    });
  };
  const checkForm = () => {
    let formValid = true;
    let fields = ["company", "position", "dateApplied"];
    for (let field of fields) {
      if (formData[field].length === 0) {
        formValid = false;
      }
    }
    return formValid;
  };
  return (
    <div className="add-job-wrapper animate__animated animate__fadeIn">
      <div className="all-jobs-card">
        <div className="all-jobs-card-header">
          <div className="text-header">Add job</div>
        </div>
        <div className="all-jobs-card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-group">
              <label htmlFor="company">Company :</label>
              <input
                className="form-control"
                name="company"
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position :</label>
              <input
                className="form-control"
                name="position"
                id="position"
                type="text"
                value={formData.position}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateApplied">Date applied :</label>
              <input
                className="form-control"
                name="dateApplied"
                id="dateApplied"
                type="date"
                value={formData.dateApplied}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expDate">Expiration date :</label>
              <input
                className="form-control"
                name="expDate"
                id="expDate"
                type="date"
                value={formData.expDate}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="link">Link :</label>
              <input
                placeholder="If entered ,must start with http or https"
                className="form-control"
                name="link"
                id="link"
                type="text"
                value={formData.link}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes :</label>
              <input
                className="form-control"
                name="notes"
                id="notes"
                type="text"
                value={formData.notes}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="button-wrapper">
              <input
                type="submit"
                className="submit-btn"
                value="Add job"
                onClick={(e) => {
                  e.preventDefault();
                  if (checkForm()) {
                    addJob2();
                  } else {
                    toast.error("First 3 fields must not be empty", {
                      position: "bottom-center",
                      autoClose: 2000,
                    });
                  }
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
