import React from 'react'
import AdminSidebar from '../Pages/AdminSidebar'
import trop from '../../Assets/trop.png'
import william from '../../Assets/william.png'
function ViewChallengeSummary() {
  return (
    <div className='row'>
        <div className='col-3'>
            <AdminSidebar/>
        </div>
        <div className='col-9'>
            <div className='mt-5 pt-3'>
                <h1>Announce Challenge Summary</h1>
            </div>
            <div className='row mt-5'>
                <div className='col-2'></div>
                <div className='col-2 view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>1st<img src={trop} className='view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='view-challenge-summary-img'></img>
                        <span className='ms-2 view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-2 ms-3 view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>2nd<img src={trop} className='view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='view-challenge-summary-img'></img>
                        <span className='ms-2 view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-2 ms-3 view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>3rd<img src={trop} className='view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='view-challenge-summary-img'></img>
                        <span className='ms-2 view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
            </div>
            <div className='row mt-5 pt-3'>
                <div className='col-3'></div>
                <div className='col-2 ms-5  view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>4th<img src={trop} className='view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='view-challenge-summary-img'></img>
                        <span className='ms-2 view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
                <div className='col-1'></div>
                <div className='col-2 ms-3 view-challenge-summary-divbox'>
                    <h2 className='text-center mt-2'>5th<img src={trop} className='view-challenge-summary-img'></img></h2>
                    <div className='text-center'>
                        <img src={william}  className='view-challenge-summary-img'></img>
                        <span className='ms-2 view-challenge-summary-name'>William</span>
                    </div>
                    <div className='text-center mt-2 pt-1'>
                        <h6>Points : 97/100</h6>
                    </div>
                </div>
                <div className='col-3'></div>
            </div>
        </div>
    </div>
  )
}

export default ViewChallengeSummary
