import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./editorlogin.css";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import img1 from "../../Assets/Rectangle 44 (1).png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function WriterLogin({ userrole }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();

  const formValidating = (fieldName, value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }

    if (fieldName === "email" && !value.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address";
    }

    if (fieldName === "password") {
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(value)) {
        return "Password must contain at least one number, one special character, and one capital letter";
      }
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
    if (!data.password) formErrors.password = "Password Required";

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    let errors = {
      email: formValidating("Email", data.email),
      password: formValidating("Password", data.password)
    };
    setErrors(errors);
  
    if (!errors.email && !errors.password) {
      const apiEndpoint = userrole === "Writer" ? "/login" : "/loginReader";
  
      axiosInstance
        .post(apiEndpoint, data)
        .then((result) => {
          console.log(result, "Response received");
  
          if (result.data.status === 405) {
            alert(result.data.msg);
            return;
          }
  
          const userData = result.data.data;
          const userCategory = userData.userCategory;
  
          if (userCategory === "reader") {
            if (userData.adminApproved==true) {
              alert("Login Success")
              localStorage.setItem("token", result.data.token);
              localStorage.setItem("reader", userData._id);
              setTimeout(() => {
                Navigate("/readerhome");
              }, 1500);
            } else {
              alert("Waiting for admin approval");
            }
          } else if (userCategory === "writer") {
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("writer", userData._id)
            if (userData.adminApproved == true) {
              if (userData.paymentStatus == true) {
                alert("Login Success")
               
                setTimeout(() => {
                  
                  Navigate("/writerhome");
                }, 1500);
              } else {
                setTimeout(() => {
                  Navigate("/upgradetowriter");
                }, 1500);
              }
            } else {
              alert("Waiting for admin approval");
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 405) {
            alert(error.response.data.msg);
          } else {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
          }
        });
    }
  };
  

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
              <h4 className="m-5 text-center"> Login Here!</h4>

              <div className="text-center mx-5 ">
                <input
                  type="email"
                  id="custom-input"
                  className="form-control custom-input"
                  placeholder="Email"
                  onChange={handleInputChange}
                  name="email"
                />{" "}
                {errors.email && (
                  <span className="span-required text-danger">
                    {errors.email}
                  </span>
                )}
                <input
                  type="password"
                  id="custom-input"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                />{" "}
                {errors.password && (
                  <span className="span-required text-danger">
                    {errors.password}
                  </span>
                )}
                <div className="text-end mb-5">
                  {" "}
                  <Link className="" to="/forgot">
                    Forgot password
                  </Link>
                </div>
              </div>

              <div className="text-center">
                {" "}
                <div className="btn btn-secondary px-5 " onClick={handleSubmit}>
                  {" "}
                  LogIn
                </div>
                <div className="mt-4">
                  New user?,<Link to="/register">Register</Link>
                  Here!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WriterLogin;

// if (a == reader) {
//   if (result.data.status === 405) {
//     alert(result.data.msg);
//   } else {
//     if (isActive == true) {
//       localStorage.setItem("token", result.data.token);
//       localStorage.setItem("writer", result.data.data._id);
//       setTimeout(() => {
//         Navigate("/readerhome");
//       }, 1500);
//     } else {
//       alert("waiting for admin aproval");
//     }
//   }
// } else {
//   if (a === writer) {
//     if (result.data.status === 405) {
//       alert(result.data.msg);
//     } else {
//       if (isActive == true) {
//         if (payment == true) {
//           localStorage.setItem("token", result.data.token);
//           localStorage.setItem("writer", result.data.data._id);
//           setTimeout(() => {
//             Navigate("/writerhome");
//           }, 1500);
//         } else {
//           setTimeout(() => {
//             Navigate("/upgrade");
//           }, 1500);
//         }
//       } else {
//         alert("waiting for admin");
//       }
//     }
//   }
// }
