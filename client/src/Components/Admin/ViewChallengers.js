import React from 'react'
import AdminSidebar from '../Pages/AdminSidebar'
import '../Pages/AdminLogin.css'
import { Link } from 'react-router-dom'
function ViewChallengers() {
  return (
    <div className='row'>
        <div className='col-3'>
            <AdminSidebar/>
        </div>
        <div className='col-9'>
            <h1 className='mt-5'>View Challengers</h1>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 view-challengers-title mt-3'>
                    <div className='row ms-5 pt-4'>
                        <div className='col-3'>Title</div>
                        <div className='col-1'>:</div>
                        <div className='col-8'>Truth or Dare</div>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 view-challengers-title mt-3'>
                    <div className='row ms-5 pt-4'>
                        <div className='col-3'>Challenge End Date</div>
                        <div className='col-1'>:</div>
                        <div className='col-8'>23/06/2024</div>
                    </div>  
                </div>
                <div className='col-2'></div>
            </div>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 view-challengers-description mt-3'>
                    <div className='row ms-5 pt-4 me-3'>
                        <div className='col-3'>Description</div>
                        <div className='col-1'>:</div>
                        <div className='col-8 view-challengers-description-div'>
                            Get friends to share secrets and take on dares in this 
                            classic game. Truth or Dare is a tried-and-true party 
                            game—but it’s popular for a reason! To Play a Truth or 
                            Dare decide who will go first. That person must choose 
                            a “truth” or a “dare.” If they pick truth, ask them a 
                            question they must answer truthfully. If they choose dare, 
                            challenge them to do something funny or bold. Go around 
                            the group to give everyone a chance to play.
                        </div>
                        <div className='mt-5 pt-4 text-end'>
                            <Link to='/admindashviewchallengesTitle'>
                                <button className='view-challengers-view-btn'>
                                    View More
                                </button>
                            </Link>
                        </div>
                    </div> 
                </div>
                <div className='col-2'></div>
            </div>
        </div>
    </div>
  )
}

export default ViewChallengers
