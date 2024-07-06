import React,{useEffect} from "react";
import img from "../../Assets/Landingsection8img.png";
import img2 from "../../Assets/Drama.png";
import img3 from "../../Assets/Crime.png";
import img4 from "../../Assets/Horror.png";
import img5 from "../../Assets/Romance.png";
import img6 from "../../Assets/Fantasy.png";
import img7 from "../../Assets/img3.jpg";
import ViewerMainNav from "./ViewerMainNav";
import Footer from "../Pages/Footer";
import { useNavigate } from 'react-router-dom'

function ReaderHome() {
  const navigate =useNavigate()
    useEffect(() => {
        if (
          localStorage.getItem("token") == null &&
          localStorage.getItem("reader") == null
        ) {
          navigate("/login");
        }
      }, [navigate]);
  return (
    <div>
      {" "}
      <div>
        <ViewerMainNav />
        <div>
          {" "}
          <div className="App">
            <div className="headDiv">
              <img src={img} className="App-image" alt="header" />
              <div className="App-header-text text-dark ">
                <h1 className="h1-1 fs-1">Discover a World of Stories</h1>
                <p className="p-1 fs-5">
                  Immerse yourself in a diverse collection of tales created by a
                  global community of writers. Every story is a unique journey,
                  shaped by multiple perspectives and imaginations. Explore a
                  wide range of stories from romance to science fiction, mystery
                  to adventure. Shape the narrative by likes and dislikes for
                  your preferred plot directions and outcomes.
                </p>
              </div>
            </div>

            <section className="Top-stories">
              <h2 className="h2-2" style={{ textAlign: "left" }}>
                Top Stories
              </h2>
              <div className="Stories-list">
                <div className="Story-card">
                  <img src={img2} alt="Drama" className="img-1" />
                  <p>Drama</p>
                </div>
                <div className="Story-card">
                  <img src={img3} alt="Crime" className="img-1" />
                  <p>Crime</p>
                </div>
                <div className="Story-card">
                  <img src={img4} alt="Horror" className="img-1" />
                  <p>Horror</p>
                </div>
                <div className="Story-card">
                  <img src={img5} alt="Romantic" className="img-1" />
                  <p>Romantic</p>
                </div>
                <div className="Story-card">
                  <img src={img6} alt="Fantasy" className="img-1" />
                  <p>Fantasy</p>
                </div>
              </div>
            </section>

            <section className="Customized-story">
              <h2 className="h2-2">Customized Story</h2>
              <div className="How-it-works">
                <div className="How-it-works-step">
                  <h3>Explore Ongoing Stories</h3>
                  <p className="p-2">
                    Browse through a wide variety of stories across different
                    genres. From epic fantasies to gripping thrillers, there's
                    something for every reader.
                  </p>
                </div>
                <div className="How-it-works-step">
                  <h3>Engage with the Narrative</h3>
                  <p>
                    Follow your favorite stories. Enjoy the dynamic experience
                    of a story evolving in real-time.
                  </p>
                </div>
                <div className="How-it-works-step">
                  <h3>Influence the Plot</h3>
                  <p>
                    Vote on your favorite chapters and plot twists. Your votes
                    help guide the direction of the story, making you an
                    integral part of the storytelling process.
                  </p>
                </div>
              </div>
            </section>

            <section className="Challenges">
              <h2 className="h2-4">Challenges</h2>
              <h2 className="h2-3">How It Works</h2>

              <div className="challengesDiv">
                <div>
                  <img src={img7} alt="" className="imgDiv" />
                </div>

                <div className="Challenges-steps">
                  <div className="Challenge-step">
                    <p>Step 1</p>
                  </div>
                  <div className="Challenge-step">
                    <p>Step 2</p>
                  </div>
                  <div className="Challenge-step">
                    <p>Step 3</p>
                  </div>
                  <div className="Challenge-step">
                    <p>Step 4</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReaderHome;
