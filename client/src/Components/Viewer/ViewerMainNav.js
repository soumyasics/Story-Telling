import React,{useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../Assets/logo.png";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewerMainNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("reader");
    localStorage.removeItem("token");
    navigate("/login");
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpGrade = () => {
    axiosInstance
      .post("/upgradeToWriter/" + localStorage.getItem("reader"))
      .then((result) => {
        console.log(result, "Upgrade result");
        alert("Please Login Again For Upgrade To Writer")
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        console.error("Upgrade error:", error);
      });
  };

  const navigateTonewchallenges=()=>{
    navigate("/readerviewnewchallenges")
  }
  const navigateTomychallenge=()=>{
    navigate("/readerviewparticipatedchallenges")
  }

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
                    onClick={handleShow}
                    className="ms-3 text-light text-decoration-none"
                  >
                    Upgrade to writer
                  </div>
                </Nav>
                <Nav>
                  <Link to="/reader-view-stories" className="text-decoration-none ms-3 text-light">Stories</Link>
                </Nav>
                <Nav>
                <div class="ms-3 dropdown">
                  <button class="dropbtn">Challenges</button>
                  <div class="dropdown-content">
                    <Navbar.Text onClick={navigateTonewchallenges} ><Link>New Challenges</Link></Navbar.Text>
                    <Navbar.Text onClick={navigateTomychallenge} ><Link>My Challenges</Link></Navbar.Text>
                  </div>
                </div>
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
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Are You Confirm For UpGrade To Writer?</Modal.Title>
        </Modal.Header>
        
        <Modal.Footer>
        <Button variant="primary " onClick={handleUpGrade}>
        Confirm to UpGrade
        </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
    </div>
  );
}

export default ViewerMainNav;
