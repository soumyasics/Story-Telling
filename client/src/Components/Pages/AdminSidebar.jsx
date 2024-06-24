import React from "react";
import "./AdminLogin.css";
import Adminimg from "../../Assets/Admin.png";
import Admindashboardimg from "../../Assets/dashboard.png";
function AdminSidebar() {
  return (
    <div className="adminsidebarmain">
      <div>
        <div className="row pt-3 ps-3">
          <div className="col-2 ">
            <img src={Adminimg}></img>
          </div>
          <div className="col-3 mt-2 text-light">
            <label className="fs-3">Administrator</label>
          </div>
        </div>

        <hr className="text-light"></hr>
        <div className="fs-3 text-light ms-4">Admin</div>
        <div className="sidebardashboard p-2 ">
          <img src={Admindashboardimg}></img>Dashboard
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
