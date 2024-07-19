import React,{ useState, useEffect} from 'react'
import './Writer.css'
import bg from '../../Assets/bg.png'
import { Form, Radio, Input } from "antd";
import { FaCamera } from "react-icons/fa";
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import {useNavigate} from 'react-router-dom'
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';


function WriterStoryViewPage({url}) {
    const navigate=useNavigate();

    const navigateToEditStory=(id)=>{
        navigate(`/writer-edit-customstory/${id}`)
    }

    const [storydata, setStorydata]= useState([{coverPicture:{filename:''}}]);
  const [id, setId]= useState(localStorage.getItem("writer"));

  useEffect(()=>{
    if(localStorage.getItem("token")== null && localStorage.getItem("writer") == null ){
      navigate("/");
    }
  },[navigate]);

  useEffect(()=>{
    axiosInstance.post(`/viewStoriesByWriterId/${id}`)
    .then((res)=>{
      console.log(res,"res");
      var tempm = []
      for (var i in res.data.data) {
        if (!res.data.data[i].published) {
          tempm.push(res.data.data[i]) 
        }
      }
        setStorydata(tempm)
        console.log(tempm,"tempm");
    })
    .catch((err)=>{
      alert("Failed to fetch user details")
  });
  },[])

  const [writerdata , setWriterData]=useState({profilePicture:{filename:''}});

  useEffect(()=>{
    axiosInstance.post(`/viewWriterById/${id}`)
    .then((res)=>{
        console.log(res,"res");
        setWriterData(res.data.data)
        console.log(writerdata,"writerdata");
    })
    .catch((err)=>{
      alert("Failed to fetch user details")
  });
  },[])
  return (
    <>
        <div className='mb-5 mt-5'>
      <div className='container mt-5'>
        <div className='writer-story-viewpage-navdiv'>
            <div className='row'>
                <div className='col-3  text-center'>
                    <img src={`${imageUrl}/${writerdata.profilePicture?.filename}`} className='writer-story-viewpage-profileimg mt-2'></img>
                </div>
                {/* <div className='col-5'>
                    <button className='mt-3 writer-story-viewpage-publishbtn'>Publish</button>
                </div> */}
            </div>
        </div>
        <div className='row'>
            <div className='col '>
                <div className='writer-story-viewpage-secdiv1  ps-2'>
                    
                <div class="row row-cols-1 row-cols-md-4 g-4 ">
         {
        (storydata?.length)>0?((storydata).map((data) => {
          return(
            
          <div class="col mb-4">
            <div class="writer-story-viewpage-cover ">
              <img 
              src={`${imageUrl}/${data.coverPicture?.filename}`} 
              class="writer-story-viewpage-coverpic" alt="..."/>
              <div class="text-center mt-2">
                <h6>{data.title}</h6>
                <button class="writer-story-viewpage-resumebtn" 
                onClick={()=>{navigateToEditStory(data._id)}}
                >Retouch</button>
              </div>
            </div>
          </div>
            
           )
        })):(
        
          <h4>No story available</h4>
        )
        }  
        </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default WriterStoryViewPage