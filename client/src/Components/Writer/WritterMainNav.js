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

  const navigateToAddStory=()=>{
    Navigate("/writer-add-customstory")
  }
  const navigateToViewCustmStory=()=>{
    Navigate("/writer-view-customstory")
  }

  const navigateToViewnewchallenge=()=>{
    Navigate("/writer-newstory-challenge")
  }

  const navigateToAddChallenges=()=>{
    Navigate("/writer-add-challenges")
  }
 
  const navigateTopublishChallenges=()=>{
    Navigate("/writer-published-story-challenge")
  }
  const navigatetomychallenges=()=>{
    Navigate("/writer-view-challenge")
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
              Collaborative Story Telling-StoryFusion
              </label>
            </Navbar.Brand>
            <div className="bg-light text-light">
              {" "}
              <Navbar.Toggle aria-controls="responsive-navbar-nav text-light  bg-light" />
            </div>
            <Navbar.Collapse id="responsive-navbar-nav text-light  bg-light">
              <Nav className="me-auto"></Nav>
              <Nav><Link className="raeder-profile-link" to='/writerhome'>Home</Link></Nav>
              <Nav><Link to='/writer-profile' className="writer-mainnav-link ms-4">Profile</Link></Nav>
              <Nav>
              <div class="ms-3 dropdown">
                  <button class="dropbtn">Customised Story</button>
                  <div class="dropdown-content">
                    <Navbar.Text onClick={navigateToAddStory} ><Link>Add Story</Link></Navbar.Text>
                    <Navbar.Text onClick={navigateToViewCustmStory} ><Link>Your Drafts</Link></Navbar.Text>
                  </div>
                </div>
              </Nav>
              <Nav><Link to="/writer-view-stories" className="writer-mainnav-link ms-4">Stories</Link></Nav>
              <Nav><div class="ms-3 dropdown">
                  <button class="dropbtn">Challenges</button>
                  <div class="dropdown-content">
                    <Navbar.Text onClick={navigateToAddChallenges} ><Link>Add Challenges</Link></Navbar.Text>
                    <Navbar.Text onClick={navigateToViewnewchallenge} ><Link>New Challenges</Link></Navbar.Text>
                    <Navbar.Text onClick={navigatetomychallenges} ><Link>My Challenges</Link></Navbar.Text>
                    <Navbar.Text onClick={navigateTopublishChallenges} ><Link>PublishedChallenges</Link></Navbar.Text>
                  </div>
                </div></Nav>
              <Nav><div onClick={handleLogout} className="ms-3">Logout</div></Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default WritterMainNav;
