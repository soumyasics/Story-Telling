import React, { useEffect, useState } from 'react'
import './Writer.css'
import writerprofilebackimg from '../../Assets/writerprofilebackimg.png'
import writerprofilefrontimg from '../../Assets/bg.png'
import { FaCamera } from "react-icons/fa";
import cameraeditprofile from '../../Assets/cameraeditprofile.png'
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import {useParams,useNavigate} from 'react-router-dom'
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';

function WriterEditProfile() {

    const navigate =useNavigate()
    useEffect(() => {
        if (
          localStorage.getItem("token") == null &&
          localStorage.getItem("writer") == null
        ) {
          navigate("/login");
        }
      }, [navigate]);

    const[data,setData]=useState({
        name:"",
        email:"",
        userCategory:"",
        contact:"",
        age:"",
        password:"",
        profilePicture:{filename:''}
    });

    const {id}=useParams();

    // const id=localStorage.getItem('reader')
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        axiosInstance.post(`viewWriterById/${id}`)
        .then((res) => {
            setData(res.data.data)
            console.log(res.data.data,"data");

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
                profilePicture: { filename: file.name }
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
        if(profileImage){
            formData.append('profilePicture'.data.profilePicture)
        }
        try{
            const res = await axiosInstance.post(`editWriterById/${id}`,data);
            if (res.data.status === 200) {
                alert("Updated Successfully")
            }
            else{
                alert("Contact Already in Use")
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
            <img src={`${imageUrl}/${data.profilePicture.filename}`} alt='Profile' className='writer-edit-profile-front-img' />
            <label className='upload-icon'>
            {/* <img src={cameraeditprofile}className='writer-edit-profile-cameraimg me-5' style={{position:'absolute'}} ></img> */}
                <FaCamera className='writer-edit-profile-icon' 
                style={{position:'absolute'}}
                onClick={() =>
                    document.getElementById("profilePicture").click()
                  }
                />    
            <input
                type='file'
                style={{ display: 'none' }}
                name='profilePicture'
                id="profilePicture"
                onChange={handleChange}
                />
            </label>
        </div>
      {/* <img src={writerprofilefrontimg} className='writer-profile-front-img'></img> */}
      </div>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4 mb-5 mt-5'>
            <form onSubmit={(e)=>{handleSubmit(e);}}>
            
                <div className='row'>
                    <div className='col mt-2'>
                        <label>Name</label>
                    </div>
                    <div className='col'>
                        <input 
                        className='ms-3 writer_edit_pro_input'
                        name='name'
                        value={data.name}
                        placeholder={data.name}
                        onChange={handleChange}
                        />
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col mt-2'>
                        <label>Email ID</label>
                    </div>
                    <div className='col'>
                    <input className='ms-3 writer_edit_pro_input'
                    name='email'
                    value={data.email}
                    placeholder={data.email}
                    onChange={handleChange}
                    />
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col mt-2'>
                        <label>Category</label>
                    </div>
                    <div className='col'>
                    <input className='ms-3 writer_edit_pro_input'
                    name='userCategory'
                    value={data.userCategory}
                    placeholder={data.userCategory}
                    onChange={handleChange}
                    />
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col mt-2'>
                        <label>Phone Number</label>
                    </div>
                    <div className='col'>
                    <input className='ms-3 writer_edit_pro_input'
                    name='contact'
                    value={data.contact}
                    placeholder={data.contact}
                    onChange={handleChange}
                    />
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col mt-2'>
                        <label>Age </label>
                    </div>
                    <div className='col'>
                    <input className='ms-3 writer_edit_pro_input'
                    name='age'
                    value={data.age}
                    placeholder={data.age}
                    onChange={handleChange}
                    />
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
