import "./Reader.css";
import React, { useState, useEffect } from "react";
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
import ReactStars from "react-rating-stars-component";
import { PiCrownFill } from "react-icons/pi";
import william from "../../Assets/william.png";
import Horror from "../../Assets/Horror.png";

function ReaderViewOneCustomizedStory() {
  const navigate = useNavigate();

  const [id, setId] = useState(localStorage.getItem("reader"));
  const readerid = localStorage.getItem("reader");
  const [comment, setComment] = useState();
  const [storypart, setStorypart] = useState([]);
  const [partlikecountobj, setPartlikecountobj] = useState({});
  const [rating, setRating] = useState();
  const [bestpart, setBestpart] = useState();

  useEffect(() => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("reader") == null
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

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => {
    setShow1(false);
    viewStory();
  };
  const handleCommantsShow = () => {
    setShow1(true);
    viewStory();
  };
  const handlepartClose = () => {
    setShow2(false);
    viewStory();
  };

  useEffect(() => {
    axiosInstance
      .post(`/viewReaderById/${id}`)
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
  const viewStory = () => {
    axiosInstance
      .post(`/viewStoryById/${storyid}`)
      .then((res) => {
        setStoryData(res.data.data);
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });
  };
  useEffect(() => {
    viewStory();
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

    axiosInstance
      .post(`/findBestPart/${storyid}`)
      .then((res) => {
        console.log(res.data, "setBestpart");
        setBestpart(res.data);
      })
      .catch((err) => {
        console.log("Failed to fetch user details");
      });
    viewStory();
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

  const fetchdata = () => {
    axiosInstance
      .post(`/viewCommentsByStory/${storyid}`)
      .then((res) => {
        if (res.data.status === 200) {
          console.log("comments", res.data.data);
          setData(res.data.data);
          viewStory();
        }
      })
      .catch((err) => {
        console(err);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const commentData = {
    storyId: storyid,
    comment: comment,
    readerId: readerid,
    writerId: id,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/createComment", commentData)
      .then((res) => {
        if (res.status === 200) {
          alert("Comment Added Successfully!");
          handleClose();
          viewStory();
          fetchdata();
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
  const [apartid, setApartid] = useState({});

  const handlepartShow = (partid) => {
    setShow2(true);
    axiosInstance
      .post("/getPartById/" + partid)
      .then((res) => {
        console.log(res, "partid");
        setApartid(res.data.data);
      })
      .catch((err) => {});
  };

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

  const partLikeManage = (action, partId) => {
    var endpoint = action === "like" ? "/addLiketoPart" : "/addDisliketoPart";
    axiosInstance
      .post(endpoint, {
        partId: partId,
        readerId: null,
        writerId: id,
      })
      .then((res) => {
        getPartLikeCounts();
      })
      .catch((err) => {
        console.log("Failed to manage like/dislike for part", err);
      });
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

  const setalllike = (partid, partlikcnt, partdislikcnt) => {
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
  };

  const getPartLikeCounts = async (storypartpram) => {
    var storypartff = storypartpram ? storypartpram : storypart;

    for (var i in storypartff) {
      var spart = storypartff[i];
      var partid = spart?._id;
      var partlikcnt = 0;
      var partdislikcnt = 0;
      await setalllike(partid, partlikcnt, partdislikcnt);
      console.log(partlikecountobj, "setPartlikecountobj");
    }
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    axiosInstance
      .post(`/addRating/${storyid}`, { rating: newRating })
      .then((res) => {
        if (res.status === 200) {
          alert("Rating submitted successfully!");
        } else {
          console.log("Failed to submit rating");
        }
      })
      .catch((err) => {
        console.log("Failed to submit rating");
      });
  };

  return (
    <div className="mb-5">
      <div className="readerview-one-customised-story-back">
        <div className="container">
          <div className="readerview-one-customised-story-navdiv mt-5 mb-5">
            <img
              src={`${imageUrl}/${
                writerdata.profilePicture.filename
                  ? writerdata.profilePicture.filename
                  : writerdata.profilePicture
              }`}
              className="writer-story-addpage-profileimg mt-3 ms-5"
            ></img>{" "}
            <span className="ms-3 mt-5 readerview-one-customised-story-span">
              {writerdata.name}
            </span>
          </div>
          <div className="readerview-one-customised-story-maindiv mb-5">
            <div className="container">
              <div className="text-center pt-3">
                <img
                  src={`${
                    image
                      ? image
                      : imageUrl + "/" + storydata.coverPicture?.filename
                  }`}
                  className="readerview-one-customised-story-img1"
                  alt="Upload cover Image"
                ></img>{" "}
              </div>
            </div>
            <div className="text-center mb-5">
              <div className="readerview-one-customised-story-maindiv1">
                <div className="row">
                  <div className="col-7">
                    <div className="pt-3">
                      <h3>
                        {storydata.title}({storydata.storyCategory} Story)
                      </h3>
                    </div>
                    <div className="readerview-one-customised-story-para ">
                      <p className="ms-5">{storydata.summary}</p>
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
                    </div>
                    <div>
                      {storypart.length > 0 ? (
                        <div>
                          <h3 className="text-light">Parts</h3>
                          {storypart.map((part, index) => (
                            <div className="readerview-one-customised-story-branches ms-5 my-3">
                              <div
                                className="row"
                                onClick={() => handlepartShow(part?._id)}
                              >
                                <div className="col-3">
                                  <img
                                    style={{ width: "80px", height: "80px" }}
                                    src={`${
                                      image
                                        ? image
                                        : imageUrl +
                                          "/" +
                                          storydata.coverPicture?.filename
                                    }`}
                                    className="rounded-pill p-1"
                                    alt="Upload cover Image"
                                  ></img>
                                </div>

                                <div className="col-9">
                                  <div className="">
                                    {bestpart?._id == part?._id ? (
                                      <PiCrownFill className="text-warning" />
                                    ) : (
                                      ""
                                    )}
                                    <h6>Part {index + 1}</h6>

                                    <img
                                      src={like}
                                      className="writer-story-addpage-like-img "
                                      style={{ width: "20px" }}
                                    />

                                    <b className="ms-2">
                                      {partlikecountobj &&
                                      partlikecountobj[part?._id]
                                        ? partlikecountobj[part?._id].like
                                        : "0"}
                                    </b>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}{" "}
                        </div>
                      ) : (
                        "This story has no sub parts"
                      )}

                      <div className="pt-5 ms-5">
                        <div onClick={handleCommantsShow}>
                          Add Comments :{" "}
                          <AiOutlineMessage className="readerview-apublished-story-icon my-5" />
                          {data.length}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 mt-5 pt-2">
                    <div className="text-center mt-3">
                      <div className="row">
                        <h6
                          className="col-4">Add your rating here :</h6>
                    <div className="
                          col-6"
                        >
                          <ReactStars
                            count={5}
                            value={storydata.rating}
                            onChange={handleRating}
                            size={30}
                            activeColor="#ffd700"
                          />
                        </div>
                      </div>
                    </div>
                    {storypart.length > 0 ? (
                      <div>
                        <h3 className="readerview-one-customised-story-branches-h3 mt-5 ">
                          Co Creators
                        </h3>

                        {storypart.map((item) => (
                          <div className="readerview-one-customised-story-branches-co ms-5 my-5">
                            <div className="row">
                              <div className="col-3">
                                <img
                                  className="rounded-pill"
                                  style={{ width: "60px", height: "60px" }}
                                  src={
                                    imageUrl +
                                    "/" +
                                    item.writerId.profilePicture.filename
                                  }
                                ></img>
                              </div>
                              <div className="col-9">
                                <div>
                                  <b className="text-light">
                                    {" "}
                                    <div>{item.writerId.name}</div>
                                    <div>{item.writerId.email}</div>
                                  </b>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      "No co-creaters"
                    )}
                  </div>
                  <Modal show={show2} onHide={handlepartClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <div className="m-3 text-center">
                      {apartid.partText ? (
                        <p>{apartid.partText}</p>
                      ) : (
                        <audio
                          controls
                          src={`${imageUrl}/${apartid.partAudio?.filename}`}
                        />
                      )}
                    </div>
                    <div className="row p-3">
                      {" "}
                      <div
                        className="col-6 mx-3 mb-3 like"
                        onClick={(e) => {
                          e.preventDefault();
                          partLikeManage("like", apartid?._id);
                        }}
                      >
                        <img
                          src={like}
                          className="writer-story-addpage-like-img"
                        />

                        <span className=" ms-2">
                          {partlikecountobj && partlikecountobj[apartid?._id]
                            ? partlikecountobj[apartid?._id].like
                            : "0"}
                        </span>
                      </div>
                      <div
                        className=" col-6 mx-3 like"
                        onClick={(e) => {
                          e.preventDefault();
                          partLikeManage("dislike", apartid?._id);
                        }}
                      >
                        <img
                          src={dislike}
                          className="writer-story-addpage-like-img "
                        />

                        <span className="ms-2">
                          {partlikecountobj && partlikecountobj[apartid?._id]
                            ? partlikecountobj[apartid?._id].dislike
                            : "0"}
                        </span>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
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
                    {com.readerId ? (
                      <img
                        src={`${imageUrl}/${com?.readerId?.profilePicture.filename}`}
                        className="readerview-apublished-story-commentimg"
                      ></img>
                    ) : (
                      <img
                        src={`${imageUrl}/${com?.writerId?.profilePicture.filename}`}
                        className="readerview-apublished-story-commentimg"
                      ></img>
                    )}
                  </div>
                  <div className="col-10">
                    <label className="readerview-apublished-story-label">
                      {com?.readerId?.name || com?.writerId?.name}
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
            <Modal show={show1} onHide={handleClose}>
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
    </div>
  );
}

export default ReaderViewOneCustomizedStory;
