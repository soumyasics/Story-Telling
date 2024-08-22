import React from "react";
import AdminSidebar from "../Pages/AdminSidebar";
import WritersRequestList from "../Pages/WritersRequestList";
import AdminLoginMainNav from "../Pages/AdminLoginMainNav";

function Requests({url}) {
    console.log(url);
  return (
    <div>
        <AdminLoginMainNav/>
      <div className="row">
        <div className="col-4"><AdminSidebar/></div>
        <div className="col-8"><WritersRequestList url={url} /></div>

      </div>
    </div>
  );
}

export default Requests;
