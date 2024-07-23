import AdminSidebar from '../Pages/AdminSidebar'
import '../Pages/AdminLogin.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";

function ViewChallengers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosInstance
          .post(`/viewChallenges`)
          .then((res) => {
            console.log(res.data.data);
            setData(res.data.data);
          })
          .catch((err) => {
            alert("Failed to fetch user details");
          });
      }, []);
  return (
    <div className='row'>
        <div className='col-3'>
            <AdminSidebar/>
        </div>
        <div className='col-9'>
            <h1 className='mt-5'>View Challengers</h1>
        {data.map((d)=>{
            return(<>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 view-challengers-title mt-3'>
                    <div className='row ms-5 pt-4'>
                        <div className='col-3'>Title</div>
                        <div className='col-1'>:</div>
                        <div className='col-8'>{d.title}</div>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 view-challengers-title mt-3'>
                    <div className='row ms-5 pt-4'>
                        <div className='col-3'>Challenge End Date</div>
                        <div className='col-1'>:</div>
                        <div className='col-8'>{d.endDate}</div>
                    </div>  
                </div>
                <div className='col-2'></div>
            </div>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 view-challengers-description mt-3'>
                    <div className='row ms-5 pt-4 me-3'>
                        <div className='col-3'>Description</div>
                        <div className='col-1'>:</div>
                        <div className='col-8 view-challengers-description-div'>
                            {d.description}
                        </div>
                        <div className='mt-5 pt-4 text-end'>
                        
                            <Link to={`/admindashviewchallengesTitle/${d._id}`}>
                                <button className='view-challengers-view-btn'>
                                    View More
                                </button>
                            </Link>
                        </div>
                    </div> 
                </div>
                <div className='col-2'></div>
            </div>
            </>)
        })}
            
        </div>
    </div>
  )
}

export default ViewChallengers
