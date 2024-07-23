import AdminSidebar from "../Pages/AdminSidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function ViewChallengersTitle() {
  const [data, setData] = useState([]);
  const [c, setC] = useState([]);
  const [winnerannounced, setWinnerannounced] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`/viewchallengeUpdatessBychallengeId/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
    axiosInstance
      .post(`/viewChallengeById/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setC(res.data.data);
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
      axiosInstance
      .post(`/getChallengeWinnersByChallengeId/${id}`)
      .then((res) => {
        console.log(res.data.data,'getChallengeWinnersByChallengeId');
        if (res.data.data) {
          setWinnerannounced(true);
        }
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });
  }, []);

  return (
    <div className="row">
      <div className="col-3">
        <AdminSidebar />
      </div>
      <div className="col-9 container">
        <h1 className="mt-5">{c.title}</h1>
        <label>
          ({c.startDate?.split("T")[0]} to {c.endDate?.split("T")[0]})
        </label>
        <div className="row mb-5" style={{ minHeight: "100vh" }}>
          <div className="col-2"></div>
          <div className="col-8">
            <h2 className="my-5 text-center">Challenge History</h2>
            {data.map((d, i) => {
              return data[i - 1] && data[i - 1].date == d.date ? (
                <>
                  <div className="col-9">
                    <div className="row writer-challenges-historynameback container pe-5 " >
                      <div className="col-4">
                        <h6>
                          @{d.readerId ? d.readerId.name : d.writerId.name}
                        </h6>
                      </div>
                      <div className="col-4">
                        <h6>{d.readerId ? "Reader" : "Writer"}</h6>
                      </div>
                      <div className="col-4">
                        <h6>{d.status}</h6>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="row mt-3">
                  <div className="col-3 writer-challenges-historydate text-center ">
                    <h6 className="p-2">{d.date.split("T")[0]}</h6>
                  </div>
                  <div className="col-9">
                    <div className="row writer-challenges-history-name-back container pt-2 pe-5 ">
                      <div className="col-4 p-2">
                        <h6>
                          @{d.readerId ? d.readerId.name : d.writerId.name}
                        </h6>
                      </div>
                      <div className="col-4">
                        <h6>{d.readerId ? "Reader" : "Writer"}</h6>
                      </div>
                      <div className="col-4">
                        <h6>{d.status}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-2"></div>
        </div>

        <div className="my-4 text-end me-5">
          <Link to={winnerannounced ? '/viewchallengesummary/'+id: "/announcechallengesummary/" + id}>
            <button className="view-challenders-title-announcebtn">
              {winnerannounced ?'View Winner' : 'Announce Winner'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewChallengersTitle;
