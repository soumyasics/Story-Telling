import React,{useEffect} from "react";
import './Reader.css'
import img from "../../Assets/Landingsection8img.png";
import img2 from "../../Assets/Drama.png";
import img3 from "../../Assets/Crime.png";
import img4 from "../../Assets/Horror.png";
import img5 from "../../Assets/Romance.png";
import img6 from "../../Assets/Fantasy.png";
import img7 from "../../Assets/img3.jpg";
import ViewerMainNav from "./ViewerMainNav";
import Footer from "../Pages/Footer";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
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

     
      const [dropdownVisible, setDropdownVisible] = useState(false);
      const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };

      const [dropdownVisible2, setDropdownVisible2] = useState(false);
      const toggleDropdown2 = () => {
        setDropdownVisible2(!dropdownVisible2);
      };

      const [dropdownVisible3, setDropdownVisible3] = useState(false);
      const toggleDropdown3 = () => {
        setDropdownVisible3(!dropdownVisible3);
      }; 
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
              <div className="App-header-text text-light ">
                <h1 className="h1-1 fs-1">Discover a World of Stories</h1>
                <p className="p-1 fs-5 text-light">
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
                  <div className="row  mt-3">
                    <div className="col-4">
                      <label onClick={toggleDropdown}>
                        <div>
                        <h6> Step 1</h6>
                        <label><IoMdArrowDropdown/></label>
                        </div>
                      </label>
                      {dropdownVisible && (
                          <div className="dropdown_menu sidebar_dash_drop">
                              <div className="reader-home-step1">
                                {/* <Link to="reader-home-link" className="text-dark">  */}
                                  <h5>Choose a challenge</h5>
                                  <label>Select the challenge that </label>
                                  <label>excites you the most</label> 
                                {/* </Link> */}
                              </div>
                          </div>
                      )}
                    </div>
                    <div className="col-4">
                    
                    <label onClick={toggleDropdown2}>
                        <div>
                        <h6> Step 2</h6>
                        <label><IoMdArrowDropdown/></label>
                        </div>
                      </label>
                      {dropdownVisible2 && (
                          <div className="dropdown_menu sidebar_dash_drop">
                              <div className="reader-home-step1">
                                {/* <Link to="reader-home-link" className="text-dark">  */}
                                  <h5>Submit your update</h5>
                                  <label>Post your updates daily  </label>
                                  <label>and let others</label> 
                                  <label>knew your participation</label>
                                {/* </Link> */}
                              </div>
                          </div>
                      )}
                    
                    </div>
                    <div className="col-4">
                    <label onClick={toggleDropdown3}>
                        <div>
                        <h6> Step 3</h6>
                        <label><IoMdArrowDropdown/></label>
                        </div>
                      </label>
                      {dropdownVisible3 && (
                          <div className="dropdown_menu sidebar_dash_drop">
                              <div className="reader-home-step1 ps-5">
                                {/* <Link to="reader-home-link" className="text-dark">  */}
                                  <h5>Winner of the challenge</h5>
                                  <label>Challenge winner will be </label>
                                  <label>announced after the end of the </label> 
                                  <label>deadline of the challenge</label>
                                {/* </Link> */}
                              </div>
                          </div>
                      )}
                    </div>
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
