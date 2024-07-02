import React from "react";
import "./AdminLogin.css";
import Adminimg from "../../Assets/Admin.png";
import Admindashboardimg from "../../Assets/dashboard.png";
import Adminarrow from "../../Assets/rightarrow.png";
import reader from "../../Assets/Vector (8).png";
import writer from "../../Assets/Vector (9).png";
import user from "../../Assets/ph_users-fill.png";
import Report from "../../Assets/Vector (11).png";
import Challengers from "../../Assets/Vector (12).png";
import { useNavigate } from "react-router-dom";
import AdminDashBoard from "../Admin/AdminDashBoard";
function AdminSidebar() {
  const navigate = useNavigate();

  const writerRequest = () => {
    navigate("/request");
  };
  const AdminDashBoardicon = () => {
    navigate("/admindashboard");
  };
  const AllWriters = () => {
    navigate("/writers");
  };

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
        <div className="row sidebardashboard p-1 ms-2 ">
          <div className="col-10" onClick={AdminDashBoardicon}>
            <img src={Admindashboardimg} className="ms-3"></img>
            <label className="ms-2 ">
              <b>Dashboard</b>
            </label>
          </div>
          <div className="col-2">
            {" "}
            <img className="" src={Adminarrow}></img>
          </div>
        </div>
        <div className="fs-3 text-light ms-4 my-3">Menu</div>
        <div className="row sidebardashboard p-1 ms-2 ">
          <div className="col-10">
            <img src={reader} className="ms-3"></img>
            <label className="ms-2 mt-2">
              <b>Readers</b>
            </label>
          </div>
          <div className="col-2">
            {" "}
            <img className="" src={Adminarrow}></img>
          </div>
        </div>
        <div className="row sidebardashboard p-1 ms-2 ">
          <div className="col-10" onClick={AllWriters}>
            <img src={writer} className="ms-3"></img>
            <label className="ms-2 mt-2">
              <b>Writers</b>
            </label>
          </div>
          <div className="col-2">
            {" "}
            <img className="" src={Adminarrow}></img>
          </div>
        </div>
        <div className="row sidebardashboard text-center p-1 ms-2">
          <div className="col-10">
            <img src={user} className="ms-3"></img>
            <label className="ms-2 mt-2">
              <b>Readers Requests</b>
            </label>
          </div>
          <div className="col-2">
            {" "}
            <img className="" src={Adminarrow}></img>
          </div>
        </div>
        <div className="row sidebardashboard p-1 ms-2 ">
          <div className="col-10" onClick={writerRequest}>
            <img src={user} className="ms-3"></img>
            <label className="ms-2 mt-2">
              <b>Writers Requests</b>
            </label>
          </div>
          <div className="col-2">
            {" "}
            <img className="" src={Adminarrow}></img>
          </div>
        </div>
        <div className="row sidebardashboard p-1 ms-2 ">
          <div className="col-10">
            <img src={Report} className="ms-3"></img>
            <label className="ms-2 mt-2">
              <b>Reports</b>
            </label>
          </div>
          <div className="col-2">
            {" "}
            <img className="" src={Adminarrow}></img>
          </div>
        </div>
        <div className="row sidebardashboard p-1 ms-2 ">
          <div className="col-10">
            <img src={Challengers} className="ms-3"></img>
            <label className="ms-2 mt-2">
              <b>Challengers</b>
            </label>
          </div>
          <div className="col-2">
            {" "}
            <img className="" src={Adminarrow}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
