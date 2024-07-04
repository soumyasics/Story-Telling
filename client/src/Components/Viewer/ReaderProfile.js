import React, { useState } from 'react'
import './Reader.css'
import writerprofilebackimg from '../../Assets/writerprofilebackimg.png'
import writerprofilefrontimg from '../../Assets/writerprofilefrontimg.png'

import { Link } from 'react-router-dom'

function ReaderProfile() {
    const[data,setData]=useState();
    // const id=localStorage.getItem('')
    // console.log(id);


  return (
    <div>
      <div>
      <div >
        <img src={writerprofilebackimg} className='reader-profile-back-img'></img>
      </div>
      <div className='text-center'>
      <img src={writerprofilefrontimg} className='reader-profile-front-img'></img>
      </div>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4 mb-5 mt-5'>
            <div className='row'>
                <div className='col'>
                    <label>Name</label>
                </div>
                <div className='col'>
                    <label className='ms-3'>Salman</label>
                    <hr></hr>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label>Email ID</label>
                </div>
                <div className='col'>
                    <label className='ms-3'>salman@gmail.com</label>
                    <hr></hr>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label>Category</label>
                </div>
                <div className='col'>
                    <label className='ms-3'>Reader</label>
                    <hr></hr>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label>Phone Number</label>
                </div>
                <div className='col'>
                    <label className='ms-3'>9090909090</label>
                    <hr></hr>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label>Age </label>
                </div>
                <div className='col'>
                    <label className='ms-3'>45</label>
                    <hr></hr>
                </div>
            </div>
            <div className='text-center mt-5'>
                <Link to="/reader-edit-profile" type='submit' className='reader-profile-editbtn'>Edit Profile</Link>
            </div>
        </div>
        <div className='col-4'></div>
      </div>
    </div>
    </div>
  )
}

export default ReaderProfile
