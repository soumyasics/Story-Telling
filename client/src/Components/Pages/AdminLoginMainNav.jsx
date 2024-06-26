import React from "react";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

function AdminLoginMainNav() {
  const navigate = useNavigate();
  const AdminLogout = () => {
    alert("Please Login Again")
    localStorage.removeItem("admin");
    navigate("/AdminLogin");
  };

  return (
    <div>
      {" "}
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
            <Nav>
              <div className="btn btn-light px-3" onClick={AdminLogout}>
                {" "}
                Log out
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminLoginMainNav;
