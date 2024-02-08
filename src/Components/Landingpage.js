import React from "react";
import "./landingpage.css";
import img from "../images/Logo (4).png";
import { Row, Col } from "react-bootstrap";

function Landingpage() {
  return (
    <div className="headermain">
      <Row className="align-items-center">
        <Col xs={9} className="text-center">
          <img src={img} alt="Logo" />
          <p className="headermainpara">Collaborative Storytelling Platform</p>
        </Col>
        <Col xs={2} className="text-center">
          <div className="circular-img">
            <img
              src="https://i.pinimg.com/736x/87/e6/63/87e6638bb1a578ba25cff0e953ddfb30--french-lavender-lavender-color.jpg"
              alt="Profile"
              className="profileimg"
            />
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Logout</a></li>
              <li><a className="dropdown-item" href="#">Stories</a></li>

            </ul>
          </div>
        </Col>
      </Row>

      <div className="landingpage text-center pt-5">
      <p className="fs-3 text-white mt-5">Weave Together Worlds</p>
      <p className="fs-4 text-white">Where stories come alive, one line at a time.</p>
      </div>
    </div>
  );
}

export default Landingpage;
