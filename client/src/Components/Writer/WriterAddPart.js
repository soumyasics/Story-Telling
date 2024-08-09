import React, { useState, useEffect } from "react";
import "./Writer.css";
import bg from "../../Assets/bg.png";
import { Form, Radio, Input } from "antd";
import { FaCamera } from "react-icons/fa";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { useNavigate, useParams } from "react-router-dom";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";
import axiosMultipartInstance from "../../BaseAPIs/AxiosMultipartInstance";

function WriterAddPart() {
  const navigate = useNavigate();
  const [id, setId] = useState(localStorage.getItem("writer"));

  useEffect(() => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("writer") == null
    ) {
      navigate("/");
    }
  }, [navigate]);
  const [textb, setState] = useState({
    showTextBox: false,
    showFileUpload: false,
  });
  const [writerdata, setWriterData] = useState({
    profilePicture: { filename: "" },
  });

  const [storydata, setStoryData] = useState({
    title: "",
    summary: "",
    storyCategory: "",
    type: "",
    text: "",
    audio: "",
    coverPicture: { filename: "" },
    addtextpart:"",
    addaudiopart:""

  });

  useEffect(() => {
    axiosInstance
      .post(`/viewWriterById/${id}`)
      .then((res) => {
        console.log(res, "res");
        setWriterData(res.data.data);
        console.log(writerdata, "writerdata");
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, []);


  const handleOnChange = (e) => {
    setState({
      showTextBox: e.target.value === "text",
      showFileUpload: e.target.value === "audio",
    });
  };

  const story_id = useParams("");
  console.log(story_id.id, "storyid");

  useEffect(() => {
    axiosInstance
      .post(`/viewStoryById/${story_id.id}`)
      .then((res) => {
        console.log(res, "res");
        setStoryData(res.data.data);
        console.log(storydata, "storydata");
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, []);

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    storyCategory: "",
    type: "",
    text: "",
    coverPicture: "",
    audio: "",
    addtextpart:"",
    addaudiopart:""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  console.log(storydata, "addstorydata");

  const [errorcover, setErrorCover] = useState(null);
  const [erroraudio, setErrorAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const [image, setImage] = useState(null);

  const handleFileCoverChange = (coverPicture) => {
    if (!coverPicture.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      const error = "Only upload JPG JPEG PNG GIF file type ";
      setErrorCover(error);
      return;
    }
    setImage(URL.createObjectURL(coverPicture));
    setErrorCover(null);
    setStoryData({ ...storydata, coverPicture });
  };
  const handleFileAudioChange = (audio) => {
    if (!audio.name.match(/\.(mp3|wav|aac|flac)$/)) {
      const error = "Only upload MP3 WAV AAC FLAC file type ";
      setErrorAudio(error);
      return;
    }
    setErrorAudio(null);
    setAudioUrl(URL.createObjectURL(audio));
    setStoryData({ ...storydata, audio });
    console.log(storydata);
  };


  const publishStory = async (e) => {
    e.preventDefault();
    storydata.storyId = story_id.id;
  
    if (!storydata.addtextpart && !storydata.addaudiopart) {
      alert("Please enter your ideas in part (either text or audio).");
      return;
    }
  
    try {
      let response;
      if (storydata) {
        response = await axiosMultipartInstance.post(
          `/addpart`,
          {
            storyId: story_id.id,
            partText: storydata.addtextpart,
            partAudio: storydata.addaudiopart,
            writerId: localStorage.getItem("writer"),
          }
        );
      }
      console.log("Response:", response);
      alert(response.data.message);
      navigate('/writer-view-stories');
    } catch (error) {
      console.error("Error:", error);
      let msg = error?.response?.data?.msg || "Please enter your ideas in part.";
      alert(msg);
    }
  };
  

  return (
    <>
      <div className="mb-5 mt-5">
        <div className="container mt-5">
          <div className="writer-story-addpage-navdiv">
            <div className="row">

              <div className="col-3 text-center">
                <img
                  src={`${imageUrl}/${writerdata.profilePicture.filename ? writerdata.profilePicture.filename : writerdata.profilePicture}`}
                  className="writer-story-addpage-profileimg mt-3"
                ></img>
              </div>
              <div className="col-5">
              
                <button className="mt-4 writer-story-editpage-publishbtn" onClick={publishStory} >
                  Publish
                </button>
              </div>
            </div>
          </div>
          <form
          >
          <div className="row">
          <div className="col ">
            <div className="writer-story-addpage-secdiv1  ps-2">
              <div className="row container pt-2 ps-5">
                <div className="col writer-story-addpage-div2 mt-5 ">
                  <div className="text-center mt-3">
                    <input
                      className="writer-story-addpage-addtitle"
                      name="title"
                      value={storydata?.title}
                      placeholder={storydata?.title}
                      onChange={handleChange}
                      disabled
                    />
                   
                  </div>
                  <div className="text-center  mt-2">
                    <select
                      id="dropdown"
                      name="storyCategory"
                      value={storydata?.storyCategory}
                      placeholder={storydata?.storyCategory}
                      onChange={handleChange}
                      className="writer-story-addpage-category"
                      title="Story Category"
                      disabled
                    >
                      <option>Story Category</option>
                      <option>Horror</option>
                      <option>Comedy</option>
                      <option>Tragedy</option>
                      <option>Romance</option>
                      <option>Fantasy</option>
                      <option>Crime</option>
                    </select>
                   
                  </div>
                  <div className="mx-5 mt-2">
                    <Form.Item>
                      <Radio.Group onChange={handleOnChange} name="type">
                        {storydata?.text ? (
                          <Radio
                            onChange={handleChange}
                            value="text"
                            name="type"
                          >
                            Text
                          </Radio>
                        ) : (
                          <Radio
                            onChange={handleChange}
                            className="mt-3"
                            value="audio"
                            name="type"
                          >
                            Audio
                          </Radio>
                        )}
                      </Radio.Group>
                      {textb.showFileUpload && (
                        <button
                          className="mx-3 writer-story-addaudio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("audioUpload").click();
                          }}
                        >
                          {" "}
                          upload Audio{" "}
                        </button>
                      )}
                      <input
                        type="file"
                        style={{ display: "none" }}
                        name="audio"
                        onChange={(event) => {
                          handleFileAudioChange(event.target.files[0]);
                        }}
                        id="audioUpload"
                      />
                      {erroraudio && (
                        <div className=" mt-2 text-danger errortext">
                          {erroraudio}
                        </div>
                      )}
                    </Form.Item>
                  </div>
                  
                  <div className="mt-3 mx-5 writer-story-addpage-summery ">
                    <div class="form-floating">
                      <textarea
                        class="form-control "
                        id="floatingTextarea2"
                        style={{ height: "120px" }}
                        name="summary"
                        value={storydata?.summary}
                        placeholder={storydata?.summary}
                        onChange={handleChange}
                        disabled
                      ></textarea>
                      <label for="floatingTextarea2">Summary</label>
                      
                    </div>
                  </div>
                </div>
                <div className="col ">
                  <img
                    src={`${
                      image
                        ? image
                        : imageUrl + "/" + storydata?.coverPicture?.filename
                    }`}
                    className="writer-story-addpage-sideimg mt-5"
                    alt="Upload cover Image"
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className="writer-story-addtextarea-div">
            {textb.showTextBox && (
              <textarea
                className="writer-story-addtextarea"
                value={storydata.addtextpart}
                placeholder="Please enter the story"
                name="addtextpart"
                onChange={handleChange}
              />
            )}
          </div>
          {textb.showFileUpload && (
            <audio
              controls
              src={
                audioUrl
                  ? audioUrl
                  : imageUrl + "/" + storydata.addaudiopart?.filename
              }
            />
          )}
        </div>
      </form>
    </div>
      </div>
    </>
  );
}

export default WriterAddPart;
