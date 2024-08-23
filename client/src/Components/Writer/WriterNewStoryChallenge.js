import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';

function WriterNewStoryChallenge() {
  const [writerdata, setWriterData] = useState([]);
  const [participatedChallenges, setParticipatedChallenges] = useState(new Set());
  const writerId = localStorage.getItem("writer");

  useEffect(() => {
    axiosInstance
      .post('/viewActiveChallenges')
      .then((res) => {
        var writerdata = res.data.data;
        var fd = [];
        axiosInstance
          .post(`/viewChallengeByWriter/${writerId}`)
          .then((res) => {
            console.log(res,'ppppp')
            var t = [];
            var wd = [];
            for (var i in res.data.data) {
              var d = res.data.data[i];
              t.push(d.challengeId._id);
            }

            for (var j in writerdata) {
              wd = writerdata[j];
              if (!t.includes(wd._id)) {
                fd.push(wd);
              }
            }

            // Sort challenges by createdAt date in descending order
            // fd.sort((b,a) => (b.createdAt) - new Date(a.createdAt));
            fd.sort((b, a) => new Date(a.startDate) - new Date(b.startDate));

            console.log(fd,"datas");
            setWriterData(fd);
          })
          .catch((err) => {
            // alert("Failed to fetch user details");
          });
      })
      .catch((err) => {
        // alert('Failed to fetch user details');
      });
  }, []);

  console.log(writerdata, "l");

  const navigate = useNavigate();

  // const handleParticipate = (id) => {
  //   navigate("/writer-participate-challenge/" + id);
  //   setParticipatedChallenges((prevSet) => new Set(prevSet).add(id));
  // };

  const handleParticipate = (id) => {
    axiosInstance.post("/addParticipants",{
      challengeId:id,
      readerId:null,
      writerId:localStorage.getItem("writer")
    })
    .then((res)=>{
      console.log(res.data.data);
      alert(res.data.msg)
      navigate("/writer-view-challenge");
      setParticipatedChallenges((prevSet) => new Set(prevSet).add());
    })
    
  };

  return (
    <div className='mb-5' style={{ minHeight: "100vh" }}>
      <div className='text-center mt-5'>
        <h4>New Challenge</h4>
      </div>
      <div className='mt-3 text-end me-5 pe-5 w-100'>
        <Link to='/writer-end-challenge'>
          <button className='writerview-challenges-endedbtn w-25'>Completed Challenges</button>
        </Link>
      </div>
      {writerdata
        .filter((challenge) => !participatedChallenges.has(challenge._id))
        .map((challenge, index) => (
          <div className='row mt-5' key={index}>
            <div className='col-2'></div>
            <div className='col-4 writerview-challenges-imgdiv'>
              <div>
                <img
                  src={`${imageUrl}/${challenge.picture?.filename}`}
                  className='writerview-challenges-img'
                  alt='Challenge'
                />
                <div onClick={() => handleParticipate(challenge._id)}>
                  <button className='writerview-challenges-participatebtn ms-4 mt-5'>
                    Participate
                  </button>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='writerview-challenges-img1'>
                <div className='text-center pt-2'>
                  <h3>{challenge.title}</h3>
                  <div className='writerview-challenges-p ms-3 me-3'>
                    <p>{challenge.description}</p>
                  </div>
                  <div className='text-end'>
                    <h2 className='writerview-challenges-h2 me-5'>
                      Started From : {new Date(challenge.startDate).toLocaleDateString()} - To : {new Date(challenge.endDate).toLocaleDateString()}
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

export default WriterNewStoryChallenge;
