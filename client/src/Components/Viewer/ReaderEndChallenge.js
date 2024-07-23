import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../../Assets/image1.png';
import image2 from '../../Assets/image2.png';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';

function ReaderEndChallenge() {
  const [writerdata, setWriterData] = useState([]);
  const navigate = useNavigate();
  const writerid = localStorage.getItem("writer");

  useEffect(() => {
    axiosInstance
      .post(`/viewPreviousChallenges`)
      .then((res) => {
        console.log(res.data.data);
        setWriterData(res.data.data);
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, [writerid]);

  return (
    <div className='mb-5'>
      <div className='text-center mt-5'>
        <h4>Ended Challenges</h4>
      </div>
      <div className='container mt-5'>
        {writerdata.length > 0 ? (
          writerdata.map((challenge, index) => (
            <div className='row mt-5' key={index}>
              <div className='col-2'></div>
              <div className='col-4 writerview-challenges-imgdiv'>
                <div>
                  <img src={index % 2 === 0 ? image1 : image2} className='writerview-challenges-img' alt='Challenge' />
                  <Link to={`/writer-viewsummary-challenge/${challenge._id}`}>
                    <button className='writerview-challenges-participatebtn ms-4'>View Winners</button>
                  </Link>
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
          ))
        ) : (
          <div className='text-center mt-5'>
            <h5>No ended challenges here</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReaderEndChallenge;
