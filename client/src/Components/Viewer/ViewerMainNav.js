import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../Assets/logo.png";

import { useNavigate } from "react-router-dom";
function ViewerMainNav() {
    const Navigate=useNavigate()

    const handleLogout=()=>{
      localStorage.removeItem("reader")
      localStorage.removeItem("token")
      Navigate("/login")
    }
  return (
    <div>    <div>
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
            <Nav><div onClick={handleLogout}>Logout</div></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  </div>
</div>
  )
}

export default ViewerMainNav