import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";

function ReaderViewChallenges() {
  // const [writerdata, setWriterData] = useState([]);
  const [myc, setmyc] = useState([]);
  const navigate = useNavigate();
  const readerid = localStorage.getItem("reader");

  useEffect(() => {
    axiosInstance
      .post("/viewActiveChallenges")
      .then((res) => {
        // console.log(res.data.data);
        var writerdata = res.data.data;
        var fd = [];
        axiosInstance
          .post(`/viewmyChallengesByReaderId/${readerid}`)
          .then((res) => {
            var t = [];
            var wd = [];
            for(var i in res.data.data){
              var d = res.data.data[i];
              t.push(d.challengeId._id)
            }

            for(var j in writerdata){
              wd = writerdata[j];
              if(!t.includes(wd._id)) {
                // console.log('onjn');
                fd.push(wd)
              }
            }
            console.log(fd);
            setmyc(fd)
          })
          .catch((err) => {
            alert("Failed to fetch user details");
          });
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, []);

  const handleParticipate = (id) => {
    navigate("/reader-participate-challenge/" + id);
  };

  return (
    <div className="mb-5" style={{ minHeight: "100vh" }}>
      <div className="text-center mt-5">
        <h4>New Story Challenge</h4>
      </div>
      <div className="mt-3 text-end me-5 pe-5">
        <Link to="/reader-end-challenge">
          <button className="writerview-challenges-endedbtn">
            Ended Challenge
          </button>
        </Link>
      </div>
      {myc?myc.map((challenge, index) => (
        <div className="row mt-5" key={index}>
          <div className="col-2"></div>
          <div className="col-4 writerview-challenges-imgdiv">
            <div>
              <img
                src={`${imageUrl}/${challenge.picture?.filename}`}
                className="writerview-challenges-img"
                alt="Challenge"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="writerview-challenges-img1">
              <div className="text-center pt-2">
                <h3>{challenge.title}</h3>
                <div className="writerview-challenges-p ms-3 me-3">
                  <p>{challenge.description}</p>
                </div>
                <div className="text-end">
                  <h2 className="writerview-challenges-h2 me-5">
                    Start On{" "}
                    {new Date(challenge.startDate).toLocaleDateString()} and End
                    on {new Date(challenge.endDate).toLocaleDateString()}
                  </h2>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() =>
                    handleParticipate(challenge._id, challenge.startDate)
                  }
                  className="writerview-challenges-participatebtn"
                >
                  Participate
                </button>
              </div>{" "}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      )):''}
    </div>
  );
}

export default ReaderViewChallenges;
