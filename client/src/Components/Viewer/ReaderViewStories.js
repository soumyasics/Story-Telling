import React, { useState, useEffect } from "react";
import "../Writer/Writer.css";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import Drama from "../../Assets/Drama.png";
import Crime from "../../Assets/Crime.png";
import Horror from "../../Assets/Horror.png";
import Romance from "../../Assets/Romance.png";
import Fantasy from "../../Assets/Fantasy.png";

function ReaderViewStories({ url }) {
  const [data, setData] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [sel, setSel] = useState('border border-primary border-5');
  const [filter, setFilter] = useState({
    type: null,
    category: null,
  });
  const navigate = useNavigate();
  const [id, setId] = useState(localStorage.getItem("reader"));

  useEffect(() => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("writer") == null
    ) {
      navigate("/");
    }
  }, [navigate]);

  const [writerdata, setWriterData] = useState({
    profilePicture: { filename: "" },
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewReaderById/${id}`)
      .then((res) => {
        setWriterData(res.data.data);
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });

    axiosInstance
      .post(`/viewAllStories`)
      .then((res) => {
        console.log(res.data.data, "viewAllStories");
        const publishedStories = res.data.data.filter(story => story.published);
        setData(publishedStories);
        setFilterResult(publishedStories);
      })
      .catch((err) => {
        alert("Failed to fetch user details");
      });
  }, []);

  useEffect(() => {

    var fData = data.filter((item) => {
      var c = filter.category ? item.storyCategory == filter.category : true;
      var t = filter.type ? item.type == filter.type : true;
      return c && t;
    });
    setFilterResult(fData);
  }, [filter]);

  const applyFilter = (f) => {

    const { type, category } = f;
    setFilter((d) => ({
      ...d,
      type: type ? type : d.type,
      category: category ? category : d.category,
    }));
  };


  const ViewDetailedStory=(storyid)=>{
    navigate("/readerview-one-customized-story/"+storyid)

  }
  return (
    <>
      <section className="container" style={{ minHeight: "100vh" }}>
        <div className="mt-5 writer-viewstory-navdiv">
          <div className="row">
            <div className="col-3 text-center">
              <img
                src={`${imageUrl}/${writerdata.profilePicture.filename}`}
                className="writer-viewstory-profileimg mt-3"
              ></img>
            </div>
            <div className="col">
              <h4 className="writer-viewstory-name">{writerdata.name}</h4>
            </div>
            <div className="col">
              <button
                className={`mt-4  writer-viewstory-readbtn ${filter.type == 'text' ? 'sel-btn' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  applyFilter({ type: "text" });
                }}
              >
                Read Stories
              </button>
            </div>
            <div className="col">
              <button
                className={`mt-4 writer-viewstory-listenbtn ${filter.type == 'audio' ? 'sel-btn2' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  applyFilter({ type: "audio" });
                }}
              >
                Listen Stories
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="writer-story-addpage-secdiv1 mb-5  ps-2">
            <div class="row row-cols-1 row-cols-md-5 g-4 mt-3 ">
              <div class="col text-center">
                <img
                  className={`writer-viewstory-categoryimg ${filter.category == 'Tragedy' ? sel : ''}`}
                  src={Drama}
                  onClick={() => applyFilter({ category: "Tragedy" })}
                />
                <h4 className="mt-3">Tragedy</h4>
              </div>
              <div class="col text-center">
                <img
                  className={`writer-viewstory-categoryimg ${filter.category == 'Crime' ? sel : ''}`}
                  src={Crime}
                  onClick={() => applyFilter({ category: "Crime" })}
                />
                <h4 className="mt-3">Crime</h4>
              </div>
              <div class="col text-center">
                <img
                  className={`writer-viewstory-categoryimg ${filter.category == 'Horror' ? sel : ''}`}
                  src={Horror}
                  onClick={() => applyFilter({ category: "Horror" })}
                />
                <h4 className="mt-3">Horror</h4>
              </div>
              <div class="col text-center">
                <img
                  className={`writer-viewstory-categoryimg ${filter.category == 'Romance' ? sel : ''}`}
                  src={Romance}
                  onClick={() => applyFilter({ category: "Romance" })}
                />
                <h4 className="mt-3">Romance</h4>
              </div>
              <div class="col text-center">
                <img
                  className={`writer-viewstory-categoryimg ${filter.category == 'Fantasy' ? sel : ''}`}
                  src={Fantasy}
                  onClick={() => applyFilter({ category: "Fantasy" })}
                />
                <h4 className="mt-3">Fantasy</h4>
              </div>
              <div class="col text-center">
                <img
                  className={`writer-viewstory-categoryimg ${filter.category == 'Comedy' ? sel : ''}`}
                  src={Fantasy}
                  onClick={() => applyFilter({ category: "Comedy" })}
                />
                <h4 className="mt-3">Comedy</h4>
              </div>
            </div>

            <div class="row row-cols-1 row-cols-md-2 g-4 mt-3 ">
              {filterResult.length == 0 ? (<h1>No story found for selected filter</h1>) : filterResult.map((item, index) => (
                <div className="col" key={index}>
                  <div className="card writer-viewstory-categoryview ">
                    <div className="row g-0 m-3 ">
                      <div className="col-md-6 viewstorysdiv1 p-2">
                       {" "}
                        <h1>
                        {item.title}
                          
                        </h1>
                        <h6> {item.storyCategory}</h6>
                        <p>{item.summary}</p>
                      </div>
                      <div className="col-md-6 viewstorysdiv2">
                        <img
                          src={`${imageUrl}/${item.coverPicture?.filename}`}
                          alt=""
                          className="storycoverimage"
                        />
                      </div>
                      <div className="text-center mt-2">
                        <button onClick={()=>ViewDetailedStory(item._id)} className="btn btn-dark w-25 text-center">
                          View Story
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReaderViewStories;
