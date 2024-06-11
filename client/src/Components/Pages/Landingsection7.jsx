import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Landingsection7() {
  return (
    <div>
      <div className="Landingsection7">
        <Container>
          <Row>
            <Col>1 of 1</Col>
            <Col className="text-end text-light">
              <h2>Community Collaboration</h2>
              <p>
                The application often includes features for commenting, voting
                on story directions, and sharing completed stories within the
                community or on social media platforms​. Top story list is
                generated based on the users likes and comments.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="Landingsection8">
        <Container>
          <Row>
            <Col className=" text-light">
              <h2>A simpler way to read</h2>
              <p>
                Reading transports us to different worlds, igniting our
                imaginations and fostering empathy as we step into the shoes of
                characters unlike ourselves. It expands our knowledge base,
                introducing us to new ideas, cultures, and historical events.
                Whether it's a captivating novel, a thought-provoking article,
                or an informative blog post, reading keeps our minds sharp and
                engaged.
              </p>
            </Col>{" "}
            <Col></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Landingsection7;
