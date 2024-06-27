import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../../Assets/Rectangle 44 (1).png";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function Writerforgotpassword() {
  const [data, setData] = useState({
    email: "",
  });  const [errors, setErrors] = useState({
    email: "",
  });


  const formValidating = (fieldName, value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }

    if (fieldName === "email" && !value.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address";
    }

    return "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const validateForm = () => {
    let formErrors = {};

    if (!data.email) formErrors.email = "Email Required";

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    let errors = {};
    errors.email = formValidating("Email", data.email);
    setErrors(errors);

    if (!errors.email) {
      axiosInstance
        .post("/forgotPassword", {email:data.email})
        .then((result) => {
          console.log(result);
          if (result.data.status == 200) {
            alert("We have sent an password reset link to your email");
          } else {
            alert(result.data.msg);
          }
        })
        .catch((err) => {
          const errorMsg =
            err.response && err.response.data && err.response.data.msg
              ? err.response.data.msg
              : "An error occurred. Please try again.";
          alert(errorMsg);
        });
  };
  }

  // const handleSubmit = () => {
  //   var email = document.getElementById("email").value;
  //   axiosInstance
  //     .post("/forgotPasswordWriter", { email: email })
  //     .then((result) => {
  //       console.log(result);
  //       if (result.data.status == 200) {
  //         alert("We have sent an password reset link to your email");
  //       } else {
  //         alert(result.data.msg);
  //       }
  //     })
  //     .catch((err) => {
  //       const errorMsg =
  //         err.response && err.response.data && err.response.data.msg
  //           ? err.response.data.msg
  //           : "An error occurred. Please try again.";
  //       alert(errorMsg);
  //     });
  // };
  // }
  return (
    <div>
      <Header />
      <div className="writerloginmain">
        <div className="writerloginsub">
          <div className="row">
            <div className="col-5">
              <img src={img1} alt="Placeholder"></img>
            </div>
            <div className="col-6">
              <h4 className="m-5 text-center"> Forgot Password !</h4>

              <div className="text-center mx-5 ">
                <input
                  type="email"
                  id="custom-input"
                  className="form-control custom-input"
                  placeholder="Enter Registered Mail ID"
                  name="email"
                  required
                  onChange={handleInputChange}
                />{" "} {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
               
                <button className="btn btn-secondary" onClick={handleSubmit}> Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Writerforgotpassword;
