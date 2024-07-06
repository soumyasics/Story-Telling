import React, {useState,useEffect} from 'react'
import './Writer.css'
import {useNavigate} from 'react-router-dom'
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import Drama from '../../Assets/Drama.png'
import Crime from '../../Assets/Crime.png'
import Horror from '../../Assets/Horror.png'
import Romance from '../../Assets/Romance.png'
import Fantasy from '../../Assets/Fantasy.png'



function WriterViewStories() {
    const navigate =useNavigate();
    const [id, setId]= useState(localStorage.getItem("writer"));

  useEffect(()=>{
    if(localStorage.getItem("token")== null && localStorage.getItem("writer") == null ){
      navigate("/");
    }
  },[navigate]);
  
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
        <section className='container'>
            <div className='mt-5 writer-viewstory-navdiv'>
                <div className='row'>
                    <div className='col-3 text-center'>
                        <img src={`${imageUrl}/${writerdata.profilePicture.filename}`} className='writer-viewstory-profileimg mt-3'></img>
                    </div>
                    <div className='col'>
                        <h4 className='writer-viewstory-name'>{writerdata.name}</h4>
                    </div>
                    <div className='col' >
                        <button  className='mt-4  writer-viewstory-readbtn'>Read Stories</button>
                    </div>
                    <div className='col'>
                        <button className='mt-4 writer-viewstory-listenbtn'>Listen Stories</button>
                    </div>
                </div>
            </div>
            <div>
            <div className='writer-story-addpage-secdiv1 mb-5  ps-2'>
            <div class="row row-cols-1 row-cols-md-5 g-4 mt-3 ">
                <div class="col text-center">
                    <img className='writer-viewstory-categoryimg' src={Drama}/>
                    <h4 className='mt-3'>Drama</h4>
                </div>
                <div class="col text-center">
                    <img className='writer-viewstory-categoryimg' src={Crime}/>
                    <h4 className='mt-3'>Crime</h4>
                </div>
                <div class="col text-center">
                    <img className='writer-viewstory-categoryimg' src={Horror}/>
                    <h4 className='mt-3'>Horror</h4>
                </div>
                <div class="col text-center">
                    <img className='writer-viewstory-categoryimg' src={Romance}/>
                    <h4 className='mt-3'>Romance</h4>
                </div>
                <div class="col text-center">
                    <img className='writer-viewstory-categoryimg' src={Fantasy}/>
                    <h4 className='mt-3'>Fantasy</h4>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 g-4 mt-3 ">
                <div className='col writer-viewstory-categoryview'>

                </div>
            </div>
            </div>
            </div>
        </section>
    </>
  )
}

export default WriterViewStories