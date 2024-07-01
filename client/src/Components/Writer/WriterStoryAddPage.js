import React from 'react'
import './Writer.css'
import romance from '../../Assets/Romance.png'
import bg from '../../Assets/bg.png'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
function WriterStoryAddPage() {
  return (
    <div className='mb-5 mt-5'>
      <div className='container mt-5'>
        <div className='writer-story-addpage-maindiv'>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-5 text-center'>
                    <img src={bg} className='writer-story-addpage-profileimg mt-4'></img>
                </div>
                <div className='col-4'>
                    <button className='mt-4 me-5 writer-story-addpage-publishbtn'>Publish</button>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col-3'>
                <div className='writer-story-addpage-secdiv'>
                    <div className='writer-story-addpage-labeldiv text-center mt-2'>
                        <label className='writer-story-addpage-label'>Cover{'  '}
                        <img src={romance} className='writer-story-addpage-img'></img>
                        </label>
                    </div>
                </div>
            </div>
            <div className='col-9 '>
                <div className='writer-story-addpage-secdiv1 container ms-5 ps-5'>
                    <div className='row container pt-2 ps-5'>
                        <div className='col-4 writer-story-addpage-div2 mt-5 pt-4'>
                            <div className='text-center mt-3'>
                                <label className='writer-story-addpage-labeladd'>Add a Title</label>
                            </div>
                            <div className='text-center mt-2'>
                                <DropdownButton id="dropdown" title="Story Category">
                                    <Dropdown.Item >Horror</Dropdown.Item>
                                    <Dropdown.Item >Comedy</Dropdown.Item>
                                    <Dropdown.Item >Tragedy</Dropdown.Item>
                                    <Dropdown.Item >Romance</Dropdown.Item>
                                    <Dropdown.Item >Fantasy</Dropdown.Item>
                                    <Dropdown.Item >Crime</Dropdown.Item>
                                </DropdownButton>
                            
                            </div>
                            
                        </div>
                        <div className='col-8 mt-4 pt-4'>
                            <img src={romance} className='writer-story-addpage-sideimg'></img>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default WriterStoryAddPage
