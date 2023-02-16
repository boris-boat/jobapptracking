import React from "react";
import { Link } from "react-router-dom";
import PageNotFoundLogo from "../assets/undraw_page_not_found_re_e9o6.svg";
import "./PageNotFound.styles.css";
const PageNotFound = () => {
  return (
    <div className="wrapper">
      <div className="center-div">
        <img src={PageNotFoundLogo} alt="" />
        <Link to={"/"}>
          {" "}
          <h1 className="mt-5">Back</h1>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
