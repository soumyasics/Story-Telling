import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import image1 from '../../Assets/image1.png'
import image2 from '../../Assets/image2.png'
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';

function WriterPublishedStoryChallenge() {

  const [writerdata, setWriterData] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    axiosInstance
      .post('/viewActiveChallenges')
      .then((res) => {
        var temp = [];
        for (var i in res.data.data) {
          var d = res.data.data[i]
          if (d.writerId._id == localStorage.getItem('writer')){
            temp.push(d);
          }
        }
        console.log(res.data.data);
        setWriterData(temp);
      })
      .catch((err) => {
        alert('Failed to fetch user details');
      });
  }, []);

  const handleparticipate=()=>{
    navigate("/readerviewparticipatedchallenges")
  }

  return (
    <div className='mb-5'>
      <div className='text-center mt-5'>
        <h4>New Challenge</h4>
      </div>
      <div className='mt-3 text-end me-5 pe-5'>
        <Link to='/writer-end-challenge'>
          <button className='writerview-challenges-endedbtn'>Ended Challenge</button>
        </Link>
      </div>
      {writerdata.map((challenge, index) => (
        <div className='row mt-5' key={index}>
          <div className='col-2'></div>
          <div className='col-4 writerview-challenges-imgdiv'>
            <div>
              <img src={`${imageUrl}/${challenge.picture?.filename}`} className='writerview-challenges-img' alt='Challenge' />
            </div>
          </div>
          <div className='col-4'>
            <div className='writerview-challenges-img1'>
              <div className='text-center pt-2'>
                <h3>{challenge.title}</h3>
                <div className='writerview-challenges-p ms-3 me-3'>
                  <p>{challenge.description}</p>
                </div>
                <div className='text-end'>
                  <h2 className='writerview-challenges-h2 me-5'>
                    Start On {new Date(challenge.startDate).toLocaleDateString()} and End on {new Date(challenge.endDate).toLocaleDateString()}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className='col-2'></div>
        </div>
      ))}
    </div>                                                                         
  )
}

export default WriterPublishedStoryChallenge
