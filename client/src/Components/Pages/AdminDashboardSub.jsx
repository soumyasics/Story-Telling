import React from "react";
import writer from "../../Assets/Vector (9).png";
import user from "../../Assets/ph_users-fill.png";
import reader from "../../Assets/Vector (8).png";

import { AreaChart, Area } from "recharts";

function AdminDashboardSub() {
  const productSales = [
    {
      name: "jan",
      reader: 100,
      writer: 100,
    },
    {
      name: "jan",
      reader: 200,
      writer: 500,
    },
    {
      name: "jan",
      reader: 50,
      writer: 600,
    },
    {
      name: "jan",
      reader: 100,
      writer: 50,
    },
    {
      name: "jan",
      reader: 100,
      writer: 200,
    },
  ];
  return (
    <div>
      <h3 className="mt-5">Dashboard</h3>
      <div className="row mt-4">
        <div className=" col-3">
          <div className="card">
            <p className="p-2">Readers Count</p>
            <div className="row ms-3">
              <div className="col-6">
                <h1>1234</h1>
              </div>
              <div className="col-6">
                <img className="w-25" src={reader}></img>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <p className="p-2">Writers Count</p>
            <div className="row ms-3">
              <div className="col-6">
                <h1>1234</h1>
              </div>
              <div className="col-6">
                <img className="w-25" src={writer}></img>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-3">
          <div className="card">
            <p className="p-2">Requests</p>
            <div className="row ms-3">
              <div className="col-6">
                <h1>1234</h1>
              </div>
              <div className="col-6">
                <img className="w-25" src={user}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="mt-4">
          <AreaChart width={1000} height={400} data={productSales}>
            <Area type={"monotone"} dataKey="reader" />
            <Area type={"monotone"} dataKey="writer" />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardSub;
