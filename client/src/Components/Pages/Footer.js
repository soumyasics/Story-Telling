import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import img from "../../Assets/Logo (4).png";
import img2 from "../../Assets/image 2 (1).png";

function Footer() {
  return (
    <div className="">
      {" "}
      <img src={img2} alt="img" className="footerimg"></img>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img src={img} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text
              className="me-5 fs-5"
              style={{ color: "rgba(87, 205, 255, 1)" }}
            >
              Home
            </Navbar.Text>
            <Navbar.Text
              className="me-5 fs-5"
              style={{ color: "rgba(87, 205, 255, 1)" }}
            >
              About
            </Navbar.Text>
            <Navbar.Text
              className="me-5 fs-5"
              style={{ color: "rgba(87, 205, 255, 1)" }}
            >
              Login
            </Navbar.Text>
            <Navbar.Text
              className="me-5 fs-5"
              style={{ color: "rgba(87, 205, 255, 1)" }}
            >
              Blog
            </Navbar.Text>
            <Navbar.Text
              className="me-5 fs-5"
              style={{ color: "rgba(87, 205, 255, 1)" }}
            >
              Sucess Stories
            </Navbar.Text>
            <Navbar.Text
              className="me-5 fs-5"
              style={{ color: "rgba(87, 205, 255, 1)" }}
            >
              FAQs
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
