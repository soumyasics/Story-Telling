import React, { useEffect, useState } from "react";
import "./Writer.css";
import writerprofilebackimg from "../../Assets/writerprofilebackimg.png";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { Link, useNavigate } from "react-router-dom";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";


function WriterProfile({url}) {

    const[data,setData]=useState({profilePicture:{filename:''}});
    const id=localStorage.getItem('writer')
    console.log(id);


  const navigate = useNavigate()

  useEffect(() => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("writer") == null
    ) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance.post(`viewWriterById/${id}`)
    .then((res) => {
        console.log(res);
        setData(res.data.data)
        console.log(res.data.data,"data");
    })
    .catch((err) => {
        console.log(err);
    })
},[id])

const profile=data.profilePicture
console.log(profile,"profile");

const navigateToeditprofile=(id)=>{
    navigate(`/writer-edit-profile/${id}`)
}
  
    
  return (
    <div>
      <div>
        <img
          src={writerprofilebackimg}
          className="writer-profile-back-img"
        ></img>
      </div>
      <div className="text-center">
      {profile && (
        <img
          src={`${imageUrl}/${profile.filename ? profile.filename : profile}`}
          className="writer-edit-profile-front-img"
          alt="Profile"
        ></img>
      )}
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
              className="writer-profile-editbtn text-decoration-none pt-2"
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
