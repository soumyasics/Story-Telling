import React, { useEffect, useState } from 'react'
import './Challenges.css';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';


function ReaderViewChallenges() {
  const [Data,setData]=useState([]);
    useEffect(()=>{
      axiosInstance.post(`viewChallenges`)
      .then((res)=>{
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });


    },[]);
    console.log(Data);
  

  return (
    <div className='reader-view-main'>
      <h2 className='reader-viewchallenge-h2'>Challenges</h2>
      
      <div class="container ">
          <div className='col-7 reader-view-challengecard'>
          {Data.map((a)=>{
            return(
            <div className='row'>
               
              <div class="col-5 ">
              <img src={`${imageUrl}/${a.picture?.filename}`} className='reader-view-img' alt="..."/>
              <div>
                <button className='reader-view-challenge-btn' type='submit'>Participate</button>
              </div>
              </div>
              <div class="col-6 ">
                <h3 className='reader-view-challenge-h3'>{a.title}</h3>
               <p className='reader-view-challenege-p'>{a.description}</p>
              </div>
              <p className='reader-view-challengedate'>tart on {a.startDate} and End on {a.endDate}</p>
            </div>
            
          )
              })}
          </div>
         
        </div>

  
 </div>
    
  )
}

export default ReaderViewChallenges