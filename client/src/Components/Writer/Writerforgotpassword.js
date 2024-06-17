import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import { useNavigate,Link } from "react-router-dom";
import img1 from "../../Assets/Rectangle 44 (1).png"

function Writerforgotpassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Header />
      <div className="writerloginmain">
        <div className="writerloginsub">
          <div className="row">
            <div className="col-5">
              <img src={img1} alt="Placeholder"></img>
              

            </div>
          
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Writerforgotpassword;
