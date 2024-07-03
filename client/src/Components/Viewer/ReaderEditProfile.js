import React, { useState,useEffect } from 'react'
import './Reader.css'
import writerprofilebackimg from '../../Assets/writerprofilebackimg.png'
import writerprofilefrontimg from '../../Assets/writerprofilefrontimg.png'
import { FaCamera } from "react-icons/fa";
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import {useParams,useNavigate} from 'react-router-dom'
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';

function ReaderEditProfile() {
    const[data,setData]=useState({
        name:"",
        email:"",
        userCategory:"",
        contact:"",
        age:"",
        password:"",
        profilePicture:{filename:''}
    })

    const {id}=useParams();

    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        axiosInstance.post(`viewReaderById/${id}`)
        .then((res) => {
            setData(res.data.data)
            console.log(res.data.data,"data");

        })
        .catch((err) => {
            console.log(err);
        })
    },[id]);

    // const handleChange = (e) => {
    //     const { name, value, files, type } = e.target;
    //     if (type === 'file') {
    //         const file = files[0];
    //         setProfileImage(file);
    //         setData((prevData) => ({
    //             ...prevData,
    //             profile: { filename: file.name }
    //         }));
    //     } else {
    //         setData((prevData) => ({
    //             ...prevData,
    //             [name]: value
    //         }));
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
      };
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    
        console.log(files);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',data.name)
        formData.append('email',data.email)
        formData.append('userCategory',data.userCategory)
        formData.append('contact',data.contact)
        formData.append('age',data.age)
        formData.append('profilePicture',data.profilePicture)

        try{
            const res = await axiosInstance.post(`editReaderById/${id}`,formData);
            if (res.data.status === 200) {
                alert("Updated Successfully")
            }
            else{
                alert(data.msg)
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
        <img src={writerprofilebackimg} className='reader-edit-profile-back-img'></img>
      </div>
      <div className='text-center'>
      <div className='text-center'>
            <img src={`${imageUrl}/${data.profilePicture.filename}`} alt='Profile' className='reader-edit-profile-front-img' />
            <label className='upload-icon'>
            {/* <img src={cameraeditprofile}className='writer-edit-profile-cameraimg me-5' style={{position:'absolute'}} ></img> */}
            <FaCamera className='writer-edit-profile-icon' 
                style={{position:'absolute'}}
                onClick={() =>
                    document.getElementById("profilePicture").click()
                  }
                />    
            
            </label>
        </div>
      {/* <img src={writerprofilefrontimg} className='writer-profile-front-img'></img> */}
      </div>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4 mb-5 mt-5'>
            <form onSubmit={(e)=>{handleSubmit(e);}}>
            <input
                type='file'
                style={{ display: 'none' }}
                name='profilePicture'
                id='profilePicture'
                onChange={handleFileChange}
                />
                <div className='row'>
                    <div className='col'>
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
                    <div className='col'>
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
                    <div className='col'>
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
                    <div className='col'>
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
                    <div className='col'>
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
