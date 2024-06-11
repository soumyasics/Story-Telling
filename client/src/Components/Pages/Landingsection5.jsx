import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Landingsection5() {
  return (
    <div>
      <div className="Landingsection5">
        <Container>
          <Row>
            <Col></Col>
            <Col className="text-end text-light">
              <h2 >Interactive Story Creation</h2>
              <p >
                Users can collaboratively build stories by taking turns to add
                sentences, paragraphs, or chapters. Each contribution can be
                accompanied by captions that explain or enhance the textual
                content, ensuring clarity and engagement.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Landingsection5;
