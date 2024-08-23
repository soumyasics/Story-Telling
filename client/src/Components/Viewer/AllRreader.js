import React, { useState, useEffect } from "react";
import AdminSidebar from "../Pages/AdminSidebar";
import AdminLoginMainNav from "../Pages/AdminLoginMainNav";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";
import ReactPaginate from 'react-paginate';

const itemsPerPage = 5;

function AllReader() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setLoading(true);
    axiosInstance
      .post("/viewallreaders")
      .then((res) => {
        console.log(res, "");
        if (res.status === 200) {
          setData(res.data.data||[]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch readers:", err);
        alert("Failed to fetch readers. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <AdminLoginMainNav />
      <div className="row">
        <div className="col-4">
          <AdminSidebar />
        </div>
        <div className="col-8">
          <div className="m-3">
            <div className="shopownerpendingrequestdiv">
              <div>
                {loading ? (
                  <h1 className="text-center">Loading...</h1>
                ) : (
                  <div>
                    {data?.length === 0 ? (
                      <h1 className="text-center">No Readers Found</h1>
                    ) : (
                      <div>
                        <h3 className="text-center pt-4">All Readers</h3>
                        <div
                          className="row rounded-pill m-5 p-2"
                          style={{ backgroundColor: "rgb(186, 230, 221)" }}
                        >
                          <div className="col-1">
                            <b>Readers</b>
                          </div>
                          <div className="col-2">
                            <b>Name</b>
                          </div>
                          <div className="col-4">
                            <b>Mail Id</b>
                          </div>
                          <div className="col-2">
                            <b>Contact</b>
                          </div>
                          <div className="col-1">
                            <b>Age</b>
                          </div>
                        </div>
                        {paginatedData.map((item) => (
                          <div
                            key={item._id}
                            className="row rounded-pill m-5 p-2"
                            style={{ backgroundColor: "rgb(186, 230, 221)" }}
                          >
                            <div className="col-1">
                              <img
                                className="text-center rounded-pill me-1"
                                alt="img"
                                style={{ width: "40px", height: "40px" }}
                                src={`${imageUrl}/${item.profilePicture?.filename ? item.profilePicture.filename : item.profilePicture}`}
                              />
                            </div>
                            <div className="col-2">{item.name}</div>
                            <div className="col-4">{item.email}</div>
                            <div className="col-2">{item.contact}</div>
                            <div className="col-1">{item.age}</div>
                          </div>
                        ))}
                        <ReactPaginate
                          previousLabel={'Previous'}
                          nextLabel={'Next'}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination justify-content-center'}
                          activeClassName={'active'}
                          pageClassName={'page-item'}
                          pageLinkClassName={'page-link'}
                          previousClassName={'page-item'}
                          previousLinkClassName={'page-link'}
                          nextClassName={'page-item'}
                          nextLinkClassName={'page-link'}
                          breakLinkClassName={'page-link'}
                          activeLinkClassName={'bg-purple text-white'}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllReader;
