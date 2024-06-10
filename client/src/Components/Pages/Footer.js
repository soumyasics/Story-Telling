import React from "react";
import "./footer.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import footerimg from "../../Assets/footerimg.png"

function Footer() {
  return (
  <div className="foortersection">
    <div className="container"><Row>
        <Col><div className="text-center"><img src={footerimg}></img></div></Col>
        <Col><div className="mt-5 pt-5">MARKETPLACE
          <div className="mt-4">
            <div>Authors</div>
            <div>Become a Freelancer</div>
            <div>Hire a Freelance</div>
          </div>
          </div></Col>
        <Col><div>LEARN</div></Col>
        <Col><div>COMPANY</div></Col>
        <Col><div>RESOURCES</div></Col>
        <Col>3 of 3</Col>
      </Row></div>
  </div>
  );
}

export default Footer;
