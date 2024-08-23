import React from "react";
import WriterList from "../Pages/WriterList";
import AdminSidebar from "../Pages/AdminSidebar";
import AdminLoginMainNav from "../Pages/AdminLoginMainNav";

function AdminviewWriters({url}) {
  return (
    <div>
        <AdminLoginMainNav/>
      <div className="row">
        <div className="col-4"><AdminSidebar/></div>
        <div className="col-8"><WriterList url={url} /></div>

      </div>
    </div>
  );
}

export default AdminviewWriters;
