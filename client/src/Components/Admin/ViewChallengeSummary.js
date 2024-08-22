import AdminSidebar from "../Pages/AdminSidebar";
import trop from "../../Assets/trop.png";
import william from "../../Assets/william.png";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";
import { Link, useNavigate, useParams } from "react-router-dom";

function ViewChallengeSummary() {
  const [writerdata, setWriterData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const writerid = localStorage.getItem("writer");
  useEffect(() => {
    axiosInstance
      .post(`/getChallengeWinnersByChallengeId/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setWriterData(res.data.data);
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
        <div className="mt-5 pt-3">
          <h1> Challenge Winners</h1>
        </div>
        <div className="row mt-5">
          {/* <div className="col-2"></div> */}
          {writerdata.first ? (
            <div className="col-2 view-challenge-summary-divbox">
              <h2 className="text-center mt-2">
                1st<img src={trop} className="view-challenge-summary-img"></img>
              </h2>
              <div className="text-center">
                <img
                  src={
                    imageUrl + "/" + writerdata.first.profilePicture?.filename
                  }
                  className="view-challenge-summary-img"
                ></img>
                <span className="ms-2 view-challenge-summary-name">
                  {writerdata.first?.name}
                </span>
              </div>
              <div className="text-center mt-2 pt-1">
                <h6>Points :{writerdata.firstPoints}/100</h6>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* <div className="col-1"></div> */}
          {writerdata.second ? (
            <div className="col-2 ms-3 view-challenge-summary-divbox p-3 mx-2">
              <h2 className="text-center mt-2">
                2nd<img src={trop} className="view-challenge-summary-img"></img>
              </h2>
              <div className="text-center">
                <img
                  src={
                    imageUrl + "/" + writerdata.second?.profilePicture.filename
                  }
                  className="view-challenge-summary-img"
                ></img>
                <span className="ms-2 view-challenge-summary-name">
                  {writerdata.second?.name}
                </span>
              </div>
              <div className="text-center mt-2 pt-1">
                <h6>Points :{writerdata.secondPoints}/100</h6>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="col-1"></div>
          {writerdata.third ? (
            <div className="col-2 ms-3 view-challenge-summary-divbox">
              <h2 className="text-center mt-2">
                3rd<img src={trop} className="view-challenge-summary-img"></img>
              </h2>
              <div className="text-center">
                <img
                  src={
                    imageUrl + "/" + writerdata.third?.profilePicture.filename
                  }
                  className="view-challenge-summary-img"
                ></img>
                <span className="ms-2 view-challenge-summary-name">
                  {writerdata.third?.name}
                </span>
              </div>
              <div className="text-center mt-2 pt-1">
                <h6>Points :{writerdata.thirdPoints}/100</h6>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row mt-5 pt-3">
          {/* <div className="col-3"></div> */}
          {writerdata.fourth ?
          <div className="col-2 ms-5  view-challenge-summary-divbox">
            <h2 className="text-center mt-2">
              4th<img src={trop} className="view-challenge-summary-img"></img>
            </h2>
            <div className="text-center">
              <img
                src={imageUrl + "/" + writerdata.fourth?.profilePicture}
                className="view-challenge-summary-img"
              ></img>
              <span className="ms-2 view-challenge-summary-name">
                {writerdata.fourth?.name}
              </span>
            </div>
            <div className="text-center mt-2 pt-1">
              <h6>Points :{writerdata.fourthPoints}/100</h6>
            </div>
          </div> :''}
          <div className="col-1"></div>
          {writerdata.fifth ?
          <div className="col-2 ms-3 view-challenge-summary-divbox">
            <h2 className="text-center mt-2">
              5th<img src={trop} className="view-challenge-summary-img"></img>
            </h2>
            <div className="text-center">
              <img
                src={imageUrl + "/" + writerdata.fifth?.profilePicture.filename}
                className="view-challenge-summary-img"
              ></img>
              <span className="ms-2 view-challenge-summary-name">
                {writerdata.fifth?.name}
              </span>
            </div>
            <div className="text-center mt-2 pt-1">
              <h6>Points :{writerdata.fifthPoints}/100</h6>
            </div>
          </div> :''}
          {/* <div className="col-3"></div> */}
        </div>
      </div>
    </div>
  );
}

export default ViewChallengeSummary;
