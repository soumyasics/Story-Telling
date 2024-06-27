import React, { useState, useEffect } from "react";
import { Modal, Card } from "react-bootstrap";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function WritersRequestList({ url }) {
  const [data, setData] = useState([]);
  const [writerdetails, setWriterDetails] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    axiosInstance
      .post("/viewWriterById/" + id)
      .then((res) => {
        console.log(res, "view");
        setWriterDetails(res.data.data); // Assuming res.data.data contains writer details
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  function getData() {
    axiosInstance
      .post("/viewWriterReqsforAdmin")
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setData(res.data.data || []); // Ensure setting to empty array if data is undefined
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }

  const handleAccept = (id) => {
    axiosInstance
      .post("/acceptWriterById/" + id)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          alert(res.data.msg);
          getData(); // Refresh data after accepting
        }
      })
      .catch((err) => {
        alert("Failed to accept");
      });
  };

  const handleReject = (id) => {
    axiosInstance
      .post("/rejectWriterById/" + id)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          alert(res.data.msg);
          getData(); // Refresh data after rejecting
        }
      })
      .catch((err) => {
        alert("Failed to reject");
      });
  };

  useEffect(() => {
    getData(); // Fetch initial data on component mount
  }, []);

  return (
    <div className="m-3">
      <div className="shopownerpendingrequestdiv">
        {data.length === 0 ? (
          <h1 className="text-center">No Writers Found</h1>
        ) : (
          <div>
            <h3 className="text-center pt-4">All Writers Request List</h3>
            <div className="row rounded-pill m-5 p-2 w-100" style={{ backgroundColor: "rgb(186, 230, 221)" }}>
              <div className="col-2">
                <b>Name</b>
              </div>
              <div className="col-4">
                <b>Mail Id</b>
              </div>
              <div className="col-2">
                <b>Contact</b>
              </div>
              <div className="col-4">
                <b>Accept/Decline</b>
              </div>
            </div>
            {data.map((item, index) => (
              <div key={index} className="row rounded-pill m-5 p-2 w-100" style={{ backgroundColor: "rgba(217, 217, 217, 1)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div className="col-2">{item.name}</div>
                <div className="col-4">{item.email}</div>
                <div className="col-2">{item.contact}</div>
                <div className="col-3">
                  <button
                    onClick={() => handleAccept(item._id)}
                    className="rounded-pill border-none border border-success text-success px-2"
                  >
                    Accept
                  </button>{" "}
                  <button
                    onClick={() => handleReject(item._id)}
                    className="rounded-pill border-none border border-danger text-danger ps-2 "
                  >
                    Reject
                  </button>{" "}
                </div>
                <div className="col-1">
                  <button
                    className="rounded-pill border-none border border-dark text-secondary ps-2 "
                    onClick={() => handleShow(item._id)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ backgroundColor: "rgb(186, 230, 221)" }} closeButton></Modal.Header>
        <div>
          <div className="text-center" style={{ backgroundColor: "rgb(186, 230, 221)" }}>
            <img
              className="text-center rounded-pill"
              alt="img"
              style={{
                width: "40%",
                height: "200px",
                borderRadius: "25px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              src={`${url}${writerdetails.profilePicture?.filename}`}
            />
          </div>
          <div style={{ backgroundColor: "rgb(186, 230, 221)" }}>
            <table className="ms-5">
              <tbody className="p-4 ms-3">
                <tr>
                  <td>
                    <Card.Subtitle className="mb-2 text-muted">Name</Card.Subtitle>
                  </td>
                  <td className="ps-3">
                    <Card.Subtitle className="mb-2 text-muted">{writerdetails.name}</Card.Subtitle>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Card.Subtitle className="mb-2 text-muted">Email</Card.Subtitle>
                  </td>
                  <td className="ps-3">
                    <Card.Subtitle className="mb-2 text-muted">{writerdetails.email}</Card.Subtitle>
                  </td>
                </tr>{" "}
                <tr>
                  <td>
                    <Card.Subtitle className="mb-2 text-muted">Contact</Card.Subtitle>
                  </td>
                  <td className="ps-3">
                    <Card.Subtitle className="mb-2 text-muted">{writerdetails.contact}</Card.Subtitle>
                  </td>
                </tr>{" "}
                <tr>
                  <td>
                    <Card.Subtitle className="mb-2 text-muted">User Category</Card.Subtitle>
                  </td>
                  <td className="ps-3">
                    <Card.Subtitle className="mb-2 text-muted">{writerdetails.userCategory}</Card.Subtitle>
                  </td>
                </tr>{" "}
                <tr>
                  <td>
                    <Card.Subtitle className="mb-2 text-muted">Age</Card.Subtitle>
                  </td>
                  <td className="ps-3">
                    <Card.Subtitle className="mb-2 text-muted">{writerdetails.age}</Card.Subtitle>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WritersRequestList;
