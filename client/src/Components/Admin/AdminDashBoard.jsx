import React from "react";
import AdminLoginMainNav from "../Pages/AdminLoginMainNav";
import AdminSidebar from "../Pages/AdminSidebar";
import AdminDashboardSub from "../Pages/AdminDashboardSub";

function AdminDashBoard() {
  return (
    <div className="admindashboardbackground">
      <AdminLoginMainNav />
     <div className="row">
        <div className="col-4"> <AdminSidebar/></div>
        <div className="col-8"><AdminDashboardSub/></div>
       </div>
    </div>
  );
}

export default AdminDashBoard;
