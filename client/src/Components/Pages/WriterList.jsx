import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function WriterList({ url }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

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
        console.error("Failed to fetch writers:", err);
        alert("Failed to fetch writers. Please try again later.");
      });
  }


  const toggleShopOwnerStatus = (id, currentStatus) => {
    const endpoint = currentStatus ? "/deActivateWriterById/" : "/activateWriterById/";
    axiosInstance
      .post(endpoint + id)
      .then((res) => {
        if (res.status === 200) {
          let msg = res?.data?.message || `Writer is now ${currentStatus ? "Inactive" : "Active"}`;
          alert(msg);
          getData();
          setData(prevState => ({
            ...prevState,
            ActiveStatus: !currentStatus
          }));
        } else {
          console.log("Error on status change");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="m-3">
      <div className="shopownerpendingrequestdiv">
        <div>
          {data?.length === 0 && (
            <h1 className="text-center">No Writers Found</h1>
          )}
          {data?.length > 0 && (
            <div>
              <h3 className="text-center pt-4">All Writers</h3>
              <div
                className="row rounded-pill m-5 p-2"
                style={{ backgroundColor: "rgb(186, 230, 221)" }}
              >
                <div className="col-1">
                  <b>Writers</b>
                </div>
                <div className="col-2">
                  <b>Name</b>
                </div>
                <div className="col-4">
                  <b>Mail Id</b>
                </div>
                <div className="col-2">
                  <b>Contact</b>
                </div>
                <div className="col-1">
                  <b>Age</b>
                </div>
                
                <div className="col-2">
                  <b>Status</b>
                </div>
              </div>
              {data.map((item) => (
                <div
                  key={item._id}
                  className="row rounded-pill m-5 p-2"
                  style={{ backgroundColor: "rgb(186, 230, 221)" }}
                >
                  <div className="col-1">
                    <img
                      className="text-center rounded-pill me-1"
                      alt="img"
                      style={{ width: "40px", height: "40px" }}
                      src={`${url}${item.profilePicture?.filename}`}
                    />
                  </div>
                  <div className="col-2">{item.name}</div>
                  <div className="col-4">{item.email}</div>
                  <div className="col-2">{item.contact}</div>
                  <div className="col-1">{item.age}</div>
                  <div className="col-2">
                   
                     <button
                        onClick={() => toggleShopOwnerStatus(item._id, item.isActive)}
                        className="btn btn-success rounded-pill"
                      >
                        {item.isActive ? "To DeActivate" : "To Activate"}
                      </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WriterList;
