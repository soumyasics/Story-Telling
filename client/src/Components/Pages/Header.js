import React from "react";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../Assets/logo.png";
import { useNavigate ,Link } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const Login = () => {
    navigate("/login");
  };
  const Contact = () => {
    navigate("/contact");
  };
  const stories = () => {
    navigate("/commonviewstories");
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="mainnav">
        <Container>
          <Navbar.Brand href="">
          <Link to="/"> <img
          alt=""
          src={logo}
          width="50"
          height="50"
          className="d-inline-block align-top"
        />{" "}
        <label className="text-light mt-3" fon>
          Collaborative Story Telling
        </label></Link>
           
          </Navbar.Brand>
          <div className="bg-light text-light">
            {" "}
            <Navbar.Toggle aria-controls="responsive-navbar-nav text-light  bg-light" />
          </div>
          <Navbar.Collapse id="responsive-navbar-nav text-light  bg-light">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/story_telling/aboutus" className="text-light me-5">
                About Us
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes" className="text-light me-5" onClick={stories}>
                Stories
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes" className="text-light me-5" onClick={Contact}>
                Contact Us
              </Nav.Link>

              <Nav.Link className="text-light me-5" onClick={Login}>
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
