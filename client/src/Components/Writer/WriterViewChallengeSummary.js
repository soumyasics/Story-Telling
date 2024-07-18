import React from 'react'
import trop from '../../Assets/trop.png'
import william from '../../Assets/william.png'
function WriterViewChallengeSummary() {
  return (
    <div className='row mb-5'>
        <div className='col-2'></div>
        <div className='col-8'>
        <div className='mt-5 pt-3'>
                <h2 className='text-center'> Challenge Summary</h2>
            </div>
            <div className='row mt-5'>
                <div className='col-2'></div>
                <div className='col-2 writer-view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>1st<img src={trop} className='writer-view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='writer-view-challenge-summary-img'></img>
                        <span className='ms-2 writer-view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-2 ms-3 writer-view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>2nd<img src={trop} className='writer-view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='writer-view-challenge-summary-img'></img>
                        <span className='ms-2 writer-view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-2 ms-3 writer-view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>3rd<img src={trop} className='writer-view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='writer-view-challenge-summary-img'></img>
                        <span className='ms-2 writer-view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
            </div>
            <div className='row mt-5 pt-3'>
                <div className='col-3'></div>
                <div className='col-2 ms-5  writer-view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>4th<img src={trop} className='writer-view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='writer-view-challenge-summary-img'></img>
                        <span className='ms-2 writer-view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-2 ms-3 writer-view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>5th<img src={trop} className='writer-view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='writer-view-challenge-summary-img'></img>
                        <span className='ms-2 writer-view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
                <div className='col-3'></div>
            </div>
        </div>
        <div className='col-2'></div>
    </div>
  )
}

export default WriterViewChallengeSummary
