import React,{ useState, useEffect} from 'react'
import './Challenges.css'
import {useNavigate,useParams} from 'react-router-dom'
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import axiosMultipartInstance from '../../BaseAPIs/AxiosMultipartInstance';
import { FaCamera } from "react-icons/fa";
import moment from 'react-moment';

function WriterEditChallenges() {
    const navigate=useNavigate();

    const [id, setId]= useState(localStorage.getItem("writer"));

  useEffect(()=>{
    if(localStorage.getItem("token")== null && localStorage.getItem("writer") == null ){
      navigate("/");
    }
  },[navigate]);
    
  const [writerdata , setWriterData]=useState({profilePicture:{filename:''}});

  useEffect(()=>{
    axiosInstance.post(`/viewWriterById/${id}`)
    .then((res)=>{
        console.log(res,"res");
        setWriterData(res.data.data)
        console.log(writerdata,"writerdata");
    })
    .catch((err)=>{
      alert("Failed to fetch user details")
  });
  },[])


  const {challengeid}=useParams()
  console.log(challengeid,"cha_id");

  useEffect(()=>{
    axiosInstance.post(`/viewChallengeById/${challengeid}`)
    .then((res)=>{
        console.log(res,"res");
        setChallengeData(res.data.data)
        console.log(challengedata,"challenge data");
    })
    .catch((err)=>{
      alert("Failed to fetch user details")
  });
  },[])

 

  const [errorcover, setErrorCover] = useState(null);
  const [image, setImage] = useState(null);
  
  const [challengedata , setChallengeData] =useState({
            title:'',
            description:'',
            startDate:'',
            endDate:'',
            picture: ''
  });

  const [errors, setErrors] = useState({
            title:'',
            description:'',
            startDate:'',
            endDate:'',
            picture: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChallengeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  console.log(challengedata, "challengedata");

  const [imgFile, setImgFile] = useState("");

  

  useEffect(() => {
    if (challengedata.picture?.filename) {
      setImgFile(`${imageUrl}/${challengedata.picture.filename}`);
    }
  }, [challengedata.picture]);

  
const [picturename,setpictureName]=useState('')

  const handleFileCoverChange = (picture) => {
    if (!picture.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      const error = "Only upload JPG JPEG PNG GIF file type ";
      setErrorCover(error);
      return;
    }
    setpictureName(picture.name)
    setErrorCover(null);
    setChallengeData({ ...challengedata, picture });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    let formValid = true;

    if (!challengedata.title.trim()) {
      formValid = false;
      errors.title = "Title is required";
    }
    if (!challengedata.description) {
      formValid = false;
      console.log("3", formValid);
      errors.description = "Description is required";
    }
    if (!challengedata.startDate.trim()) {
      formValid = false;
      console.log("z4", formValid);
      errors.startDate = "Start Date is required";
    }
    if (!challengedata.endDate) {
      formValid = false;
      console.log("z5", formValid);
      errors.endDate = "End Date is required";
    }
    if (!challengedata.picture) {
        formValid = false;
        console.log("z5", formValid);
        errors.picture = "Please Upload Image for Cover Pictire";
      }
    setErrors(errors);

    if (
        challengedata.title &&
        challengedata.description &&
        challengedata.startDate &&
        challengedata.endDate &&
        challengedata.picture
    ) {
      formValid = true;
    }

    if (Object.keys(errors).length === 0 && formValid) {
      const formData = new FormData();
      formData.append("title", challengedata.title);
      formData.append("description", challengedata.description);
      formData.append("startDate", challengedata.startDate);
      formData.append("endDate", challengedata.endDate);
      formData.append("picture", challengedata.picture);
      

      console.log(formData, "formData");
      try {
        var response;
        if (challengedata) {
          response = await axiosMultipartInstance.post(
            `/updateChallengeById/${challengeid}`,
            formData
          );
        }
        console.log("Response:", response);
        if (response.status == 200) {
          alert(response.data.msg);
          window.location.reload(false)
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg,'msg');
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Data entered", challengedata);
    }
  };


   const startd = new Date(challengedata.startDate);
/* Date format you have */
let startdate = `${startd.getDate()}-${startd.getMonth() + 1}-${startd.getFullYear()}`
/* Date converted to MM-DD-YYYY format */
console.log(startdate);
const endd = new Date(challengedata.startDate);
/* Date format you have */
let enddate = `${endd.getDate()}-${endd.getMonth() + 1}-${endd.getFullYear()}`;
/* Date converted to MM-DD-YYYY format */
console.log(enddate);
  


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
                    {imgFile &&<img src={imgFile} className='writer-editchallenge-picture'/>}
                    {errors.picture && (
                        <div className="text-danger errortext">
                          {errors.picture}
                        </div>
                      )}
                      {errorcover && (
                        <div className="text-danger errortext">
                          {errorcover}
                        </div>
                      )}
                </div>
                
                
                <div className='col mt-5'>
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Challenge Title</label>
                        <div class="col-sm-7">
                            <input type="text" 
                            style={{height: '60px',border:'none',borderRadius:'0px'}} 
                            name='title'
                            value={challengedata.title}
                            placeholder={challengedata.title}
                            onChange={handleChange}
                            class="form-control" id="inputEmail3"/>
                            
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-4 col-form-label">Challenge Description</label>
                        <div class="col-sm-7">
                            <textarea type="text" 
                            name='description'
                            value={challengedata.description}
                            placeholder={challengedata.description}
                            onChange={handleChange}
                            style={{height: '200px',border:'none',borderRadius:'0px'}} class="form-control" id="inputPassword3"/>
                            
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Challenge Start Date</label>
                        <div class="col-sm-7">
                            <input type="date" 
                            name='startDate'
                            value={startdate}
                            placeholder={startdate}
                            onChange={handleChange}
                            style={{height: '60px',border:'none',borderRadius:'0px'}} class="form-control" id="inputEmail3"/>
                            
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Challenge End Date</label>
                        <div class="col-sm-7">
                            <input type="date" 
                            name='endDate'
                            value={enddate}
                            placeholder={enddate}
                            onChange={handleChange}
                            style={{height: '60px',border:'none',borderRadius:'0px'}} class="form-control" id="inputEmail3"/>
                            
                        </div>
                    </div>
                    <div class="row mb-3 mt-5">
                    <label for="inputEmail3" class="col-sm-4 col-form-label">Update Image</label>

                    <div class="col-sm-7">
                    <FaCamera
                        className="writer-editchallenge-img-icon"
                        onClick={() =>
                          document.getElementById("picture").click()
                        }
                      />{" "}<p className='writer-editcha-pictname'>{picturename}</p>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        name="picture"
                        onChange={(event) => {
                          handleFileCoverChange(event.target.files[0]);
                        }}
                        id="picture"
                      />
                      
                      </div>
                    </div>
                    
                    <div className='writer-addchallenge-btn-div'>
                        <button className='writer-addchallenge-btn' >Edit Challenge</button>

                    </div>
                    </form>
                </div>
                
            </div>

        </div>
        </section>
    </>
  )
}

export default WriterEditChallenges