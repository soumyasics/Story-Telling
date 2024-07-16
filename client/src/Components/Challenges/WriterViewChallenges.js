import React, { useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import './Challenges.css'
import img from '../../Assets/img2.jpg'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';
import axiosMultipartInstance from '../../BaseAPIs/AxiosMultipartInstance';

function WriterViewChallenges() {

    const [id, setId]= useState(localStorage.getItem("writer"));
    const [writerdata , setWriterData]=useState({profilePicture:{filename:''}});


    const [challengedata , setChallengeData] =useState({
        title:'',
        description:'',
        startDate:'',
        endDate:'',
        writerId:id,
        picture: ''
    });

    const {challengeid}=useParams()
    console.log(challengeid,"cha_id");
    const [imgFile, setImgFile] = useState("");

    useEffect(() => {
        if (challengedata.picture?.filename) {
          setImgFile(`${imageUrl}/${challengedata.picture.filename}`);
        }
      }, [challengedata.picture]);

    useEffect(() => {
        axiosMultipartInstance.post(`/viewChallengeById/${challengeid}`)
        .then((res) => {
            console.log(res,'res');
            setWriterData(res.data.data)
            console.log(writerdata,'writerdata');
        })
        .catch((err) => {
            alert("Failed to fetch user details")
            console.log(err);
        })
    },[])
  return (
    <>
        <section className='container mt-5'>
        <div className='writer-addchallenge-navdiv'>
            <div className='row'>
                <div className='col-3  text-center'>
                    <img src={`${imageUrl}/${writerdata.profilePicture?.filename}`}  className='writer-addchallenge-profileimg mt-3 '></img>
                </div>
            </div>
        </div>
        <div className='writer-addchallenge-maindiv mb-5'>
            <div className='row'>
                <div className='col p-4 mx-5'>
                    <img src={imgFile} className='writer-editchallenge-picture'/>
                </div>
                
                
                <div className='col mt-5'>
                    <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Challenge Title</label>
                        <div class="col-sm-7">
                            <input type="text" 
                            style={{height: '60px',border:'none',borderRadius:'0px'}} 
                            name='title'
                            value={challengedata.title}
                            placeholder={challengedata.title} disabled
                            
                            class="form-control" id="inputEmail3"/>
                            
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-4 col-form-label">Challenge Description</label>
                        <div class="col-sm-7">
                            <textarea type="text" 
                            name='description'
                            value={challengedata.description}
                            placeholder={challengedata.description} disabled
                            style={{height: '200px',border:'none',borderRadius:'0px'}} class="form-control" id="inputPassword3"/>
                            
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Challenge Start Date</label>
                        <div class="col-sm-7">
                            <input type="date" 
                            name='startDate'
                            value={challengedata.startDate}
                            placeholder={challengedata.startDate} disabled
                            style={{height: '60px',border:'none',borderRadius:'0px'}} class="form-control" id="inputEmail3"/>
                            
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Challenge End Date</label>
                        <div class="col-sm-7">
                            <input type="date" 
                            name='endDate'
                            value={challengedata.endDate}
                            placeholder={challengedata.endDate} disabled
                            // onChange={handleChange}
                            style={{height: '60px',border:'none',borderRadius:'0px'}} class="form-control" id="inputEmail3"/>
                            
                        </div>
                    </div>
                    <div className='writer-addchallenge-btn-div'>
                        <Link to='/writer-edit-challenges'>
                            <button className='writer-addchallenge-btn' >Edit Challenge</button>
                        </Link>

                    </div>
                    </form>
                </div>
                
            </div>

        </div>
        </section>
    </>
  )
}

export default WriterViewChallenges
