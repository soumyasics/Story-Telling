import React from "react";
import './Writer.css'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function WritterMainNav() {
  const Navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem("writer")
    localStorage.removeItem("token")

    Navigate("/login")
  }
  return (
    <div>
      {" "}
      <div>
        <Navbar collapseOnSelect expand="lg" className="mainnav">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
              />{" "}
              <label className="text-light mt-3" fon>
                Collaborative Story Telling
              </label>
            </Navbar.Brand>
            <div className="bg-light text-light">
              {" "}
              <Navbar.Toggle aria-controls="responsive-navbar-nav text-light  bg-light" />
            </div>
            <Navbar.Collapse id="responsive-navbar-nav text-light  bg-light">
              <Nav className="me-auto"></Nav>
              <Nav><Link to='/writer-profile' className="writer-mainnav-link">Profile</Link></Nav>
              <Nav><div className="ms-3">Stories</div></Nav>
              <Nav><div className="ms-3">Challenges</div></Nav>
              <Nav><div className="ms-3">Contact Us</div></Nav>
              <Nav><div onClick={handleLogout} className="ms-3">Logout</div></Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default WritterMainNav;
