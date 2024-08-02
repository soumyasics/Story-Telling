import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../../Assets/Rectangle 44 (1).png";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function WriterResetPassword() {
  const [data, setData] = useState({
    
    newpassword: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    
    newpassword: "",
    confirmpassword: "",
  });

  const Navigate = useNavigate();

  const formValidating = (fieldName, value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }

    if (fieldName === "newpassword") {
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(value)) {
        return "Password must contain at least one number, one special character, and one capital letter";
      }
    }

   
    return "";
  };
  const navigate=useNavigate()

  const id=localStorage.getItem("writer")
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
    let formIsValid = true;
    let validationErrors = {};


    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;

    if (!data.newpassword || !data.newpassword.trim()) {
      formIsValid = false;
      validationErrors.newpassword = "New Password is required";
    } else if (!passwordRegex.test(data.newpassword)) {
      formIsValid = false;
      validationErrors.newpassword =
        "Password must contain at least one number, one special character, and one capital letter";
    }

    if (!data.confirmpassword || !data.confirmpassword.trim()) {
      formIsValid = false;
      validationErrors.confirmpassword = "Confirm Password is required";
    } else if (data.confirmpassword !== data.newpassword) {
      formIsValid = false;
      validationErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (formIsValid) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      console.log(formData, "p");
      axiosInstance
        .post("/reset-password/"+id, data, )
        .then((result) => {
          console.log(result);
          alert(result.data.msg);
          navigate("/login")
        })
        .catch((err) => {
          const errorMsg =
            err.response && err.response.data && err.response.data.msg
              ? err.response.data.msg
              : "An error occurred. Please try again.";
          alert(errorMsg);
        });
    }}

  return (
    <div>
      {" "}
      <div>
        <Header />
        <div className="writerloginmain">
          <div className="writerloginsub">
            <div className="row">
              <div className="col-5">
                <img src={img1} alt="Placeholder"></img>
                </div>
                <div className="col-5  mx-5 text-center ">
                <h4 className="m-5 text-center">Forgot Password</h4>
                
                  {/*<select
                    className="form-control custom-input"
                    name="userrole"
                    onChange={handleInputChange}
                    id="custom-input"
                  >
                    <option value="">Choose user category</option>
                    <option value="writer">writer</option>
                    <option value="reader">reader</option>
                  </select>
                  {errors.userrole && (
                    <div className="text-danger">{errors.userrole}</div>
                  )}*/}
                <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Enter New Password"
                    name="newpassword"
                    onChange={handleInputChange}
                    id="custom-input"
                  />
                  {errors.newpassword && (
                    <div className="text-danger">{errors.newpassword}</div>
                  )}
                  <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Confirm password"
                    name="confirmpassword"
                    onChange={handleInputChange}
                    id="custom-input"
                  />
                  {errors.confirmpassword && (
                    <div className="text-danger">{errors.confirmpassword}</div>
                  )}
                 
                  <button className="btn btn-secondary" onClick={handleSubmit}> Reset Password</button>
                </div>
              </div>
              </div>
            </div>
        <Footer />
      </div>
    </div>
  );
}

export default WriterResetPassword;
