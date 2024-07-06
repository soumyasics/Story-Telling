import React, { useState, useEffect } from "react";
import writer from "../../Assets/Vector (9).png";
import user from "../../Assets/ph_users-fill.png";
import reader from "../../Assets/Vector (8).png";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function AdminDashboardSub() {
  const productSales = [
    {
      name: "Jan",
      reader: 100,
      writer: 100,
    },
    {
      name: "Feb",
      reader: 200,
      writer: 500,
    },
    {
      name: "Mar",
      reader: 50,
      writer: 200,
    },
    {
      name: "Apr",
      reader: 100,
      writer: 50,
    },
    {
      name: "May",
      reader: 100,
      writer: 200,
    },
    {
      name: "jun",
      reader: 50,
      writer: 300,
    },
    {
      name: "jul",
      reader: 100,
      writer: 50,
    },
    {
      name: "Agu",
      reader: 200,
      writer: 200,
    },{
      name: "Sep",
      reader: 50,
      writer: 600,
    },
    {
      name: "oct",
      reader: 100,
      writer: 50,
    },
    {
      name: "nov",
      reader: 100,
      writer: 200,
    },
    {
      name: "dec",
      reader: 100,
      writer: 300,
    },
  ];

  const [readers, setReaders] = useState([]);
  const [writers, setWriters] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosInstance.post("/viewWriterReqsforAdmin")
      .then((response) => {
        console.log(response, "Writer Requests");
        if (response.data.data != null) setRequests(response.data.data);
        else setRequests([]);
      })
      .catch((error) => {
        console.error("Failed to fetch writer requests:", error);
      });

    axiosInstance.post("/viewWriters")
      .then((response) => {
        console.log(response, "Writers");
        if (response.data.data != null) setWriters(response.data.data);
        else setWriters([]);
      })
      .catch((error) => {
        console.error("Failed to fetch writers:", error);
      });

    axiosInstance.post("/viewallreaders")
      .then((response) => {
        console.log(response.data.data, "Readers");
        if (response.data.data != null) setReaders(response.data.data);
        else setReaders([]);
      })
      .catch((error) => {
        console.error("Failed to fetch readers:", error);
      });
  }, []);

  return (
    <div>
      <h3 className="mt-5">Dashboard</h3>
      <div className="row mt-4">
        <div className=" col-3">
          <div className="card">
            <p className="p-2">Readers Count</p>
            <div className="row ms-3">
              <div className="col-6">
                <h1>{readers.length}</h1>
              </div>
              <div className="col-6">
                <img className="w-25" src={reader} alt="Reader Icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <p className="p-2">Writers Count</p>
            <div className="row ms-3">
              <div className="col-6">
                <h1>{writers.length}</h1>
              </div>
              <div className="col-6">
                <img className="w-25" src={writer} alt="Writer Icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <p className="p-2">Requests</p>
            <div className="row ms-3">
              <div className="col-6">
                <h1>{requests.length}</h1>
              </div>
              <div className="col-6">
                <img className="w-25" src={user} alt="Request Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="mt-4">
          <AreaChart width={1000} height={400} data={productSales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="reader" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="writer" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardSub;
