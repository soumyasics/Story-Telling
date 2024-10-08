import React, { useState, useEffect } from "react";
import "./Writer.css";
import bg from "../../Assets/bg.png";
import { Form, Radio, Input } from "antd";
import { FaCamera } from "react-icons/fa";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { useNavigate, Link, useParams } from "react-router-dom";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";
import axiosMultipartInstance from "../../BaseAPIs/AxiosMultipartInstance";
import like from "../../Assets/Group.png";
import dislike from "../../Assets/iconamoon_like-bold (1).png";
import { AiOutlineMessage } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import crime from "../../Assets/Crime.png";
import { GoStarFill } from "react-icons/go";

function ViewAPublishedStory() {
  const navigate = useNavigate();
  const [id, setId] = useState(localStorage.getItem("writer"));
  const readerid = localStorage.getItem("reader");
  const writerId = localStorage.getItem("writer")?localStorage.getItem("writer"):null;
  const [comment, setComment] = useState();
  const [storypart, setStorypart] = useState([]);
  const [partlikecountobj, setPartlikecountobj] = useState({});
  useEffect(() => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("writer") == null
    ) {
      navigate("/");
    }
  }, []);

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleCommantsShow = () => setShow(true);

  useEffect(() => {
    axiosInstance
      .post(`/viewWriterById/${id}`)
      .then((res) => {
        setWriterData(res.data.data);
      })
      .catch((err) => {
      console.log("Failed to fetch user details");
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

  const { storyid } = useParams();

  useEffect(() => {
    axiosInstance
      .post(`/viewStoryById/${storyid}`)
      .then((res) => {
        setStoryData(res.data.data);
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });
    countlike();

    axiosInstance
      .post(`/getPartByStoryId/${storyid}`)
      .then((res) => {
        setStorypart(res.data.data);
        getPartLikeCounts(res.data.data);
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });
    countlike();
  }, []);

  const countlike = () => {
    axiosInstance
      .post(`/countDislikes/${storyid}`)
      .then((res) => {
        setDislikecount(res.data.count);
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });

    axiosInstance
      .post(`/countLikes/${storyid}`)
      .then((res) => {
        setLikecount(res.data.count);
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });
  };
  const fetchComments = () => {
    axiosInstance
      .post(`/viewCommentsByStory/${storyid}`)
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data||[]);
        }
      })
      .catch((err) => {
        console.log("Failed to fetch comments");
      });
  };
  useEffect(() => {
    fetchComments()
  }, []);

  const commentData = {
    storyId: storyid,
    comment: comment,
    readerId: readerid,
    writerId: id,
    comWriterId:writerId
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/createComment", commentData)
      .then((res) => {
        if (res.status === 200) {
          alert("Comment Added Successfully!");
          handleClose();
          fetchComments();
        } else {
          alert("Comment not Inserted");
        }
      })
      .catch((err) => {
        console.log("Failed to add Comment");
      });
  };

  const [data, setData] = useState([]);


  

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

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setComment(value);
  };

  const [errorcover, setErrorCover] = useState(null);
  const [erroraudio, setErrorAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isDiabled, setIsDiabled] = useState("d-none");
  const [likecount, setLikecount] = useState("");
  const [dislikecount, setDislikecount] = useState("d-none");
  const [partlikecount, setpartLikecount] = useState("");
  const [partdislikecount, setpartDislikecount] = useState("");
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
  };

  const likeManage = (action) => {
    var endpoint = action == "like" ? "/addLike" : "/addDislike";
    axiosInstance
      .post(endpoint, { storyId: storyid, readerId: null, writerId: id })
      .then((res) => {
        countlike();
      })
      .catch((err) => {});
  };

  const GotoAddpart = (sid) => {
    navigate("/writer-add-part/" + sid);
  };

  const partLikeManage = (action, index) => {
    var endpoint = action == "like" ? "/addLiketoPart" : "/addDisliketoPart";
    axiosInstance
      .post(endpoint, {
        partId: storypart[index]._id,
        readerId: null,
        writerId: id,
      })
      .then((res) => {
        getPartLikeCounts();
      })
      .catch((err) => {});
  };

  const countpartlike = (partId) => {
    axiosInstance
      .post(`/countDislikesforPart/${partId}`)
      .then((res) => {
        setpartDislikecount(res.data.count);
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });

    axiosInstance
      .post(`/countLikesforPartId/${partId}`)
      .then((res) => {
        setpartLikecount(res.data.count);
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });
  };

  const setalllike = (partid, partlikcnt, partdislikcnt)=> {
    axiosInstance
        .post(`/countLikesforPartId/${partid}`)
        .then((res) => {
          partlikcnt = res.data.count;
          axiosInstance
            .post(`/countDislikesforPart/${partid}`)
            .then((res) => {
              partdislikcnt = res.data.count;
              console.log(res.data.count, "partdislikcnt");
              setPartlikecountobj((prev) => ({
                ...prev,
                [partid]: {
                  like: partlikcnt,
                  dislike: partdislikcnt,
                },
              }));
            })
            .catch((err) => {
              console.log("Failed to fetch user details");
            });
        })
        .catch((err) => {
          console.log("Failed to fetch user details");
        });
  }

  const getPartLikeCounts =async (storypartpram) => {
    var storypartff = storypartpram ? storypartpram : storypart;

    for (var i in storypartff) {
      var spart = storypartff[i];
      var partid = spart._id;
      var partlikcnt = 0;
      var partdislikcnt = 0;
      await setalllike(partid, partlikcnt, partdislikcnt)
      console.log(partlikecountobj, "setPartlikecountobj");
    }
  };

  return (
    <>
      <div className="mb-5 mt-5">
        <div className="container mt-5">
          <div className="writer-story-addpage-navdiv">
            <div className="row">
              <div className="col-4"></div>

              <div className="col-3 text-center">
                <img
                  src={`${imageUrl}/${
                    writerdata.profilePicture.filename
                      ? writerdata.profilePicture.filename
                      : writerdata.profilePicture
                  }`}
                  className="writer-story-addpage-profileimg mt-3"
                ></img>
              </div>
              <div className="col-5"></div>
            </div>
          </div>
          <form>
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
                          disabled
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
                          disabled
                        >
                          <option>Story Category</option>
                          <option>Horror</option>
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
                          {textb.showFileUpload && (
                            <button
                              className="mx-3 writer-story-addaudio-btn"
                              disabled
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
                            id="floatingTextarea2 "
                            style={{ height: "120px" }}
                            name="summary"
                            value={storydata.summary}
                            placeholder={storydata.summary}
                            disabled
                          ></textarea>
                          <label for="floatingTextarea2">Summary</label>
                          {errors.summary && (
                            <div className="text-danger errortext">
                              {errors.summary}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row m-5">
                        <div
                          className="col mx-3  like"
                          onClick={(e) => {
                            e.preventDefault();
                            likeManage("like");
                          }}
                        >
                          <img src={like}></img>
                          <div>{likecount}</div>
                        </div>
                        <div
                          className=" col mx-3  dislike"
                          onClick={(e) => {
                            e.preventDefault();
                            likeManage("dislike");
                          }}
                        >
                          <img src={dislike}></img>
                          <div>{dislikecount}</div>
                        </div>
                        <div className="mt-5">
                          {" "}
                          <GoStarFill className="text-warning" /> Rating : {storydata?.rating}
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
                {(storydata.writerId!=id)? (<div className="pt-5 ms-5">
                    <div onClick={handleCommantsShow}>
                      <AiOutlineMessage className="readerview-apublished-story-icon" /><label>Comment</label>
                      {data.length}
                    </div>
                  </div>):('')
}
                  <div className="text-center p-3">
                    <button
                      className="btn btn-dark me-5 px-5"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDiabled("");
                        console.log(partlikecountobj, "console");
                      }}
                    >
                      Continue
                    </button>
                    <Link
                      to={`/writer-add-part/${storydata._id}`}
                      className="btn btn-dark px-5"
                    >
                      Add Part
                    </Link>
                  </div>
                </div>
              </div>
              <div className={`'writer-story-addtextarea-div' ${isDiabled}`}>
                {storydata.type == "text" ? (
                  <textarea
                    className="writer-story-addtextarea ps-5"
                    value={storydata.text}
                    placeholder='Please enter story'
                    name="text"
                    disabled
                  />
                ) : (
                  ""
                )}

                {storydata.type == "audio" ? (
                  <audio
                    controls
                    className="mt-5 w-100"
                    src={
                      audioUrl
                        ? audioUrl
                        : imageUrl + "/" + storydata.audio?.filename
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              {storypart.map((part, index) => (
                <div
                  key={part._id}
                  className={`'row ps-5 mt-5 w-100' ${isDiabled}`}
                >
                  <div className="col writer-story-addpage-div2">
                    <div className="text-center mt-3">
                      <h5>Part {index + 1}</h5>
                      {part.partText!="undefined" ? (
                        <p>{part.partText}</p>
                      ) : (
                        <audio
                          controls
                          src={`${imageUrl}/${part.partAudio?.filename}`}
                        />
                      )}

                      <div className="mt-3">
                        <div
                          className="col mx-3  like"
                          onClick={(e) => {
                            e.preventDefault();
                            partLikeManage("like", index);
                          }}
                        >
                          <img
                            src={like}
                            className="writer-story-addpage-like-img"
                          />
                        </div>
                        <span className="ms-2">
                          {partlikecountobj && partlikecountobj[part._id]
                            ? partlikecountobj[part._id].like
                            : "0"}
                        </span>
                        <div
                          className="col mx-3  like"
                          onClick={(e) => {
                            e.preventDefault();
                            partLikeManage("dislike", index);
                          }}
                        >
                          <img
                            src={dislike}
                            className="writer-story-addpage-like-img ms-4"
                          />
                        </div>
                        <span className="ms-2">
                          {partlikecountobj && partlikecountobj[part._id]
                            ? partlikecountobj[part._id].dislike
                            : "0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="container readerview-apublished-story-commentdiv">
         <div className="pt-4 ms-5">
            <h5>Comments</h5>
          </div>
          <hr></hr>

          {data.length > 0 ? (
            data.map((com) => {
              return (
                <div className="row mb-3">
                  <div className="col-2 ps-5">
                    {console.log(com.readerId)}
                    <img
                      src={`${imageUrl}/${com?.readerId?(com.readerId.profilePicture.filename):(com?.comWriterId?(com.comWriterId.profilePicture.filename):'')}`}
                      className="readerview-apublished-story-commentimg"
                    ></img>
                  </div>
                  <div className="col-10">
                    <label className="readerview-apublished-story-label">
                      {com?.readerId?.name}
                    </label>
                    <br></br>
                    <label className="readerview-apublished-story-label">
                      {com.comment}
                    </label>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Nothing found</div>
          )}

          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  className="form-control"
                  cols="60"
                  rows="10"
                  name="comment"
                  onChange={handleCommentChange}
                ></textarea>
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <button
                    className="readerview-apublished-story-submitbtn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      </div>
    </>
  );
}

export default ViewAPublishedStory;
