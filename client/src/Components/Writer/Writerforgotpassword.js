import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import { useNavigate,Link } from "react-router-dom";
import img1 from "../../Assets/Rectangle 44 (1).png"
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function Writerforgotpassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    var email = document.getElementById('email').value;
    axiosInstance
        .post("/forgotPasswordWriter", {'email': email})
        .then((result) => {
         console.log(result);
         if (result.data.status == 200) {
          alert('We have sent an password reset link to your email')
         } else {
          alert(result.data.msg)
         }
        })
        .catch((err) => {
          
          const errorMsg =
            err.response && err.response.data && err.response.data.msg
              ? err.response.data.msg
              : "An error occurred. Please try again.";
          alert(errorMsg);
        });
  }

  return (
    <div>
      <Header />
      <div className="writerloginmain">
        <div className="writerloginsub">
          <div className="row">
            <div className="col-5">
              <img src={img1} alt="Placeholder"></img>
              <input id='email' type="email"></input>
              <button onClick={handleSubmit}> submit</button>
              </div>
          
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Writerforgotpassword;
