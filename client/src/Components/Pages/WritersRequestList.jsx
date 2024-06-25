import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function WritersRequestList() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    axiosInstance
      .post("/viewWriterReqsforAdmin")
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, []);

  const handleAccept = (id) => {
    axiosInstance
      .post("/acceptWriterById/" + id)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  };

  const handleReject = (id) => {
    axiosInstance
      .post("/rejectWriterById/" + id)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
        }
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {" "}
      <div>
        <div className=" container pt-5">
          <div>
            <h2>Requests</h2>
            <table className="table  mt-5">
              <thead>
                <tr className="" style={{ borderRadius: "25px" }}>
                  <th
                    style={{ backgroundColor: " rgb(14, 163, 135)" }}
                    scope="col"
                  >
                    Name
                  </th>
                  <th
                    style={{ backgroundColor: " rgb(14, 163, 135)" }}
                    scope="col"
                  >
                    Mail I’d
                  </th>
                  <th
                    style={{ backgroundColor: " rgb(14, 163, 135)" }}
                    scope="col"
                  >
                    Accept/Declain
                  </th>
                  <th
                    style={{ backgroundColor: " rgb(14, 163, 135)" }}
                    scope="col"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((data) => {
                    return (
                      <tr>
                        <th
                          style={{ backgroundColor: "rgb(186, 230, 221)" }}
                          scope="row"
                        >
                          {data.name}
                        </th>
                        <td style={{ backgroundColor: "rgb(186, 230, 221)" }}>
                          {data.email}
                        </td>
                        <td style={{ backgroundColor: "rgb(186, 230, 221)" }}>
                          <button onClick={() => handleAccept(data._id)}>
                            Accept
                          </button>
                          <button onClick={() => handleReject(data._id)}>
                            Reject
                          </button>
                        </td>
                        <td style={{ backgroundColor: "rgb(186, 230, 221)" }}>
                          View
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h1>No Records</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>{" "}
        <p style={{ color: "rgba(52, 133, 208, 1)" }} className="text-end">
          {/* View All <img src={arrow}></img> */}
        </p>
      </div>
    </div>
  );
}

export default WritersRequestList;
