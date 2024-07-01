import React, { useState } from 'react'
import './Reader.css'
import writerprofilebackimg from '../../Assets/writerprofilebackimg.png'
import writerprofilefrontimg from '../../Assets/writerprofilefrontimg.png'
import { FaCamera } from "react-icons/fa";
function ReaderEditProfile() {
    const[data,setData]=useState({
        name:"",
        email:"",
        category:"",
        contact:"",
        age:"",
        password:"",
        profilePicture:{filename:''}
    })

    const [profileImage, setProfileImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            const file = files[0];
            setProfileImage(file);
            setData((prevData) => ({
                ...prevData,
                profile: { filename: file.name }
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

  return (
    <div>
      <div >
        <img src={writerprofilebackimg} className='reader-edit-profile-back-img'></img>
      </div>
      <div className='text-center'>
      <div className='text-center'>
            <img src={profileImage ? URL.createObjectURL(profileImage) :writerprofilefrontimg } style={{position:'relative'}} alt='Profile' className='reader-edit-profile-front-img' />
            <label className='upload-icon'>
            {/* <img src={cameraeditprofile}className='writer-edit-profile-cameraimg me-5' style={{position:'absolute'}} ></img> */}
                <FaCamera className='reader-edit-profile-icon' style={{position:'absolute'}}/>           
            <input
                type='file'
                style={{ display: 'none' }}
                name='profilePicture'
                onChange={handleChange}
                />
            </label>
        </div>
      {/* <img src={writerprofilefrontimg} className='writer-profile-front-img'></img> */}
      </div>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4 mb-5 mt-5'>
            <form>
                <div className='row'>
                    <div className='col'>
                        <label>Name</label>
                    </div>
                    <div className='col'>
                        <label className='ms-3'></label>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label>Email ID</label>
                    </div>
                    <div className='col'>
                        <label className='ms-3'></label>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label>Category</label>
                    </div>
                    <div className='col'>
                        <label className='ms-3'></label>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label>Phone Number</label>
                    </div>
                    <div className='col'>
                        <label className='ms-3'></label>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label>Age </label>
                    </div>
                    <div className='col'>
                        <label className='ms-3'></label>
                        <hr></hr>
                    </div>
                </div>
                <div className='text-center mt-5'>
                    <button type='submit' className='reader-profile-editbtn'>Save</button>
                </div>
            </form>
        </div>
        <div className='col-4'></div>
      </div>
    </div>
  )
}

export default ReaderEditProfile
