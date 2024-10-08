import AdminSidebar from "../Pages/AdminSidebar";
import "../Pages/AdminLogin.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function ChallengesView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewActiveChallenges`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, []);
  return (
    <div className="row">
      <div className="col-4">
        <AdminSidebar />
      </div>
      <div className="col-8">
        <h1 className="mt-5">View Challenges</h1>
        {data.map((d) => {
          return (
            <>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 view-challengers-title1 mt-3">
                  <div className="row ms-5 pt-4">
                    <div className="col-4">
                      <b>Title</b>
                    </div>
                    <div className="col-1">
                      <b>:</b>
                    </div>
                    <div className="col-7">
                      <b>{d.title}</b>
                    </div>
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 view-challengers-title mt-3">
                  <div className="row ms-5 pt-4">
                    <div className="col-4">Challenge End Date</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{new Date(d.endDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 view-challengers-description mt-3">
                  <div className="row ms-5 pt-4 me-3">
                    <div className="col-4">Description</div>
                    <div className="col-1">:</div>
                    <div className="col-7 view-challengers-description-div">
                      {d.description}
                    </div>
                    
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ChallengesView;
