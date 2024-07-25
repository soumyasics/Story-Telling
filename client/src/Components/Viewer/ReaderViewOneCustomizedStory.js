import React from 'react'
import './Reader.css'
import william from '../../Assets/william.png'
import Horror from '../../Assets/Horror.png'
function ReaderViewOneCustomizedStory() {
  return (
    <div className='mb-5'>
        <div className='readerview-one-customised-story-back'>
          <div className='container'>
            <div className='readerview-one-customised-story-navdiv mt-5 mb-5'>
              <img src={william} className='readerview-one-customised-story-img mt-3 ms-5'/>
              <span className='ms-3 mt-5 readerview-one-customised-story-span'>William</span>
            </div>
            <div className='readerview-one-customised-story-maindiv mb-5'>
              <div className='container'>
                <div className='text-center pt-3'>
                  <img src={Horror} className='readerview-one-customised-story-img1 pt-5'></img>
                </div>
              </div>
              <div className='text-center mb-5'>
                <div  className='readerview-one-customised-story-maindiv1'>
                  <div className='row'>
                    <div className='col-7'>
                      <div className='pt-3'>
                        <h3>The Mystery Kingdom(Fantasy Story)</h3>
                      </div>
                      <div className='readerview-one-customised-story-para '>
                        <p className='ms-5'>Andrew is chosen by God and is called out of his mischievous
                           childhood to partake in the kingdom of God. Andrew must go 
                           through trials, tests, and spiritual warfare, before the mystery 
                           of the kingdom of God is finally revealed to him.</p>
                      </div>
                      <div className=''>
                        <h3>Branches</h3>
                        <div className='readerview-one-customised-story-branches ms-5 mt-3'>
                          <div className='row'>
                            <div className='col-3'>
                              <img src={Horror} className='readerview-one-customised-story-branches-img ms-1 mt-1' />
                            </div>
                            <div className='col-9'>
                              <div className='mt-2'>
                                <h6>Branch 1</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-5 mt-5 pt-2'>
                      <div>
                        <h3 className='readerview-one-customised-story-branches-h3'>Co Creators</h3>
                      </div>
                      <div className='readerview-one-customised-story-branches-co ms-5 mt-5'>
                        <div className='row'>
                          <div className='col-3'>
                            <img className='readerview-one-customised-story-img ms-3 mt-2' src={william}></img>
                          </div>
                          <div className='col-9'>
                            <div>
                              <b className='text-light'>William</b>
                            </div>
                            <div>
                              <b>william@gmail.com</b>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default ReaderViewOneCustomizedStory
