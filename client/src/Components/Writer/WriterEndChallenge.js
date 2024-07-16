import React from 'react'
import { Link } from 'react-router-dom'
import image1 from '../../Assets/image1.png'
import image2 from '../../Assets/image2.png'
function WriterEndChallenge() {
  return (
    <div className='mb-5'>
      <div className='text-center mt-5'>
        <h4>Ended Challenges</h4>
      </div>
      <div className='row mt-5'>
        <div className='col-2'></div>
        <div className='col-4 writerview-challenges-imgdiv'>
          <div>
          <img src={image1} className='writerview-challenges-img'></img>
            <Link to='/writer-viewsummary-challenge'>
              <button className='writerview-challenges-participatebtn ms-4'>View Winners</button>
            </Link>
          </div>
            
        </div>
        <div className='col-4'>
          <div className='writerview-challenges-img1'>
            <div className='text-center pt-2'>
              <h3>The Star of July</h3>
              <div className='writerview-challenges-p ms-3 me-3'>
                <p>Task yourself with writing something that forms a complete whole every day. 
                It might be only be a couple of hundred words long – or even less – but the 
                challenge here is to create something regularly that stands on its own.</p>
              </div>
              <div className='text-end'>
                <h2 className='writerview-challenges-h2 me-5'>Start On July 19 2024 and End on 11 Aug 2024</h2>
              </div>
            </div>
          </div>
        </div>
        
        <div className='col-2'></div>
      </div>
      <div className='row mt-5 '>
        <div className='col-2'></div>
        <div className='col-4 writerview-challenges-imgdiv1'>
            <h3 className='text-center pt-3'>The Star of July</h3>
              <div className='writerview-challenges-p ms-3 me-3'>
                <p>Task yourself with writing something that forms a complete whole every day. 
                It might be only be a couple of hundred words long – or even less – but the 
                challenge here is to create something regularly that stands on its own.</p>
              </div>
              
        </div>
        <div className='col-4'>
          <img src={image2} className='writerview-challenges-2img'></img>
          <div className='text-end'>
            <h2 className='writerview-challenges-h2nd me-5'>Start On July 19 2024 and End on 11 Aug 2024</h2>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
    </div>
  )
}

export default WriterEndChallenge
