import React from "react";
import "./footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import footerimg from "../../Assets/footerimg.png";
import facebook from "../../Assets/facebook.png";
import instagram from "../../Assets/instagram.png";
import twitter from "../../Assets/twitter.png";
import utube from "../../Assets/utube.png";
import star from "../../Assets/star.png";

function Footer() {
  return (
    <div className="foortersection">
      <div className="container">
        <Row>
          <Col>
            <div className="text-center">
              <img className="w-75 mt-3" src={footerimg}></img>
              <Row>
                <Col>
                  <img className="w-100" src={facebook}></img>
                </Col>
                <Col>
                  <img className="w-100" src={instagram}></img>
                </Col>
                <Col>
                  <img className="w-100" src={twitter}></img>
                </Col>
                <Col>
                  <img className="w-100" src={utube}></img>
                </Col>
                <Col>
                  <img className="w-100" src={star}></img>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="mt-5">
              STORY TELLING
              <div className="mt-4">
                <div>Authors</div>
                <div>Become a Story Writer</div>
                <div>Read Stories</div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="mt-5">LEARN</div>
            <div className="mt-4">
              <div>Learning</div>
              <div>Stroies</div>
              <div>Challenges</div>
            </div>
          </Col>
          <Col>
            <div className="mt-5">COMPANY</div>
            <div className="mt-4">
              <div>About</div>
                         <div>Stories</div>
            </div>
          </Col>
          <Col>
            <div className="mt-5 ">RESOURCES</div>
            <div className="mt-4">
       
                       <div>Literary Agents</div>
            
              <div>Short Story Ideas</div>
            </div>
          </Col>
          <Col>
            {" "}
            <div className="mt-5 pt-5">
              <div>Writing Contests</div>
              <div>Writing Exercises</div>
             
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
