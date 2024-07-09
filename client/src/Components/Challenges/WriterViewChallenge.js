import React, { useState, useEffect } from 'react';
import './Challenges.css';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import { useParams } from 'react-router-dom';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';
import { Link } from 'react-router-dom';

function WriterViewChallenge() {
    const [id, setId]= useState(localStorage.getItem("writer"));
  const { challengeid } = useParams();
  const writerId = localStorage.getItem("writerId");

  const [data, setData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    picture: '',
  });
 
  useEffect(() => {
    axiosInstance.post(`viewChallengeById/${challengeid}`)
      .then((res) => {
        console.log("Challenge data:", res.data.data); 
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [challengeid]);

  const [writerData , setWriterData]=useState({profilePicture:{filename:''}});


  useEffect(()=>{
    axiosInstance.post(`/viewWriterById/${id}`)
    .then((res)=>{
        console.log(res,"res");
        setWriterData(res.data.data)
        console.log(writerData,"writerdata");
    })
    .catch((err)=>{
      alert("Failed to fetch user details")
  });
  },[])

  return (
    <>
      <section className='container mt-5'>
        <div className='writer-addchallenge-navdiv'>
          <div className='row'>
            <div className='col-3 text-center'>
              <img src={`${imageUrl}/${writerData.profilePicture?.filename}`} className='writer-addchallenge-profileimg mt-3' alt="Writer Profile" />
            </div>
          </div>
        </div>
        <div className='writer-addchallenge-maindiv mb-5'>
          <div className='row'>
            <div className='col p-4 mx-5'>
              <img src={`${imageUrl}/${data.picture?.filename}`} className='writer-viewchallenge-picture' alt="Challenge" />
            </div>
            <div className='col mt-5'>
              <form>
                <div className="row mb-4">
                  <label for="challengeTitle" className="col-sm-4 col-form-label writer-viewchallenge-label">Challenge Title :</label>
                  <div className="col-sm-7">
                    <p className='writer-viewchallenge-p'>{data.title}</p>
                  </div>
                </div>

                <div className="row mb-4">
                  <label for="challengeDescription" className="col-sm-4 col-form-label writer-viewchallenge-label">Challenge Description :</label>
                  <div className="col-sm-7">
                    <p className='writer-viewchallenge-p'>{data.description}</p>
                  </div>
                </div>

                <div className="row mb-4">
                  <label for="challengeStartDate" className="col-sm-4 col-form-label writer-viewchallenge-label">Challenge Start Date :</label>
                  <div className="col-sm-7">
                    <p className='writer-viewchallenge-p'>{data.startDate}</p>
                  </div>
                </div>

                <div className="row mb-4">
                  <label for="challengeEndDate" className="col-sm-4 col-form-label writer-viewchallenge-label">Challenge End Date :</label>
                  <div className="col-sm-7">
                    <p className='writer-viewchallenge-p'>{data.endDate}</p>
                  </div>
                </div>

                <Link to='/writer-edit-challenges'>
                  <button type='button' className='writer-viewchallenge-btn'>Edit</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WriterViewChallenge;
