import React, { useState, useEffect } from 'react';
import './Challenges.css';
import { useNavigate } from 'react-router-dom';
import { imageUrl } from '../../BaseAPIs/ImageUrl/imgApi';
import axiosInstance from '../../BaseAPIs/axiosinstatnce';
import axiosMultipartInstance from '../../BaseAPIs/AxiosMultipartInstance';
import { FaCamera } from "react-icons/fa";
import img1 from '../../Assets/image.png'
function WriterAddChallenges() {
    const navigate = useNavigate();

    const [id, setId] = useState(localStorage.getItem("writer"));

    useEffect(() => {
        if (localStorage.getItem("token") == null && localStorage.getItem("writer") == null) {
            navigate("/");
        }
    }, [navigate]);

    const [writerdata, setWriterData] = useState({ profilePicture: { filename: '' } });

    useEffect(() => {
        axiosInstance.post(`/viewWriterById/${id}`)
            .then((res) => {
                console.log(res, "res");
                setWriterData(res.data.data);
                console.log(writerdata, "writerdata");
            })
            .catch((err) => {
                console.log("Failed to fetch user details");
            });
    }, []);

    const [errorcover, setErrorCover] = useState(null);
    const [image, setImage] = useState(img1);
    const [challengedata, setChallengeData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        writerId: id,
        picture: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        writerId: id,
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

    const handleFileCoverChange = (picture) => {
        if (!picture.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            const error = "Only upload JPG JPEG PNG GIF file type ";
            setErrorCover(error);
            return;
        }
        setImage(URL.createObjectURL(picture));
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
        if (challengedata.endDate<challengedata.startDate) {
            formValid = false;
            console.log("z5", formValid);
            errors.endDate = "End Date Should be greater than start date";
        }
        if (!challengedata.picture) {
            formValid = false;
            console.log("z5", formValid);
            errors.picture = "Please Upload Image for Cover Picture";
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
                        '/addChallenge',
                        challengedata
                    );
                }
                console.log("Response:", response);
                if (response.status == 200) {
                    alert(response.data.msg);
                    navigate("/writer-newstory-challenge");
                }
            } catch (error) {
                console.error("Error:", error);
                let msg = error?.response?.data?.msg || "Error occurred";
                alert(msg, 'msg');
            }
        } else {
            console.log("Form is not valid", formValid);
            console.log("Data entered", challengedata);
        }
    };

    const navigatetohome = () => {
        navigate("/writerhome");
    }

    const getTodayDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <section className='container mt-5'>
                <div className='writer-addchallenge-navdiv'>
                    <div className='row'>
                        <div className='col-3 text-center'>
                            <img src={`${imageUrl}/${writerdata.profilePicture?.filename}`} className='writer-addchallenge-profileimg mt-3' alt="Profile" />
                        </div>
                    </div>
                </div>
                <div className='writer-addchallenge-maindiv mb-5'>
                    <div className='row'>
                        <div className='col p-4 mx-5'>
                            <img src={image} className='writer-addchallenge-picture' alt="Challenge" />
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
                            <form onSubmit={(e) => { handleSubmit(e); }}>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Challenge Title</label>
                                    <div className="col-sm-7">
                                        <input type="text"
                                            style={{ height: '60px', border: 'none', borderRadius: '0px' }}
                                            name='title'
                                            onChange={handleChange}
                                            className="form-control" id="inputEmail3" />
                                        {errors.title && (
                                            <div className="text-danger errortext">
                                                {errors.title}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Challenge Description</label>
                                    <div className="col-sm-7">
                                        <textarea type="text"
                                            name='description'
                                            onChange={handleChange}
                                            style={{ height: '200px', border: 'none', borderRadius: '0px' }} className="form-control" id="inputPassword3" />
                                        {errors.description && (
                                            <div className="text-danger errortext">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Challenge Start Date</label>
                                    <div className="col-sm-7">
                                        <input type="date"
                                            name='startDate'
                                            onChange={handleChange}
                                            style={{ height: '60px', border: 'none', borderRadius: '0px' }}
                                            className="form-control" id="inputEmail3"
                                            min={getTodayDate()} />
                                        {errors.startDate && (
                                            <div className="text-danger errortext">
                                                {errors.startDate}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">Challenge End Date</label>
                                    <div className="col-sm-7">
                                        <input type="date"
                                            name='endDate'
                                            onChange={handleChange}
                                            style={{ height: '60px', border: 'none', borderRadius: '0px' }}
                                            className="form-control" id="inputEmail3"
                                            min={getTodayDate()} />
                                        {errors.endDate && (
                                            <div className="text-danger errortext">
                                                {errors.endDate}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-3 mt-5">
                                    <div className="col-sm-7">
                                        <FaCamera
                                            className="writer-addchallenge-img-icon"
                                            onClick={() =>
                                                document.getElementById("picture").click()
                                            }
                                        />{" "}
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
                                    <button className='writer-addchallenge-btn'>Publish</button>
                                    <button className='writer-addchallenge-btn ms-5' onClick={navigatetohome} type='reset'>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default WriterAddChallenges;
