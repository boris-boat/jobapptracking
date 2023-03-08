import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addSite, deleteSite } from "../../slices/userSlices";
import "./Sites.styles.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Sites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [site, setSite] = useState({ title: "", link: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (site.title && site.link) {
      dispatch(addSite({ user: user, data: site }));
      setSite({ title: "", link: "" });
    } else {
      toast.error("All fields must be present !");
    }
  };
  return (
    <Container className="d-flex align-items-center flex-column h-100 animate__animated animate__fadeIn">
      <Row className="w-100">
        <h2 className="text-center w-100 mt-lg-5 mt-3 mb-3">Add site</h2>
        <h5 className="text-center mt-0">
          Here you can save websites with your favourite searches !
        </h5>
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center justify-content-center mt-lg-5 w-100 forma gap-4"
        >
          {" "}
          <input
            placeholder="Title"
            className="form-control title-input mt-3 mt-lg-0"
            name="title"
            type="text"
            value={site.title}
            onChange={(e) =>
              setSite({ ...site, [e.target.name]: e.target.value })
            }
          />
          <input
            className="form-control w-lg-25"
            placeholder="Link"
            name="link"
            value={site.link}
            type="text"
            onChange={(e) =>
              setSite({ ...site, [e.target.name]: e.target.value })
            }
          />
          <button className="btn btn-primary mt-3 mt-lg-0">Add</button>
        </form>
      </Row>
      <Row className="d-flex justify-content-center w-100 h-75 mt-5 overflow-auto">
        <Col className="d-flex justify-content-start align-items-center  w-100 flex-column gap-3">
          {user.sites?.map((site, index) => (
            <>
              <div key={index} className="single-site p-2 ">
                <p className="m-2 p-0 title">{site.title}</p>
                <Link
                  to={`${site.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    dispatch(deleteSite({ userId: user._id, siteId: site._id }))
                  }
                >
                  Delete
                </button>
              </div>
            </>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Sites;
