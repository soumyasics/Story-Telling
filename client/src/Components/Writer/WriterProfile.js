import React, { useEffect, useState } from "react";
import "./Writer.css";
import writerprofilebackimg from "../../Assets/writerprofilebackimg.png";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { Link } from "react-router-dom";
function WriterProfile({ url }) {
  const [data, setData] = useState();
  const id = localStorage.getItem("writer");
  console.log(id);

  useEffect(() => {
    axiosInstance
      .post(`viewWriterById/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div>
        <img
          src={writerprofilebackimg}
          className="writer-profile-back-img"
        ></img>
      </div>
      <div className="text-center">
        <img
          src={`${url}${data?.profilePicture.filename}`}
          className="writer-profile-front-img"
        ></img>
      </div>
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4 mb-5">
          <div className="row">
            <div className="col">
              <label>Name</label>
            </div>
            <div className="col">
              <label className="ms-3">{data?.name}</label>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Email ID</label>
            </div>
            <div className="col">
              <label className="ms-3">{data?.email}</label>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Category</label>
            </div>
            <div className="col">
              <label className="ms-3">{data?.userCategory}</label>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Phone Number</label>
            </div>
            <div className="col">
              <label className="ms-3">{data?.contact}</label>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Age </label>
            </div>
            <div className="col">
              <label className="ms-3">{data?.age}</label>
              <hr></hr>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link
              to="/writer-edit-profile"
              type="submit"
              className="writer-profile-editbtn"
            >
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default WriterProfile;
