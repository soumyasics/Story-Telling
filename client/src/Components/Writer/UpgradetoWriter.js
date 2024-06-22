import React from "react";
import "./UpgradeToWriter.css";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../BaseAPIs/axiosinstatnce";
import { useNavigate } from "react-router-dom";

function UpgradeToWriter() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState({
    CardNumber: "",
    Expirydate: "",
    CVV: "",
    NameonCard: "",
  });
  const amount = 199;

  const [errors, setErrors] = useState({
    CardNumber: "",
    Expirydate: "",
    CVV: "",
    NameonCard: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const { CardNumber, Expirydate, CVV, NameonCard } = data;

    const enteredDateObj = new Date(Expirydate);
    const currentDate = new Date();

    let valid = true;

    if (NameonCard.length <= 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        NameonCard: "Name on card must be longer than 3 characters",
      }));
      valid = false;
    }

    if (CardNumber.length !== 16) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        CardNumber: "Card number must be 16 digits",
      }));
      valid = false;
    }

    if (enteredDateObj <= currentDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Expirydate: "Expiry date must be in the future",
      }));
      valid = false;
    }

    if (CVV.length !== 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        CVV: "CVV must be 3 digits",
      }));
      valid = false;
    }

    if (valid) {
      axiosInstance
        .post("/addPayment/" + localStorage.getItem("writer"), {
          amount: amount,
        })
        .then((result) => {
          console.log(result);
          alert(result.data.msg);
          setTimeout(() => {
            navigate("/writerhome");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="UpgradeToWriter-Div1">
        <div className=" UpgradeToWriter-Div2">
          <h1 className="UpgradeToWriter-h1-1">Upgrade To Writer!</h1>

          <div className="UpgradeToWriter-Div3">
            <h2 className="UpgradeToWriter-h2-2">Premium</h2>

            <div className="UpgradeToWriter-Div4">
              <p>Write unlimited stories</p>
              <p>Create Atractive Activities</p>
              <p>Create Branching Narratives</p>
            </div>

            <div className="UpgradeToWriter-Div5 text-center">
              <b> Price - 199 $</b> <br />
            </div>
          </div>

          <button class="btn btn-dark px-5 py-2" onClick={handleShow}>
            Continue
          </button>
        </div>
        <Modal className="bg-transparent" show={show} onHide={handleClose}>
          <div className="UpgradeToWriter-Div2">
            <h1 className="UpgradeToWriter-h1-1">Set up your card</h1>

            <div className="UpgradeToWriter-Div3">
              <input
                id="custom-input1"
                type="number"
                className="form-control custom-input mx-5 w-75"
                placeholder="Card Number"
                name="CardNumber"
                onChange={handleChange}
                value={data.CardNumber}
              />
              {errors.CardNumber && (
                <div className="text-danger">{errors.CardNumber}</div>
              )}
              <input
                id="custom-input1"
                type="date"
                className="form-control custom-input mx-5 w-75"
                placeholder="Expiry date"
                name="Expirydate"
                onChange={handleChange}
                value={data.Expirydate}
              />
              {errors.Expirydate && (
                <div className="text-danger">{errors.Expirydate}</div>
              )}
              <input
                id="custom-input1"
                type="number"
                className="form-control custom-input mx-5 w-75"
                placeholder="CVV"
                name="CVV"
                onChange={handleChange}
                value={data.CVV}
              />
              {errors.CVV && <div className="text-danger">{errors.CVV}</div>}
              <input
                id="custom-input1"
                type="text"
                className="form-control custom-input mx-5 w-75"
                placeholder="Name on Card"
                name="NameonCard"
                onChange={handleChange}
                value={data.NameonCard}
              />
              {errors.NameonCard && (
                <div className="text-danger">{errors.NameonCard}</div>
              )}
            </div>

            <button className="btn btn-dark px-5 py-2" onClick={handleSubmit}>
              Start Membership
            </button>
          </div>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default UpgradeToWriter;
