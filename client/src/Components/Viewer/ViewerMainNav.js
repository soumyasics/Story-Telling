import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../Assets/logo.png";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { Link, useNavigate } from "react-router-dom";

function ViewerMainNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("reader");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpGrade = () => {
    axiosInstance
      .post("/upgradeToWriter/" + localStorage.getItem("reader"))
      .then((result) => {
        console.log(result, "Upgrade result");
        alert("Please Login Again For Upgrade To Writer")
        setTimeout(() => {
          navigate("/login");
        }, 4500);
      })
      .catch((error) => {
        console.error("Upgrade error:", error);
      });
  };

  return (
    <div>
      {" "}
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
                <Nav>
                  <Link
                    className="raeder-profile-link text-light text-decoration-none"
                    to="/readerhome"
                  >
                    Home
                  </Link>
                </Nav>
                <Nav>
                  <Link
                    className="raeder-profile-link ms-3"
                    to="/reader-profile"
                  >
                    Profile
                  </Link>
                </Nav>
                <Nav>
                  <div
                    onClick={handleUpGrade}
                    className="ms-3 text-light text-decoration-none"
                  >
                    Upgrade to writer
                  </div>
                </Nav>
                <Nav>
                  <Link to="/reader-view-stories" className="text-decoration-none ms-3 text-light">Stories</Link>
                </Nav>
                <Nav>
                <Link to="/reader-view-challenges" className="text-decoration-none ms-3 text-light">Challenges</Link>
                </Nav>
                <Nav>
                  <div onClick={handleLogout} className="ms-3">
                    Logout
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
}

export default ViewerMainNav;
