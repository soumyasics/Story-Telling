import React from 'react'
import AdminSidebar from '../Pages/AdminSidebar'
import { Link } from 'react-router-dom'

function ViewChallengersTitle() {
  return (
    <div className='row'>
        <div className='col-3'>
            <AdminSidebar/>
        </div>
        <div className='col-9 container'>
            <h1 className='mt-5'>Truth Or Dare Challenge</h1>
            <label>(15 Jun 2024 to 15 july 2024)</label>
            <div className='row mt-4 view-challenges-title-back ps-5 pt-3'>
                <div className='col-3'>
                    <h6>Date</h6>
                </div>
                <div className='col-3'>
                    <h6>Participants</h6>
                </div>
                <div className='col-3'>
                    <h6> User Category</h6>
                </div>
                <div className='col-3'>
                    <h6>Daily Status</h6>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-3 view-challenges-date-back text-center pt-5'>
                    <h6 className='mt-5'>15-06-2024</h6>
                </div>
                <div className='col-9'>
                    <div className='row view-challenges-name-back container pt-2 pe-5 '>
                        <div className='col-4'>
                            <h6>@Arjun</h6>
                        </div>
                        <div className='col-4'>
                            <h6>Reader</h6>
                        </div>
                        <div className='col-4'>
                            <h6>Read 5 Page</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-3 view-challenges-date-back text-center pt-5'>
                    <h6 className='mt-5'>16-06-2024</h6>
                </div>
                <div className='col-9'>
                    <div className='row view-challenges-name-back container pt-2 pe-5 '>
                        <div className='col-4'>
                            <h6>@Arjun</h6>
                        </div>
                        <div className='col-4'>
                            <h6>Reader</h6>
                        </div>
                        <div className='col-4'>
                            <h6>Read 5 Page</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4 text-end me-5'>
                <Link to='/announcechallengesummary'>
                    <button className='view-challenders-title-announcebtn'>Announce Winner</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ViewChallengersTitle
