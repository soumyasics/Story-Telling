import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import image1 from '../../Assets/image1.png';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';

function ReaderViewParticipatebychallengeid() {

  const [writerdata, setWriterData] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const writerId = localStorage.getItem("writer");

  const {challengeid}=useParams()
  console.log(challengeid);

  const handleDailyUpdateSubmit = () => {
    if (!status) {
      setError('Status is required');
      return;
    }

    const data = {
      status,
      writerId,
      challengeId:challengeid,
    };

    axiosInstance
      .post('/addchallengeUpdates', data)
      .then((res) => {
        if (res.data.status === 400) {
          alert(res.data.msg);
        } else {
          alert('Update submitted successfully');
          setStatus('');
        }
      })
      .catch((err) => {
        alert('Failed to submit update');
      });
  };

  return (
    <div className='mb-5 mt-5'>
      <div className='text-center pt-2'>
        <h3>Participate Challenge</h3>
      </div>
      <div className='row mt-5'>
        <div className='col-1'></div>
        <div className='col-5'>
          <img src={image1} className='writer-participate-challenge-img' alt='Challenge' />
        </div>
        <div className='col-5 writer-participate-challenge-divcol-5'>
          <h2 className='text-center pt-4'>The Star of July</h2>
          <div className='ps-5 pe-5 pt-3 '>
            <p className='writer-participate-challenge-para'>
              Task yourself with writing something that forms a complete
              whole every day. It might be only be a couple of hundred
              words long – or even less – but the challenge here is
              to create something regularly that stands on its own.
            </p>
            <div className='row pt-3'>
              <div className='col-4'>
                <label>Date</label>
              </div>
              <div className='col-8'>
                <input type='text' className='writer-participate-challenge-text' value={new Date().toLocaleDateString()} readOnly />
              </div>
            </div>
            <div className='row pt-5'>
              <div className='col-4'>
                <label>Update the daily status</label>
              </div>
              <div className='col-8'>
                <input
                  type='text'
                  className='writer-participate-challenge-textbox'
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setError('');
                  }}
                />
                {error && <div className='text-danger'>{error}</div>}
              </div>
            </div>
            <div className='mt-5 text-center'>
              <button className='writer-participate-challenge-submitbtn' onClick={handleDailyUpdateSubmit}>Submit</button>
              <Link to={`/writer-challenge-history/${challengeid}`}>
                <button className='ms-5 writer-participate-challenge-submitbtn'>History</button>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-1'></div>
      </div>
    </div>
  );
}

export default ReaderViewParticipatebychallengeid;
