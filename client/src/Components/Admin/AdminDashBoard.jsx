import React from "react";
import AdminLoginMainNav from "../Pages/AdminLoginMainNav";
import AdminSidebar from "../Pages/AdminSidebar";

function AdminDashBoard() {
  return (
    <div className="admindashboardbackground">
      <AdminLoginMainNav />
     <div className="row">
        <div className="col-3"> <AdminSidebar/></div>
        <div className="col-8 ms-5">klouihuygu</div>
       </div>
    </div>
  );
}

export default AdminDashBoard;
