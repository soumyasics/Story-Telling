import React,{useState,useEffect} from 'react'
import './Writer.css'
import bg from '../../Assets/bg.png'
import { Form, Radio, Input } from "antd";
import { FaCamera } from "react-icons/fa";
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import {useNavigate} from 'react-router-dom'
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';



function WriterStoryEditPage() {

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
      alert.error("Failed to fetch user details")
  });
  },[])

    const [textb, setState] =useState({
        showTextBox: false,
        showFileUpload:false,
        showSaveButton:false
      });
    const handleOnChange = e => {
        setState({
          showTextBox: e.target.value === 'text',
          showFileUpload:e.target.value ==='audio',
          showSaveButton:e.target.value ==='save'

        });
    };

  return (
    <>
        <div className='mb-5 mt-5'>
        {/* <form onSubmit={(e)=>{handleSubmit(e);}}> */}
      <div className='container mt-5'>
        <div className='writer-story-addpage-navdiv'>
            <div className='row'>
                <div className='col-4' >
                <button className='mt-4 me-5 writer-story-editpage-savebtn'>Save</button>
                <button className='writer-story-editpage-editbtn'>Edit</button>
                
                </div>
                
                
                <div className='col-3 text-center'>
                    <img src={`${imageUrl}/${writerdata.profilePicture.filename}`} className='writer-story-addpage-profileimg mt-3'></img>
                </div>
                <div className='col-5'>
                    <button className='mt-4 writer-story-editpage-publishbtn'>Publish</button>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col '>
                <div className='writer-story-addpage-secdiv1  ps-2'>
                    <div className='row container pt-2 ps-5'>
                        <div className='col writer-story-addpage-div2 mt-5 '>
                            <div className='text-center mt-3'>
                                <input className='writer-story-addpage-addtitle' 
                                name='title'
                                // onChange={handleChange}
                                placeholder='Add a Title'/>
                          {/* {errors.title && (<div className="text-danger errortext">{errors.title}</div>)} */}

                            </div>
                            <div className='text-center  mt-2'>
                                <select id="dropdown" 
                                name='storyCategory'
                                // onChange={handleChange}
                                className='writer-story-addpage-category'
                                 title="Story Category">
                                    <option >Story Category</option>
                                    <option >Horror</option>
                                    <option >Comedy</option>
                                    <option >Tragedy</option>
                                    <option >Romance</option>
                                    <option >Fantasy</option>
                                    <option >Crime</option>
                                </select>
                                {/* {errors.storyCategory && (<div className="text-danger errortext">{errors.storyCategory}</div>)} */}
                            
                            </div>
                            <div className='mx-5 mt-2'>
                              
                            <Form.Item>
                              
                                <Radio.Group 
                                // onChange={handleOnChange} 
                                name='type'>
                                    <Radio 
                                    // onChange={handleChange}  
                                    value='text' name='type'>Text</Radio><br/>
                                    <Radio 
                                    // onChange={handleChange} 
                                    className='mt-3' value='audio' name='type'>Audio</Radio>  
                                </Radio.Group>
                                {/* {textb.showFileUpload &&  */}
                                <button className='mx-3 writer-story-addaudio-btn'
                                onClick={() =>
                                    document.getElementById("audioUpload").click()
                                    }
                                > upload Audio </button>
                                {/* } */}
                                <input
                                    type='file'
                                    style={{ display: 'none' }}
                                    name='audio'
                                    // onChange={(event)=>{handleFileAudioChange(event.target.files[0])}}
                                    id='audioUpload'
                                />   
                                {/* {erroraudio && (<div className=" mt-2 text-danger errortext">{erroraudio}</div>)} */}

                            </Form.Item>
                            </div>
                            <div className='text-center mt-5'>
                            <FaCamera className='writer-add_story-icon' 
                            onClick={() =>
                            document.getElementById("coverPicture").click()
                            }
                            /> Change Cover Picture   
                            <input
                            type='file'
                            style={{ display: 'none' }}
                            name='coverPicture'
                            // onChange={(event)=>{handleFileCoverChange(event.target.files[0])}}
                            id='coverPicture'
                            
                            /> 
                            {/* {errors.coverPicture && (<div className="text-danger errortext">{errors.coverPicture}</div>)}      */}
                            {/* {errorcover && (<div className="text-danger errortext">{errorcover}</div>)} */}

                        </div>
                            <div className='mt-3 mx-5 writer-story-addpage-summery '>
                                <div class="form-floating">
                                    <textarea class="form-control "  
                                    placeholder="Leave a comment here" 
                                    id="floatingTextarea2" 
                                    style={{height: '120px'}}
                                    name='summary'
                                    // onChange={handleChange}
                                    ></textarea>
                                    <label for="floatingTextarea2">Summary</label>
                                    {/* {errors.summary && (<div className="text-danger errortext">{errors.summary}</div>)} */}
                                    </div>
                            </div>
                            
                        </div>
                        <div className='col '>
                            <img 
                            // src={image} 
                            className='writer-story-addpage-sideimg mt-5' alt='Upload cover Image'></img>
                        </div>
                    </div>
                     
                </div>
            </div>
            <div className='writer-story-addtextarea-div'>
                            {/* {textb.showTextBox &&  */}
                            <textarea className='writer-story-addtextarea' 
                            name='text'
                            // onChange={handleChange}
                            placeholder="Enter your creativity..." />
                            {/* } */}
                    </div> 
        </div>
      </div>
      {/* </form> */}
    </div>
    </>
  )
}

export default WriterStoryEditPage