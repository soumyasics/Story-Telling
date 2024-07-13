import React,{useEffect, useState} from 'react'
import './WriterHomePage.css'
import img from '../../Assets/img2.jpg'
import img2 from '../../Assets/Drama.png'
import img3 from '../../Assets/Crime.png'
import img4 from '../../Assets/Horror.png'
import img5 from '../../Assets/Romance.png'
import img6 from '../../Assets/Fantasy.png'
import img7 from '../../Assets/img3.jpg'
import WritterMainNav from './WritterMainNav'
import Footer from '../Pages/Footer'
import {useNavigate} from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io'

function WriterHome() {
    const navigate =useNavigate()
    useEffect(() => {
        if (
          localStorage.getItem("token") == null &&
          localStorage.getItem("writer") == null
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

      const [dropdownVisible4, setDropdownVisible4] = useState(false);
      const toggleDropdown4 = () => {
        setDropdownVisible4(!dropdownVisible4);
      };

  return (
    <div><WritterMainNav/>
    <div> <div className="App">
            <div className="headDiv">
                <img src={img} className="App-image" alt="header" />
                <div className="App-header-text">
                    <h1 className='h1-1'>Where Imagination Knows No Bounds</h1>
                    <h2 className='h2-1'>Unleash Your Creativity</h2>
                    <p className='p-1'>
                        Join a vibrant community of storytellers from around the world.
                        Together, we create compelling, imaginative, and diverse stories, one chapter at a time.
                    </p>
                </div>
            </div>

            <section className="Top-stories">
                <h2 className='h2-2' style={{ textAlign: "left" }}>Top Stories</h2>
                <div className="Stories-list">
                    <div className="Story-card">
                        <img src={img2} alt="Drama" className='img-1' />
                        <p>Drama</p>
                    </div>
                    <div className="Story-card">
                        <img src={img3} alt="Crime" className='img-1' />
                        <p>Crime</p>
                    </div>
                    <div className="Story-card">
                        <img src={img4} alt="Horror" className='img-1' />
                        <p>Horror</p>
                    </div>
                    <div className="Story-card">
                        <img src={img5} alt="Romantic" className='img-1' />
                        <p>Romantic</p>
                    </div>
                    <div className="Story-card">
                        <img src={img6} alt="Fantasy" className='img-1' />
                        <p>Fantasy</p>
                    </div>
                </div>
            </section>

            <section className="Customized-story">
                <h2 className='h2-2'>Customized Story</h2>
                <div className="How-it-works">
                    <div className="How-it-works-step">
                        <h3>Create or Join a Story</h3>
                        <p className='p-2'>
                            Start a new story from scratch or join an existing one. Every story is a collaborative effort,
                            brought to life by multiple authors with diverse voices and ideas.
                        </p>
                    </div>
                    <div className="How-it-works-step">
                        <h3>Write Your Chapter</h3>
                        <p>
                            Start a new story from scratch or join an existing one. Each story is a collaborative effort,
                            brought to life by multiple authors with diverse voices and ideas.
                        </p>
                    </div>
                    <div className="How-it-works-step">
                        <h3>Vote and Influence the Plot</h3>
                        <p>
                            Engage with other readers, writers, and fans. Vote by chapters and story directions.
                            Your voice will help determine the path the story takes, ensuring that every reader has a say in the tale.
                        </p>
                    </div>
                </div>
            </section>

            <section className="Challenges">
                <h2 className='h2-4'>Challenges</h2>
                <h2 className='h2-3'>How It Works</h2>

                <div className='challengesDiv'>

                    <div >
                        <img src={img7} alt='' className='imgDiv'/>
                    </div>

                    <div className="Challenges-steps">
                    <div className="row  mt-3">
                    <div className="col-3">
                      <label onClick={toggleDropdown}>
                        <div>
                        <h6> Step 1</h6>
                        <label><IoMdArrowDropdown/></label>
                        </div>
                      </label>
                      {dropdownVisible && (
                          <div className="dropdown_menu sidebar_dash_drop">
                              <div className="reader-home-step1">
                                  <h5>Add Challenge</h5>
                                  <label>Each writer can come up with
                                  their challenge ideas that 
                                  motivate and inspires others</label>
                                
                              </div>
                          </div>
                      )}
                    </div>
                    <div className="col-3">
                      <label onClick={toggleDropdown2}>
                        <div>
                        <h6> Step 2</h6>
                        <label><IoMdArrowDropdown/></label>
                        </div>
                      </label>
                      {dropdownVisible2 && (
                          <div className="dropdown_menu sidebar_dash_drop">
                              <div className="reader-home-step1">
                                <h5>Choose a challenge</h5>
                                <label>Select the challenge 
                                that excites you the most</label>
                              </div>
                          </div>
                      )}
                    </div>
                    <div className="col-3">
                      <label onClick={toggleDropdown3}>
                        <div>
                        <h6> Step 3</h6>
                        <label><IoMdArrowDropdown/></label>
                        </div>
                      </label>
                      {dropdownVisible3 && (
                          <div className="dropdown_menu sidebar_dash_drop">
                              <div className="reader-home-step1">
                                <h5>Submit your update</h5>
                                <label>Post your updates daily 
                                and let others 
                                knew your participation</label>
                              </div>
                          </div>
                      )}
                    </div>
                    <div className="col-3">
                      <label onClick={toggleDropdown4}>
                        <div>
                        <h6> Step 4</h6>
                        <label><IoMdArrowDropdown/></label>
                        </div>
                      </label>
                      {dropdownVisible4 && (
                          <div className="dropdown_menu sidebar_dash_drop">
                              <div className="reader-home-step1">
                                <h5>Winner of the challenge</h5>
                                <label>Challenge winner will be announced after the end of the deadline of the challenge</label>
                              </div>
                          </div>
                      )}
                    </div>
                    </div>
                    </div>
                </div>
            </section>
        </div></div>
        <Footer/>
    </div>
  )
}

export default WriterHome