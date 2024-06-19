import React, { useState } from "react";
import "./editorregister.css";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import img1 from "../../Assets/Rectangle 44 (1).png";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function WriterRegister({userrole}) {
  const [data, setData] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    password: "",
    profilePicture: "",
    userCategory: userrole,
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    password: "",
    profilePicture: "",
    userCategory: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setData((prevData) => ({
        ...prevData,
        profilePicture: files[0],
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        profilePicture: "",
      }));
    }
  };
  const validateField = (fieldName, value) => {
    if (typeof value === "string" && !value.trim()) {
      return `${fieldName} is required`;
    }
    if (fieldName === "email" && !value.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address.";
    }
    return "";
  };

  const validateContact = (fieldName, value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (value.length !== 10) {
      return "Please enter a valid Contact Number";
    }
    return "";
  };

  const WriterrRegisterChange = (event) => {
    console.log("kkk");
    event.preventDefault();
    let formIsValid = true;
    let validationErrors = {};

    Object.keys(data).forEach((key) => {
      if (key === "contact") {
        validationErrors[key] = validateContact(key, data[key]);
      } else {
        validationErrors[key] = validateField(key, data[key]);
      }
      if (validationErrors[key]) {
        formIsValid = false;
      }
    });

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;

    if (!data.password || !data.password.trim()) {
      formIsValid = false;
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      formIsValid = false;
      validationErrors.password =
        "Password must contain at least one number, one special character, and one capital letter";
    }

    if (!data.confirmpassword || !data.confirmpassword.trim()) {
      formIsValid = false;
      validationErrors.confirmpassword = "Confirm Password is required";
    } else if (data.confirmpassword !== data.password) {
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
      const apiendpoint =
        userrole === "writer" ? "/registerWriter" : "/registerReader";
      axiosInstance
        .post(apiendpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result);
          alert(result.data.msg);
          if(result.data.status==200){
            navigate("/writerlogin")
        }else{
          
        }})
        .catch((err) => {
          const errorMsg =
            err.response && err.response.data && err.response.data.msg
              ? err.response.data.msg
              : "An error occurred. Please try again.";
          alert(errorMsg);
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
              <img src={img1} alt="Placeholder" />
            </div>
            <div className="col-6">
              <h4 className="m-5 text-center">Register Now!</h4>
              <div className="row mt-5">
                <div className="col-6">
                  <input
                    id="custom-input"
                    type="text"
                    className="form-control custom-input"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    id="custom-input"
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                  <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Enter Password"
                    name="password"
                    onChange={handleChange}
                    id="custom-input"
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                  <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Confirm password"
                    name="confirmpassword"
                    onChange={handleChange}
                    id="custom-input"
                  />
                  {errors.confirmpassword && (
                    <div className="text-danger">{errors.confirmpassword}</div>
                  )}
                </div>
                <div className="col-6">
                  <input className="form-control custom-input"
                  name="userCategory"
                  id="custom-input" value={userrole} disabled></input>
                 
                  <input
                    type="number"
                    className="form-control custom-input"
                    placeholder="Phone Number"
                    name="contact"
                    onChange={handleChange}
                    id="custom-input"
                  />
                  {errors.contact && (
                    <div className="text-danger">{errors.contact}</div>
                  )}
                  <input
                    type="number"
                    className="form-control custom-input"
                    placeholder="Age"
                    name="age"
                    onChange={handleChange}
                    id="custom-input"
                  />
                  {errors.age && (
                    <div className="text-danger">{errors.age}</div>
                  )}
                  <div className="custom-file-input">
                    <label htmlFor="profilePicture" className="file-label">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      className="file-input"
                      name="profilePicture"
                      onChange={handleFileChange}
                    />
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        document.getElementById("profilePicture").click()
                      }
                    >
                      Upload
                    </button>
                  </div>
                  {errors.profilePicture && (
                    <div className="text-danger">{errors.profilePicture}</div>
                  )}
                </div>
              </div>
              <div className="text-center mt-2">
                <button
                  className="btn btn-secondary px-5 py-2 mt-2"
                  onClick={WriterrRegisterChange}
                >
                  Register
                </button>
                <div className="mt-5">
                  If already registered,  {userrole=="writer"? <Link to="/writerlogin">Login</Link>:<Link to="/readerlogin">login</Link>}{" "}
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

export default WriterRegister;
