import React, { useEffect, useState } from "react";
import "./Writer.css";
import writerprofilebackimg from "../../Assets/writerprofilebackimg.png";
import { FaCamera } from "react-icons/fa";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";

function WriterEditProfile({ url }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    userCategory: "",
    contact: "",
    age: "",
    password: "",
    profilePicture: { filename: "" },
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const id = localStorage.getItem("writer"); // Ensure the correct key is used here
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    axiosInstance
      .post(`viewWriterById/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      setProfileImage(file);
      setData((prevData) => ({
        ...prevData,
        profilePicture: { filename: file.name },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    let validationErrors = {};
    if (!data.name) validationErrors.name = "Name is required";
    if (!data.email) validationErrors.email = "Email is required";
    if (!data.contact) {
      validationErrors.contact = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.contact)) {
      validationErrors.contact = "Phone number must be 10 digits";
    }
    if (!data.age) validationErrors.age = "Age is required";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("userCategory", data.userCategory);
    formData.append("contact", data.contact);
    formData.append("age", data.age);
    formData.append("password", data.password);
    if (profileImage) {
      formData.append("profilePicture", profileImage);
    }
    try {
      const res = await axiosInstance.post(`editWriterById/${id}`, formData);
      if (res.data.status === 200) {
        alert("Updated Successfully");
        navigate("/writer-profile");
      } else {
        alert("Failed");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred");
    }
  };

  return (
    <div>
      <div>
        <img
          src={writerprofilebackimg}
          className="writer-edit-profile-back-img"
          alt="background"
        />
      </div>
      <div className="text-center">
      <img
      src={
        profileImage
          ? URL.createObjectURL(profileImage)
          : data.profilePicture.filename
          ? `${imageUrl}/${data.profilePicture.filename}`
          : `${imageUrl}/${data.profilePicture}`
      }
      style={{ position: "relative" }}
      alt="Profile"
      className="writer-edit-profile-front-img"
    />
    
        <label className="upload-icon">
          <FaCamera
            className="writer-edit-profile-icon"
            style={{ position: "absolute" }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            name="profilePicture"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 mb-5 mt-5">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <label>Name</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <label>Email ID</label>
              </div>
              <div className="col">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  disabled
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <label>Category</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  name="userCategory"
                  disabled
                  value={data.userCategory}
                  onChange={handleChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <label>Phone Number</label>
              </div>
              <div className="col">
                <input
                  type="text"
                  name="contact"
                  value={data.contact}
                  onChange={handleChange}
                />
                {errors.contact && <p className="error">{errors.contact}</p>}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <label>Age</label>
              </div>
              <div className="col">
                <input
                  type="number"
                  name="age"
                  value={data.age}
                  onChange={handleChange}
                />
                {errors.age && <p className="error">{errors.age}</p>}
              </div>
            </div>
            <hr />
            <div className="text-center mt-5">
              <button type="submit" className="writer-profile-editbtn">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default WriterEditProfile;
