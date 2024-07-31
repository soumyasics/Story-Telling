import React, { useState } from "react";
import "./AdminLogin.css";
import Adminimg from "../../Assets/Admin.png";
import Admindashboardimg from "../../Assets/dashboard.png";
import Adminarrow from "../../Assets/rightarrow.png";
import reader from "../../Assets/Vector (8).png";
import writer from "../../Assets/Vector (9).png";
import user from "../../Assets/ph_users-fill.png";
import Report from "../../Assets/Vector (11).png";
import Challengers from "../../Assets/Vector (12).png";
import { Link, useNavigate } from "react-router-dom";
import AdminDashBoard from "../Admin/AdminDashBoard";
function AdminSidebar() {
  const navigate = useNavigate();

  
  const AdminDashBoardicon = () => {
    navigate("/admindashboard");
  };
  const AllWriters = () => {
    navigate("/writers");
  };
  const AllReaders = () => {
    navigate("/readers");
  };
  const writerviewchallenge = () => {
    navigate("/admindashviewchallengers");
  };

  const writerrequest= () => {
    navigate("/request");
  };

  const writerLogout = () => {
    localStorage.removeItem('admin')
    setTimeout(() => {
      navigate("/adminlogin");
    }, 3000);
    alert("logged out successfully")
     
    
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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

        <div className="pt-3">
          <div onClick={AdminDashBoardicon}>
            <img src={Admindashboardimg} className="ms-4"></img>
            <label className="ms-2 admin-sidebar-dash ">Dashboard</label>
            <img className="admin-sidebar-dash-img" src={Adminarrow}></img>
          </div>
        </div>

        <div className="fs-3 text-light ms-4 mt-5">Menu</div>

        <div className="pt-3">
          <div onClick={AllReaders}>
            <img src={reader} className="ms-4"></img>
            <label className="ms-2 admin-sidebar-dash ">Readers</label>
            <img
              className="admin-sidebar-dash-img-reader"
              src={Adminarrow}
            ></img>
          </div>
        </div>

        <div className="pt-3">
          <div onClick={AllWriters}>
            <img src={writer} className="ms-4"></img>
            <label className="ms-2 admin-sidebar-dash ">Writers</label>
            <img
              className="admin-sidebar-dash-img-writer"
              src={Adminarrow}
            ></img>
          </div>
        </div>

        <div className="pt-3">
          <div onClick={writerrequest}>
            <img src={writer} className="ms-4"></img>
            <label className="ms-2 admin-sidebar-dash ">Writers Request</label>
            <img
              className="ms-5 ps-3"
              src={Adminarrow}
            ></img>
          </div>
        </div>

        <div className="pt-3">
          <div onClick={writerviewchallenge}>
            <img src={Report} className="ms-4"></img>
            <label className="ms-2 admin-sidebar-dash ">Challenges</label>
          </div>
        </div>

        <div className="pt-3">
          <div className="pt-3">
            
            <div className="pt-3">
              <div onClick={writerLogout}>
                <img src={user} className="ms-4"></img>
                <label className="ms-2 admin-sidebar-dash ">Logout</label>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
