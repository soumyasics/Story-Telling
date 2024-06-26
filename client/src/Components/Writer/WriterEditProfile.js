import React, { useEffect, useState } from 'react'
import './Writer.css'
import writerprofilebackimg from '../../Assets/writerprofilebackimg.png'
import writerprofilefrontimg from '../../Assets/bg.png'
import { FaCamera } from "react-icons/fa";
import cameraeditprofile from '../../Assets/cameraeditprofile.png'
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
function WriterEditProfile() {

    const[data,setData]=useState({
        name:"",
        email:"",
        category:"",
        contact:"",
        age:"",
        password:"",
        profilePicture:{filename:''}
    });

    const id=localStorage.getItem('reader')
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        axiosInstance.post(`viewWriterById/${id}`)
        .then((res) => {
            setData.apply(res.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[id]);

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
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',data.name)
        formData.append('email',data.email)
        formData.append('userCategory',data.userCategory)
        formData.append('contact',data.contact)
        formData.append('age',data.age)
        formData.append('password',data.password)
        if(profileImage){
            formData.append('profilePicture'.data.profilePicture)
        }
        try{
            const res = await axiosInstance.post(`editWriterById/${id}`,formData);
            if (res.data.status === 200) {
                alert("Updated Successfully")
            }
            else{
                alert("Failed")
            }
        }
        catch(err){
            console.log(err);
            alert("An error occurred");
        }
    }
  return (
    <div>
      <div >
        <img src={writerprofilebackimg} className='writer-edit-profile-back-img'></img>
      </div>
      <div className='text-center'>
      <div className='text-center'>
            <img src={profileImage ? URL.createObjectURL(profileImage) :writerprofilefrontimg } style={{position:'relative'}} alt='Profile' className='writer-edit-profile-front-img' />
            <label className='upload-icon'>
            {/* <img src={cameraeditprofile}className='writer-edit-profile-cameraimg me-5' style={{position:'absolute'}} ></img> */}
                <FaCamera className='writer-edit-profile-icon' style={{position:'absolute'}}/>           
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
                    <button type='submit' className='writer-profile-editbtn'>Save</button>
                </div>
            </form>
        </div>
        <div className='col-4'></div>
      </div>
    </div>
  )
}

export default WriterEditProfile
