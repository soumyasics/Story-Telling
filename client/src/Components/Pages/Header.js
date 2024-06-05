import React from "react";
import "./header.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img1 from "../../assets/Logo (4).png";
// import img2 from "../images/Rectangle 1.png";
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
  return (
    <div className="header-container">
      <Row>
        <Col>1</Col>
        <Col>2</Col>
        <Col>
          <img src={img1} alt=""></img>
        </Col>
        <Col>4</Col>
        <Col>
          <div className="circular-img">
            <img className="profileimg" src="https://tse1.mm.bing.net/th?id=OIP.YAXlTjvtEKchdMVc5laZhwHaE8&pid=Api&P=0&h=180" alt=""></img>
          </div>
          <div className="dropdown-container">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor:"rgba(1, 30, 73, 0.97)",border:"none"}}>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Stories</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
