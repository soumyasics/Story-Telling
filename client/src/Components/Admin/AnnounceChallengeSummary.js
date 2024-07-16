import React from 'react'
import AdminSidebar from '../Pages/AdminSidebar'

function AnnounceChallengeSummary() {
  return (
    <div className='row mb-5'>
        <div className='col-3'>
            <AdminSidebar/>
        </div>
        <div className='col-9'>
            <h1 className='mt-5'>Announce Challenge Summary</h1>
            <div className=' row  container'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <div className='row announce-summary-challenge-grid mt-5 ms-2'>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>Position</h6>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>Participate Name</h6>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>Points Archieved</h6>
                        </div>
                    </div>
                </div>
                <div className='col-1'></div>
            </div>
            <div className=' row  container'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <div className='row announce-summary-challenge-grid1 mt-5 ms-2'>
                        <div className='col-4 pt-2 ps-5'>
                            <h3>1st</h3>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>William</h6>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>97/100</h6>
                        </div>
                    </div>
                </div>
                <div className='col-1'></div>
            </div>
            <div className=' row  container'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <div className='row announce-summary-challenge-grid1 mt-5 ms-2'>
                        <div className='col-4 pt-2 ps-5'>
                            <h3>2nd</h3>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>William</h6>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>97/100</h6>
                        </div>
                    </div>
                </div>
                <div className='col-1'></div>
            </div>
            <div className=' row  container'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <div className='row announce-summary-challenge-grid1 mt-5 ms-2'>
                        <div className='col-4 pt-2 ps-5'>
                            <h3>3rd</h3>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>William</h6>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>97/100</h6>
                        </div>
                    </div>
                </div>
                <div className='col-1'></div>
            </div>
            <div className=' row  container'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <div className='row announce-summary-challenge-grid1 mt-5 ms-2'>
                        <div className='col-4 pt-2 ps-5'>
                            <h3>4th</h3>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>William</h6>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>97/100</h6>
                        </div>
                    </div>
                </div>
                <div className='col-1'></div>
            </div>
            <div className=' row  container'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <div className='row announce-summary-challenge-grid1 mt-5 ms-2'>
                        <div className='col-4 pt-2 ps-5'>
                            <h3>5th</h3>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>William</h6>
                        </div>
                        <div className='col-4 pt-3 ps-5'>
                            <h6>97/100</h6>
                        </div>
                    </div>
                </div>
                <div className='col-1'></div>
            </div>
            <div className='mt-5 text-end me-5 pe-5'>
                <button className='announce-summary-challenge-savebtn'>Save</button>
            </div>
        </div>
    </div>
  )
}

export default AnnounceChallengeSummary
