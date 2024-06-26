import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card, Row, Col } from "react-bootstrap";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function WriterList({ url }) {
  console.log(url);
  const [data, setData] = useState([]);

  function getData() {
    axiosInstance
      .post("/viewWriters")
      .then((res) => {
        console.log(res, "res writers");
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }
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
                <h3 className="text-center pt-4 ">All Writers</h3>
                <div
                  className="row rounded-pill m-5 p-2"
                  style={{ backgroundColor: "rgb(186, 230, 221)" }}
                >
                  <div className="col-1">
                    <b>writers</b>
                  </div>
                  <div className="col-2">
                    <b>Name</b>
                  </div>
                  <div className="col-2">
                    <b> Mail I’d</b>
                  </div>
                  <div className="col-2">
                    <b>Contact</b>
                  </div>
                  <div className="col-1">
                    <b>Age</b>
                  </div>
                  <div className="col-2">
                    <b>Paid</b>
                  </div>
                </div>
                {data.map((item, index) => (
                  <div
                    className="row rounded-pill m-5 p-2"
                    style={{ backgroundColor: "rgb(186, 230, 221)" }}
                  >
                    <div className="col-1">
                      {" "}
                      <img
                        className="text-center rounded-pill me-1"
                        alt="img"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        src={`${url}${item.profilePicture.filename}`}
                      ></img>
                    </div>

                    <div className="col-2">{item.name}</div>
                    <div className="col-2">{item.email}</div>
                    <div className="col-2">{item.contact} </div>
                    <div className="col-1">{item.age}</div>
                    <div className="col-2">{item.amount}</div>
                    <div className="col-2">
                      <div className="btn btn-secondary"> DeActivated </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriterList;
