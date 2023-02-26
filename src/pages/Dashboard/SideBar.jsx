import React from "react";
import "./SideBar.styles.css";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="side-bar-wrapper animate__animated animate__fadeInLeft">
      <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
        <h3 className="sidebar-text">Stats</h3>
      </Link>
      <Link to={"alljobs"} style={{ textDecoration: "none" }}>
        {" "}
        <h3 className="sidebar-text">All Applications</h3>
      </Link>
      <Link to={"addjob"} style={{ textDecoration: "none" }}>
        {" "}
        <h3 className="sidebar-text">Add new</h3>
      </Link>
      {/* <Link to={"profile"}>Profile</Link> */}
    </div>
  );
};

export default SideBar;
