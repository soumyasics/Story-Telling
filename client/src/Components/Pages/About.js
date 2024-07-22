import React from "react";
import "./AboutUs.css";
import img from "../../Assets/unsplash_0eTLk6dA_Ds.png";
import img2 from "../../Assets/image 23.png";
import img3 from "../../Assets/image 24.png";
import img4 from "../../Assets/freepik-export-20240718074502Ari1 1.png";
import img5 from "../../Assets/diverse-group-smiles-teamwork-leads-success-generated-by-ai 1.png";
import img6 from "../../Assets/image 25.png";
import img7 from "../../Assets/image 26.png";
import img8 from "../../Assets/image 27.png";
import img9 from "../../Assets/image 28.png";

function AboutUs() {
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "130px",
            marginBottom: "150px",
          }}
        >
          <div className="AContainDiv">
            <h1 className="AboutUs-h1">
              Welcome to Collaborative Story Telling
            </h1>
            <h1 className="AboutUs-h1-2">
              At Collaborative Story Telling, we believe in the magic of
              storytelling and the power of community. Our mission is to create
              a platform where writers and readers come together to weave
              extraordinary tales
            </h1>
          </div>

          <div className="AContainDiv-2">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "548px",
              }}
            >
              <h1 className="AboutUs-h1-3">Our Vision</h1>
              <h1 className="AboutUs-h1-4">
                We envision a world where everyone has a voice and a story to
                tell. Whether you’re an aspiring writer, a seasoned author, or a
                passionate reader, Collaborative story telling is your canvas to
                create, collaborate, and explore.
              </h1>
              <h1 className="AboutUs-h1-3">Our Story</h1>
              <h1 className="AboutUs-h1-4">
                Collaborative Story Telling was born from the love of stories
                and the desire to create a space where creativity knows no
                bounds. Founded by a group of literature enthusiasts and tech
                innovators, we wanted to bridge the gap between writers and
                readers, fostering a collaborative environment that celebrates
                storytelling in all its forms.
              </h1>
            </div>

            <div>
              <img src={img} alt="" />
            </div>
          </div>

          <div className="AContainDiv-3">
            <h1 className="AboutUs-h1-3">What We Offer</h1>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                width: "991px",
              }}
            >
              <div
                style={{
                  width: "466px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h1 className="AboutUs-h1-4">
                  Collaborative Storytelling: Writers can start a story, and
                  others can contribute chapters, creating a rich tapestry of
                  narratives woven by many hands.
                </h1>
              </div>

              <div>
                <img src={img2} alt="" />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                width: "991px",
              }}
            >
              <div>
                <img src={img3} alt="" />
              </div>

              <div
                style={{
                  width: "466px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h1 className="AboutUs-h1-4">
                  Writing Challenges: Engage in diverse writing challenges to
                  spark your creativity and improve your craft.
                </h1>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                width: "991px",
              }}
            >
              <div
                style={{
                  width: "466px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h1 className="AboutUs-h1-4">
                  Reader Participation: Readers can influence the story’s
                  direction by voting on chapters, leaving feedback, and
                  participating in community discussions.
                </h1>
              </div>

              <div>
                <img src={img4} alt="" />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                width: "991px",
              }}
            >
              <div>
                <img src={img5} alt="" />
              </div>

              <div
                style={{
                  width: "466px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h1 className="AboutUs-h1-4">
                  Community Engagement: Join a vibrant community of storytellers
                  and readers. Share ideas, give and receive feedback, and grow
                  together.
                </h1>
              </div>
            </div>
          </div>

          <div className="AContainDiv-4">
            <h1 className="AboutUs-h1-3">Our Core Values</h1>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  width: "266px",
                }}
              >
                <img src={img6} alt="" />
                <div>
                  <h1 className="AboutUs-h1-3-1">Creativity</h1>
                  <p className="AboutUs-h1-4-1">
                    We celebrate creativity and innovation, encouraging our
                    users to push the boundaries of traditional storytelling.
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  width: "266px",
                }}
              >
                <img src={img7} alt="" />
                <div>
                  <h1 className="AboutUs-h1-3-1">Collaboration</h1>
                  <p className="AboutUs-h1-4-1">
                    We believe in the power of collaboration, bringing together
                    diverse voices to create something unique and beautiful.
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  width: "266px",
                }}
              >
                <img src={img8} alt="" />
                <div>
                  <h1 className="AboutUs-h1-3-1">Inclusivity</h1>
                  <p className="AboutUs-h1-4-1">
                    Everyone is welcome at Collaborative Story Telling. We
                    strive to create a supportive and inclusive environment for
                    all our users.
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  width: "266px",
                }}
              >
                <img src={img9} alt="" />
                <div>
                  <h1 className="AboutUs-h1-3-1">Quality</h1>
                  <p className="AboutUs-h1-4-1">
                    We are committed to maintaining high standards in the
                    stories shared on our platform, ensuring an enriching
                    experience for readers and writers alike.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="AContainDiv-5">
            <h1 className="AboutUs-h1-3">Meet The Team</h1>
            <div className="AContainDiv-5-bg">
              <div className="AContainDiv-5-bg-over">
                <h1 className="AboutUs-h1-4-2">
                  Our team is composed of passionate individuals from various
                  backgrounds, united by a love for storytelling and technology.
                  From our developers and designers to our community managers
                  and support staff, we are dedicated to providing you with the
                  best experience possible.
                </h1>
              </div>
            </div>
          </div>

          <div className="AContainDiv-6">
            <h1 className="AboutUs-h1-3">Join Us On Our Journey</h1>

            <p className="AboutUs-h1-4-3">
              Whether you're here to write, read, or simply explore, we invite
              you to join us on this exciting journey. Together, we can create
              stories that inspire, entertain, and connect us all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
