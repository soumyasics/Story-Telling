import AdminSidebar from "../Pages/AdminSidebar";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AnnounceChallengeSummary() {
  const [p, setP] = useState([]);
  const [pup, setPup] = useState([]);
  const [body, setBody] = useState({});
  const [position, setPosition] = useState(['1st', '2nd', '3rd', '4th', '5th']);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`/viewchallengeUpdatessBychallengeId/${id}`)
      .then((res) => {
        var temp = [];
        var temid = [];
        console.log(res.data.data);
        for (var i in res.data.data) {
          var d = res.data.data[i];
          if (d.readerId) {
            if (!temid.includes(d.readerId._id)) {
              temp.push({
                name: d.readerId.name,
                readerId: d.readerId._id,
              });
              temid.push(d.readerId._id);
            }
          } else {
            if (!temid.includes(d.writerId._id)) {
              temp.push({
                name: d.writerId.name,
                writerId: d.writerId._id,
              });
              temid.push(d.writerId._id);
            }
          }
        }
        setP(temp);
        setPup(temp);
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, []);
  const handlech = (e,i) =>{
    console.log(e.target.name, i)
    setBody({ ...p, [e.target.name]: value });
  }
  return (
    <div className="row mb-5">
      <div className="col-3">
        <AdminSidebar />
      </div>
      <div className="col-9">
        <h1 className="mt-5">Announce Challenge Summary</h1>
        <div className=" row  container">
          <div className="col-1"></div>
          <div className="col-10">
            <div className="row announce-summary-challenge-grid mt-5 ms-2">
              <div className="col-4 pt-3 ps-5">
                <h6>Position</h6>
              </div>
              <div className="col-4 pt-3 ps-5">
                <h6>Participate Name</h6>
              </div>
              <div className="col-4 pt-3 ps-5">
                <h6>Points Archieved</h6>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        {p.map((pp,i) => {
          return (
            <div className=" row  container">
              <div className="col-1"></div>
              <div className="col-10">
                <div className="row announce-summary-challenge-grid1 mt-5 ms-2">
                  <div className="col-4 pt-2 ps-5">
                    <h3>{position[i]}</h3>
                  </div>
                  <div className="col-4 pt-3 ps-5">
                    <select name="winner" id="cars" onChange={(e)=>handlech(e,i)}>
                      {pup.map((names) => {
                        return <option value={names.readerId? names.readerId:names.writerId}>{names.name}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-4 pt-3 ps-5">
                  <input type="text" name='point' onChange={(e)=>handlech(e,i)}></input>
                  </div>
                </div>
              </div>
              <div className="col-1"></div>
            </div>
          );
        })}

        <div className="mt-5 text-end me-5 pe-5">
          <button className="announce-summary-challenge-savebtn">Save</button>
        </div>
      </div>
    </div>
  );
}

export default AnnounceChallengeSummary;
