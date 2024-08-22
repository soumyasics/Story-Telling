import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';

function ReaderViewParticipatedChallenge() {
  const [writerdata, setWriterData] = useState([]);
  const navigate = useNavigate();
  
  const readerid = localStorage.getItem("reader");
  
  useEffect(() => {
    axiosInstance
      .post(`/viewChallengeByreader/${readerid}`)
      .then((res) => {
        console.log(res.data.data);
        setWriterData(res.data.data);
      })
      .catch((err) => {
        // alert("Failed to fetch user details");
      });
  }, [readerid]);
  
  const handleParticipate = (challengeId) => {
    navigate(`/reader-participate-challenge/${challengeId}`);
  };

  return (
    <div className='mb-5' style={{ minHeight: "100vh" }}>
      <div className='text-center mt-5'>
        <h4>My Challenge</h4>
      </div>
      <div className='mt-3 text-end me-5 pe-5 w-100'>
        <Link to='/reader-end-challenge'>
          <button className='writerview-challenges-endedbtn w-25'>Completed Challenge</button>
        </Link>
      </div>
      {writerdata.map((challenge, index) => (
        <div className='row mt-5' key={index}>
          <div className='col-2'></div>
          <div className='col-4 writerview-challenges-imgdiv'>
            <div>
              <img
                src={`${imageUrl}/${challenge.challengeId.picture?.filename}`}
                className='writerview-challenges-img'
                alt='Challenge'
              />
              <button
                onClick={() => handleParticipate(challenge.challengeId._id)}
                className='writerview-challenges-participatebtn ms-4 mt-3'
              >
                Update Status
              </button>
            </div>
          </div>
          <div className='col-6'>
            <div className='writerview-challenges-img1'>
              <div className='text-center pt-2'>
                <h3>{challenge.challengeId.title}</h3>
                <div className='writerview-challenges-p ms-3 me-3'>
                  <p>{challenge.challengeId.description}</p>
                </div>
                <div className='text-end'>
                  <h2 className='writerview-challenges-h2 me-5'>
                    Start On {new Date(challenge.challengeId.startDate).toLocaleDateString()} and End on {new Date(challenge.challengeId.endDate).toLocaleDateString()}
                  </h2>
                </div>
              </div>
            </div>
          </div>
       
        </div>
      ))}
    </div>
  );
}

export default ReaderViewParticipatedChallenge;
