import React, { useState, useEffect } from "react";
import "./Reader.css";
import writerprofilebackimg from "../../Assets/writerprofilebackimg.png";
import { FaCamera } from "react-icons/fa";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { useParams, useNavigate } from "react-router-dom";
import { imageUrl } from "../../BaseAPIs/ImageUrl/imgApi";
function ReaderEditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    userCategory: "",
    contact: "",
    age: "",
    profilePicture: { filename: "" },
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    userCategory: "",
    contact: "",
    age: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  let formIsValid = true;
  useEffect(() => {
    // Fetch reader data when component mounts
    const fetchReaderData = async () => {
      try {
        const res = await axiosInstance.post(`viewReaderById/${id}`);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching reader data:", error);
      }
    };

    fetchReaderData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setProfileImage(files[0]);
      setData((prevData) => ({
        ...prevData,
        profilePicture: { filename: files[0].name },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const validateField = (fieldName, value) => {
    if (fieldName === "name" && /^\d/.test(value)) {
      return "Name must not start with a number.";
    }
    if (typeof value === "string" && !value.trim()) {
      return `${fieldName} is required`;
    }
    if (fieldName === "email" && !value.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address.";
    }
    return "";
  };
  const validateContact = (fieldName, value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (value.length !== 10) {
      return "Please enter a valid Contact Number";
    }
    return "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     formIsValid = true;
    let validationErrors = {};

    Object.keys(data).forEach((key) => {
      if (key === "contact") {
        validationErrors[key] = validateContact(key, data[key]);
      } else {
        validationErrors[key] = validateField(key, data[key]);
      }
      if (validationErrors[key]) {
        formIsValid = false;
      }
    });



   
    // Output the validation results for debugging
    console.log(formIsValid);
    console.log(validationErrors);
    
    if (!data.userCategory.trim()) {
      validationErrors.userCategory = "please choose a category";
      formIsValid = false;
    }

    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(data.name)) {
      formIsValid = false;
      validationErrors.name = 'Input should contain alphabets or spaces only';
    }

    setErrors(validationErrors);
    if (formIsValid) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("userCategory", data.userCategory);
    formData.append("contact", data.contact);
    formData.append("age", data.age);
    if (profileImage) {
      formData.append("profilePicture", profileImage);
    }

    try {
      const res = await axiosInstance.post(`/editReaderById/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      if (res.data.status === 200) {
        alert("Updated Successfully");
        navigate("/reader-profile")
        // Optionally redirect to profile or another page
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error("Error updating reader profile:", error);
      alert("An error occurred");
    }
  }
}

  return (
    <div>
      <div>
        <img
          src={writerprofilebackimg}
          className="reader-edit-profile-back-img"
          alt="Background"
        />
      </div>
      <div className="text-center">
        <div className="text-center">
          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : `${imageUrl}/${data.profilePicture.filename}`
            }
            alt="Profile"
            className="reader-edit-profile-front-img"
          />
          <label className="upload-icon">
            <FaCamera
              className="writer-edit-profile-icon"
              style={{ position: "absolute" }}
              onClick={() => document.getElementById("profilePicture").click()}
            />
            <input
              type="file"
              style={{ display: "none" }}
              name="profilePicture"
              id="profilePicture"
              onChange={handleChange}
            />
          </label>
        </div>
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
                  className="ms-3 writer_edit_pro_input"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              
                <hr className=""/>
                
                {errors.name && (
                    <div className="text-danger mb-3">{errors.name}</div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Email ID</label>
              </div>
              <div className="col">
                <input
                  className="ms-3 writer_edit_pro_input"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
                <hr />
                {errors.email && (
                    <div className="text-danger  mb-3">{errors.email}</div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Category</label>
              </div>
              <div className="col">
                <input
                  className="ms-3 writer_edit_pro_input"
                  name="userCategory"
                  value={data.userCategory}
                  onChange={handleChange}
                  disabled
                />
                <hr />
                {errors.userCategory && (
                    <div className="text-danger mb-3">{errors.userCategory}</div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Phone Number</label>
              </div>
              <div className="col">
                <input
                  className="ms-3 writer_edit_pro_input"
                  name="contact"
                  value={data.contact}
                  onChange={handleChange}
                />
                <hr />
                {errors.contact && (
                    <div className="text-danger mb-3">{errors.contact}</div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Age</label>
              </div>
              <div className="col">
                <input
                  className="ms-3 writer_edit_pro_input"
                  name="age"
                  value={data.age}
                  onChange={handleChange}
                />
                <hr />
                {errors.age && (
                    <div className="text-danger mb-3">{errors.age}</div>
                  )}
              </div>
            </div>
            <div className="text-center mt-5">
              <button type="submit" className="reader-profile-editbtn">
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

export default ReaderEditProfile;
