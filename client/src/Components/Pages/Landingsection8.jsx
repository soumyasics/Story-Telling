import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Landingsection8img1 from "../../Assets/Landingsection8img1.png";
import Landingsection8img2 from "../../Assets/Landingsection8img2.png";
import middleone from "../../Assets/middleone.png";
import Landingsection8img4 from "../../Assets/Landingsection8img4.png";
import Landingsection8img5 from "../../Assets/Landingsection8img5.png";
import storyimg from "../../Assets/storyimg.png";

function Landingsection8() {
  return (
    <div>
      {" "}
      <div className="Landingsection8img pt-5">
        <h2 className="text-center p-5">
          Powerfull Features that will transform the <br></br>auther-editor
          relationship
        </h2>
        <section className="container px-5 pb-5">
          <Row className="ps-5 ms-4">
            <Col>
              {" "}
              <img src={Landingsection8img1} style={{ width: "120px" }}></img>
            </Col>
            <Col>
              {" "}
              <img src={Landingsection8img2} style={{ width: "100px" }}></img>
            </Col>
            <Col>
              {" "}
              <img src={middleone} style={{ width: "150px" }}></img>
            </Col>
            <Col>
              {" "}
              <img src={Landingsection8img4} style={{ width: "180px" }}></img>
            </Col>
            <Col>
              {" "}
              <img src={Landingsection8img5} style={{ width: "100px" }}></img>
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="">
              <h5 className="text-center">Import</h5>
            </Col>
            <Col>
              {" "}
              <h5 className="text-center">Collaborative Editing</h5>
            </Col>
            <Col>
              {" "}
              <h5 className="text-center ms-4">Versioning</h5>
            </Col>
            <Col>
              {" "}
              <h5 className="text-center ms-5">Commenting</h5>
            </Col>
            <Col>
              {" "}
              <h5 className="text-center">Track Changerse</h5>
            </Col>
          </Row>
          <div className="p-5 m-5 text-center">
            {" "}
            These advanced features are comming soon!
          </div>
        </section>
      </div>
      <section className="Landingsection8div1">
        <div className="container text-light text-center pt-5">
          <h3 className=" p-5">
            Where every voice matters and every story <br></br> is a shared
            adventure
          </h3>
          <p className="px-5">
            "Unleash your creativity with our collaborative storytelling app!
            Record and listen to audio stories, read captivating tales, and take
            turns adding to the narrative. Challenge each other with unique
            constraints. Whether for fun or education, dive into an engaging
            world of co-created tales, where every voice matters and every story
            is a shared adventure."
          </p>
          
          <div className="text-center mt-5 pt-5">
            <img src={storyimg}></img>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landingsection8;
