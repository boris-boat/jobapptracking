import React from "react";
import "./SideBar.styles.css";
import { Link } from "react-router-dom";
import { setStatusFilter } from "../../slices/userSlices";
import { useDispatch } from "react-redux";
const SideBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="side-bar-wrapper animate__animated animate__fadeInLeft">
      <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
        <h3 className="sidebar-text">Stats</h3>
      </Link>
      <Link to={"alljobs"} style={{ textDecoration: "none" }}>
        {" "}
        <h3
          className="sidebar-text"
          onClick={() => dispatch(setStatusFilter(""))}
        >
          All Applications
        </h3>
      </Link>
      <Link to={"addjob"} style={{ textDecoration: "none" }}>
        {" "}
        <h3 className="sidebar-text">Add new</h3>
      </Link>
      <Link to={"sites"} style={{ textDecoration: "none" }}>
        {" "}
        <h3 className="sidebar-text">Sites</h3>
      </Link>

      {/* <Link to={"profile"}>Profile</Link> */}
    </div>
  );
};

export default SideBar;
