import React from 'react'
import image1 from '../../Assets/image1.png'
import { Link } from 'react-router-dom'
function WriterParticipatechallenge() {
  return (
    <div className='mb-5 mt-5'>
        <div className='text-center pt-2'>
            <h3>Participate Challenge</h3>
        </div>
        <div className='row mt-5'>
            <div className='col-1'></div>
            <div className='col-5'>
                <img src={image1} className='writer-participate-challenge-img'/>
            </div>
            <div className='col-5 writer-participate-challenge-divcol-5'>
                <h2 className='text-center pt-4'>The Star of July</h2>
                <div className='ps-5 pe-5 pt-3 '>
                    <p className='writer-participate-challenge-para'>
                    Task yourself with writing something that forms a complete
                    whole every day. It might be only be a couple of hundred 
                    words long – or even less – but the challenge here is 
                    to create something regularly that stands on its own.
                    </p>
                    <div className='row pt-3'>
                        <div className='col-4'>
                            <label>Date</label>
                        </div>
                        <div className='col-8'>
                            <input type='text' className='writer-participate-challenge-text'></input>
                        </div>
                    </div>
                    <div className='row pt-5'>
                        <div className='col-4'>
                            <label>Update the daily status</label>
                        </div>
                        <div className='col-8'>
                            <input type='text' className='writer-participate-challenge-textbox'></input>
                        </div>
                    </div>
                    <div className='mt-5 text-center'>
                        <button className='writer-participate-challenge-submitbtn'>Submit</button>
                        <Link to='/writer-challenge-history'>
                            <button className='ms-5 writer-participate-challenge-submitbtn'>History</button>
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className='col-1'></div>
        </div>
    </div>
  )
}

export default WriterParticipatechallenge
