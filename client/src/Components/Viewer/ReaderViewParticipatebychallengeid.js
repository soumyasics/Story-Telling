import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import image1 from '../../Assets/image1.png';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';

function ReaderViewParticipatebychallengeid() {

  const [writerdata, setWriterData] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [challengeId, setChallengeId] = useState(null);
  const [challe, setChalle] = useState({
    description:'',
    title:'',
    picture:{filename:''}
      });
  const navigate = useNavigate();

  const readerId = localStorage.getItem("reader");

  const {challengeid}=useParams()
  console.log(challengeid);

  useEffect(() => {
    axiosInstance
      .post(`/viewChallengeById/${challengeid}`)
      .then((res) => {
     
       console.log("res",res);
       
            setChalle(res.data.data);
          })
          .catch((err) => {
            alert('Challenge Not Found')
          });
     
  }, []);
  const handleDailyUpdateSubmit = () => {
    if (!status) {
      setError('Status is required');
      return;
    }

    const data = {
      status,
      readerId,
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
          navigate('/reader-challenge-history/'+challengeid);
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
          <img src={`${imageUrl}/${challe.picture?.filename}`} className='writer-participate-challenge-img' alt='Challenge' />
        </div> 
        <div className='col-5 writer-participate-challenge-divcol-5'>
          <h2 className='text-center pt-4'>{challe.title}</h2>
          <div className='ps-5 pe-5 pt-3 '>
            <p className='writer-participate-challenge-para'>
              {challe.description}.
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
              <Link to={`/reader-challenge-history/${challengeid}`}>
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
