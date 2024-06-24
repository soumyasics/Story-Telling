import "./AdminLogin.css";
import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";

function AdminLoginform() {




  return (
    <div className="adminloginbackgrount">
      <div className="r">
        <div className="adminloginbackgrountform">
          <form >
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                <b>Email address</b>
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              ></input>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                <b>Password</b>
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              ></input>
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
