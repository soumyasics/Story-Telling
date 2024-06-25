import React from "react";
import AdminLoginMainNav from "../Pages/AdminLoginMainNav";
import AdminSidebar from "../Pages/AdminSidebar";
import AdminDashboardSub from "../Pages/AdminDashboardSub";

function AdminDashBoard() {
  return (
    <div className="admindashboardbackground">
      <AdminLoginMainNav />
     <div className="row">
        <div className="col-3"> <AdminSidebar/></div>
        <div className="col"><AdminDashboardSub/></div>
       </div>
    </div>
  );
}

export default AdminDashBoard;
