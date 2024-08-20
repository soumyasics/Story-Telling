import "./AdminLogin.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLoginform() {
  const [loginData, SetloginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const Adminemail = "admin@gmail.com";
  const Adminpassword = "Admin@123";
  let formValid = true;
  const change = (e) => {
    const { name, value } = e.target;
    SetloginData({ ...loginData, [name]: value });
  };
  console.log(loginData, "loginData");
  const formValidating = (fieldName, value) => {
    if (!value.trim()) {
      formValid=false
      return `${fieldName} is required`;
    }
    if (fieldName === "Email" && !value.endsWith("@gmail.com")) {
      formValid=false
      return "Email must be a valid Gmail address";
    }
    if (fieldName === "Password") {
    
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      if (!value.trim()) {
        formValid=false
        return `${fieldName} is required`;
      }
      if (!passwordRegex.test(value)) {
        formValid=false
        return "Password must contain at least one number,one special character, and one capital letter";
      }
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    formValid = true;
    errors.email = formValidating("Email", loginData.email);
    errors.password = formValidating("Password", loginData.password);

    setErrors(errors);

    // if (loginData.email && loginData.password) {
    //   formValid = true;
    // }
    console.log("form",formValid);
    
if(formValid){
    
      if (loginData.email == Adminemail) {
        if (loginData.password == Adminpassword) {
          localStorage.setItem("admin","admin")
          alert("Admin Login successfully ");
          navigate("/admindashboard");
        } else {
          alert("password is incorrect");
        }
      } else {
        alert("Incorrect Mail id");
      }
    }
  
  };

  return (
    <div className="adminloginbackgrount">
      <div className="r">
        <div className="adminloginbackgrountform">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                <b>Email address</b>
              </label>
              <input
                name="email"
                onChange={change}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              ></input>
               {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                <b>Password</b>
              </label>
              <input
                name="password"
                onChange={change}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              ></input>
               {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
            </div>
            <div className="text-end mt-4">
              {" "}
              <button type="submit" class="btn btn-dark px-5">
                LogIn{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginform;
