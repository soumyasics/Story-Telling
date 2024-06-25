import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card, Row, Col } from "react-bootstrap";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function WriterList() {
  const [data, setData] = useState([]);
  const [writerdetails, setwriterdetails] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    axiosInstance
      .post("/viewWriterById/" + id)
      .then((res) => {
        console.log(res, "view");
        setwriterdetails(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  function getData() {
    axiosInstance
      .post("/viewWriters")
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }

  const handleAccept = (id) => {
    axiosInstance
      .post("/activateWriterById/" + id)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          alert(res.data.msg);
          getData();
        }
      })
      .catch((err) => {
        alert("Failed to accept");
      });
  };

  const handleReject = (id) => {
    axiosInstance
      .post("/deActivateWriterById/" + id)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          alert(res.data.msg);
          getData();
        }
      })
      .catch((err) => {
        alert("Failed to reject");
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="m-3">
      <div className="">
        <div className="shopownerpendingrequestdiv">
          <div className="">
            {data?.length === 0 && (
              <h1 className="text-center"> No Writers Found</h1>
            )}
            {data?.length > 0 && (
              <div>
                <h3 className="text-center pt-4 ">All Writers Request List</h3>
                <div
                  className="row rounded-pill m-5 p-2"
                  style={{ backgroundColor: "rgb(186, 230, 221)" }}
                >
                  <div className="col-2">
                    <b>Name</b>
                  </div>
                  <div className="col-2">
                    <b> Mail I’d</b>
                  </div>
                  <div className="col-2">
                    <b>Contact</b>
                  </div>
                  <div className="col-4">
                    <b>Accept/Declain</b>
                  </div>
                </div>
                {data.map((item, index) => (
                  <div
                    className="row rounded-pill m-5 p-2"
                    style={{ backgroundColor: "rgb(186, 230, 221)" }}
                  >
                    <div className="col-2">{item.name}</div>
                    <div className="col-2">{item.email}</div>
                    <div className="col-2">{item.contact} </div>

                    <div className="col-4">
                      <button
                        onClick={() => handleAccept(writerdetails._id)}
                        className="btn btn-outline-success "
                      >
                        Accept
                      </button>{" "}
                      <button
                        onClick={() => handleReject(writerdetails._id)}
                        className="btn btn-outline-danger  "
                      >
                        Reject
                      </button>{" "}
                    </div>
                    <div className="col-1">
                      <button
                        className="rounded-pill px-3 btn btn-secondary"
                        onClick={() => handleShow(item._id)}
                      >
                        view
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton></Modal.Header>
            <div>
              <div>
                {" "}
                <div className="text-center">
                  <img
                    className="text-center"
                    alt="img"
                    style={{
                      width: "50%",
                      height: "280px",
                      boarderRadius: "25px",
                    }}
                    src={`${url}${writerdetails.profilePicture?.filename}`}
                  ></img>
                </div>
                <div className="ms-5">
                  <table>
                    <div className="p-4">
                      <tr>
                        <td>
                          <Card.Subtitle className="mb-2 text-muted">
                            Name
                          </Card.Subtitle>
                        </td>
                        <td className="ps-3">
                          <Card.Subtitle className="mb-2 text-muted">
                            {writerdetails.name}
                          </Card.Subtitle>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Card.Subtitle className="mb-2 text-muted">
                            email
                          </Card.Subtitle>
                        </td>
                        <td className="ps-3">
                          <Card.Subtitle className="mb-2 text-muted">
                            {writerdetails.email}
                          </Card.Subtitle>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>
                          <Card.Subtitle className="mb-2 text-muted">
                            contact
                          </Card.Subtitle>
                        </td>
                        <td className="ps-3">
                          <Card.Subtitle className="mb-2 text-muted">
                            {writerdetails.contact}
                          </Card.Subtitle>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>
                          <Card.Subtitle className="mb-2 text-muted">
                            userCategory
                          </Card.Subtitle>
                        </td>
                        <td className="ps-3">
                          <Card.Subtitle className="mb-2 text-muted">
                            {writerdetails.userCategory}
                          </Card.Subtitle>
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>
                          <Card.Subtitle className="mb-2 text-muted">
                            age
                          </Card.Subtitle>
                        </td>
                        <td className="ps-3">
                          <Card.Subtitle className="mb-2 text-muted">
                            {writerdetails.age}
                          </Card.Subtitle>
                        </td>
                      </tr>
                    </div>
                  </table>
                </div>
              </div>
            </div>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default WriterList;
