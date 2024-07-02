import React, { useState, useEffect } from 'react';
import './Reader.css';
import writerprofilebackimg from '../../Assets/writerprofilebackimg.png';
import writerprofilefrontimg from '../../Assets/writerprofilefrontimg.png';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';

function ReaderProfile({ url }) {
  const [data, setData] = useState(null); // Initialize state as null
  const id = localStorage.getItem('reader');
  console.log(id);

  useEffect(() => {
    axiosInstance.post(`/viewreaderprofile/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!data) {
    return <div>Loading...</div>; // Render loading state while data is being fetched
  }

  return (
    <div>
      <div>
        <div>
          <img src={writerprofilebackimg} className='reader-profile-back-img' alt="Background" />
        </div>
        <div className='text-center'>
          <img src={`${url}/${data.profilePicture.filename}`} className='reader-profile-front-img rounded-pill' alt="Profile" />
        </div>
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-4 mb-5 mt-5'>
            <div className='row'>
              <div className='col'>
                <label>Name</label>
              </div>
              <div className='col'>
                <label className='ms-3'>{data.name}</label>
                <hr></hr>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>Email ID</label>
              </div>
              <div className='col'>
                <label className='ms-3'>{data.email}</label>
                <hr></hr>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>Category</label>
              </div>
              <div className='col'>
                <label className='ms-3'>{data.userCategory}</label>
                <hr></hr>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>Phone Number</label>
              </div>
              <div className='col'>
                <label className='ms-3'>{data.contact}</label>
                <hr></hr>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>Age</label>
              </div>
              <div className='col'>
                <label className='ms-3'>{data.age}</label>
                <hr></hr>
              </div>
            </div>
            <div className='text-center mt-5'>
              <button type='submit' className='reader-profile-editbtn'>Edit Profile</button>
            </div>
          </div>
          <div className='col-4'></div>
        </div>
      </div>
    </div>
  );
}

export default ReaderProfile;
