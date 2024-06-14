import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Landingsection3img1 from "../../Assets/Landingsection3img1.png";
import Landingsection3img2 from "../../Assets/Landingsection3img2.png";
import Landingsection3img3 from "../../Assets/Landingsection3img3.png";

function Landingsection3() {
  return (
    <div className="">
      <div className="Landingsection3">
        {" "}
        <div className="container">
          <Row className="md-12">
            <Col className="text-center">
              <h4>Writers</h4>
              <p>Simply, beautifully</p>
              <img src={Landingsection3img1}></img>
            </Col>
            <Col className="text-center">
              <h4>Readers</h4>
              <p>with a professionally</p> <img src={Landingsection3img2}></img>
            </Col>
            <Col className="text-center">
              <h4>Challengers</h4>
              <p>a interesting games</p> <img src={Landingsection3img3}></img>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Landingsection3;
