import React from 'react'
import { Link } from 'react-router-dom'

function WriterChallengeHistory() {
  return (
    <div className='row mb-5'>
        <div className='col-2'></div>
        <div className='col-8'>
            <h2 className='mt-5 text-center'>Challenge History</h2>
            
            <div className='row mt-5 writer-challenges-history-title-back ps-5 pt-3'>
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
                <div className='col-3 writer-challenges-history-date-back text-center pt-5'>
                    <h6 className='mt-5'>15-06-2024</h6>
                </div>
                <div className='col-9'>
                    <div className='row writer-challenges-history-name-back container pt-2 pe-5 '>
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
                <div className='col-3 writer-challenges-history-date-back text-center pt-5'>
                    <h6 className='mt-5'>16-06-2024</h6>
                </div>
                <div className='col-9'>
                    <div className='row writer-challenges-history-name-back container pt-2 pe-5 '>
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
        </div>
        <div className='col-2'></div>
    </div>
  )
}

export default WriterChallengeHistory
