import React, { useState, useEffect } from "react";
import "./Writer.css";
import bg from "../../Assets/bg.png";
import { Form, Radio, Input } from "antd";
import { FaCamera } from "react-icons/fa";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { useNavigate, useParams } from "react-router-dom";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";
import axiosMultipartInstance from "../../BaseAPIs/AxiosMultipartInstance";

function WriterStoryEditPage() {
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

  const [textb, setState] = useState({
    showTextBox: false,
    showFileUpload: false,
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    let formValid = true;

    if (!storydata.title.trim()) {
      formValid = false;
      errors.title = "Title is required";
    }
    if (!storydata.storyCategory) {
      formValid = false;
      console.log("3", formValid);
      errors.storyCategory = "Story Category is required";
    }
    if (!storydata.summary.trim()) {
      formValid = false;
      console.log("z4", formValid);
      errors.summary = "Summary is required";
    }
    if (!storydata.coverPicture) {
      formValid = false;
      console.log("z5", formValid);
      errors.description = "Cover Picture is required";
    }
    setErrors(errors);

    if (
      storydata.title &&
      storydata.summary &&
      storydata.storyCategory &&
      storydata.coverPicture
    ) {
      formValid = true;
    }

    if (Object.keys(errors).length === 0 && formValid) {
      const formData = new FormData();
      formData.append("title", storydata.title);
      formData.append("summary", storydata.summary);
      formData.append("storyCategory", storydata.storyCategory);
      formData.append("coverPicture", storydata.coverPicture);
      formData.append("type", storydata.type);
      if (storydata.type === "text") {
        formData.append("text", storydata.text);
      } else {
        formData.append("audio", storydata.audio);
        console.log("pp");

      }
      try {
        var response;
        if (storydata) {
          response = await axiosMultipartInstance.post(
            `/editStory/${story_id.id}`,
            formData
          );
        }
        console.log("Response:", response);
        if (response.status == 200) {
          alert("Save As Draft");
          setStoryData(response.data.data);
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
      console.log("Data entered", storydata);
    }
  };

  const publishStory = async (e) => {
    e.preventDefault();
    storydata.storyId = story_id.id
    try {
      var response;
      if (storydata) {
        response = await axiosMultipartInstance.post(
          `/publishStory`,
          storydata
        );
      }
      console.log("Response:", response);
      if (response.status == 200) {
        alert(response.data.message);
        // navigate('/allstroies')
      }
    } catch (error) {
      console.error("Error:", error);
      let msg = error?.response?.data?.msg || "Error occurred";
      alert(msg);
    }
  };

  return (
    <>
      <div className="mb-5 mt-5">
        <div className="container mt-5">
          <div className="writer-story-addpage-navdiv">
            <div className="row">
              <div className="col-4">
                <button
                  onClick={handleSubmit}
                  className="mt-4 me-5 writer-story-editpage-savebtn"
                >
                  Save
                </button>
              </div>

              <div className="col-3 text-center">
                <img
                  src={`${imageUrl}/${writerdata.profilePicture.filename}`}
                  className="writer-story-addpage-profileimg mt-3"
                ></img>
              </div>
              <div className="col-5">
                <button className="mt-4 writer-story-editpage-publishbtn" onClick={publishStory}>
                  Publish
                </button>
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
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
                      value={storydata.title}
                      placeholder={storydata.title}
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <div className="text-danger errortext">
                        {errors.title}
                      </div>
                    )}
                  </div>
                  <div className="text-center  mt-2">
                    <select
                      id="dropdown"
                      name="storyCategory"
                      value={storydata.storyCategory}
                      placeholder={storydata.storyCategory}
                      onChange={handleChange}
                      className="writer-story-addpage-category"
                      title="Story Category"
                    >
                      <option>Story Category</option>
                      <option>Horror</option>
                      <option>Comedy</option>
                      <option>Tragedy</option>
                      <option>Romance</option>
                      <option>Fantasy</option>
                      <option>Crime</option>
                    </select>
                    {errors.storyCategory && (
                      <div className="text-danger errortext">
                        {errors.storyCategory}
                      </div>
                    )}
                  </div>
                  <div className="mx-5 mt-2">
                    <Form.Item>
                      <Radio.Group onChange={handleOnChange} name="type">
                        {storydata.text ? (
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
                  <div className="text-center mt-5">
                    <FaCamera
                      className="writer-add_story-icon"
                      onClick={() =>
                        document.getElementById("coverPicture").click()
                      }
                    />{" "}
                    Change Cover Picture
                    <input
                      type="file"
                      style={{ display: "none" }}
                      name="coverPicture"
                      onChange={(event) => {
                        handleFileCoverChange(event.target.files[0]);
                      }}
                      id="coverPicture"
                    />
                    {errors.coverPicture && (
                      <div className="text-danger errortext">
                        {errors.coverPicture}
                      </div>
                    )}
                    {errorcover && (
                      <div className="text-danger errortext">
                        {errorcover}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 mx-5 writer-story-addpage-summery ">
                    <div class="form-floating">
                      <textarea
                        class="form-control "
                        id="floatingTextarea2"
                        style={{ height: "120px" }}
                        name="summary"
                        value={storydata.summary}
                        placeholder={storydata.summary}
                        onChange={handleChange}
                      ></textarea>
                      <label for="floatingTextarea2">Summary</label>
                      {errors.summary && (
                        <div className="text-danger errortext">
                          {errors.summary}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col ">
                  <img
                    src={`${
                      image
                        ? image
                        : imageUrl + "/" + storydata.coverPicture?.filename
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
                value={storydata.text}
                placeholder={storydata.text}
                name="text"
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
                  : imageUrl + "/" + storydata.audio?.filename
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

export default WriterStoryEditPage;
