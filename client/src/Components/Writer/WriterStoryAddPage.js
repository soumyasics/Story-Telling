import React from 'react'
import './Writer.css'
import cover_book from '../../Assets/cover_book.jpg'
import bg from '../../Assets/bg.png'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaCamera } from "react-icons/fa";
import { Form, Radio, Input } from "antd";
import { useState } from 'react';
function WriterStoryAddPage() {
    const draftStory={}

    
      const [textb, setState] =useState({
        showTextBox: false,
        showFileUpload:false
      });
    
      const handleOnChange = e => {
        setState({
          showTextBox: e.target.value === 1,
          showFileUpload:e.target.value ===2
        });
      };

      const [addstorydata,setAddStoryData]=useState();
      
    
  return (
    <div className='mb-5 mt-5'>
      <div className='container mt-5'>
        <div className='writer-story-addpage-navdiv'>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-5 text-center'>
                    <img src={bg} className='writer-story-addpage-profileimg mt-3'></img>
                </div>
                <div className='col-4'>
                    <button className='mt-4 me-5 writer-story-addpage-publishbtn'>Publish</button>
                </div>
            </div>
        </div>
        <div className='row'>
            {/* <div className='col-3'>
                <div className='writer-story-addpage-secdiv'>
                    <div className='writer-story-addpage-labeldiv text-center mt-2'>
                        <label className='writer-story-addpage-label'>Cover{'  '}
                        <img src={romance} className='writer-story-addpage-img'></img>
                        </label>
                    </div>
                </div>
            </div> */}
            <div className='col '>
                <div className='writer-story-addpage-secdiv1  ps-2'>
                    <div className='row container pt-2 ps-5'>
                        <div className='col writer-story-addpage-div2 mt-5 pt-4'>
                            <div className='text-center mt-3'>
                                <input className='writer-story-addpage-addtitle' placeholder='Add a Title'/>
                            </div>
                            <div className='text-center  mt-3'>
                                <select id="dropdown" className='writer-story-addpage-category' title="Story Category">
                                    <option >Story Category</option>
                                    <option >Horror</option>
                                    <option >Comedy</option>
                                    <option >Tragedy</option>
                                    <option >Romance</option>
                                    <option >Fantasy</option>
                                    <option >Crime</option>
                                </select>
                            
                            </div>
                            <div className='mx-5 mt-4'>
                            <Form.Item>
                                <Radio.Group onChange={handleOnChange}>
                                    <Radio  value={1}>Text</Radio><br/>
                                    <Radio className='mt-3' value={2}>Audio</Radio>  
                                </Radio.Group>
                                {textb.showFileUpload && 
                                <button className='mx-3 writer-story-addaudio-btn'
                                onClick={() =>
                                    document.getElementById("audioUpload").click()
                                    }
                                > upload Audio </button>}
                                <input
                                    type='file'
                                    style={{ display: 'none' }}
                                    name='coverPicture'
                                    id='audioUpload'
                                />   
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
                            id='coverPicture'
                            
                            />      
                        </div>
                            <div className='mt-4 mx-5 writer-story-addpage-summery '>
                                <div class="form-floating">
                                    <textarea class="form-control "  placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '120px'}}></textarea>
                                    <label for="floatingTextarea2">Summery</label>
                                    </div>
                            </div>
                            
                        </div>
                        <div className='col '>
                            <img src={cover_book} className='writer-story-addpage-sideimg mt-5'></img>
                        </div>
                    </div>
                     
                </div>
            </div>
            <div className='writer-story-addtextarea-div'>
                            {textb.showTextBox && <textarea className='writer-story-addtextarea' placeholder="Enter your creativity..." />}
                    </div> 
        </div>
      </div>
    </div>
  )
}

export default WriterStoryAddPage
