import React, { useState } from "react";
import "./UpgradeToWriter.css";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";

function SetupCard() {
  const [data, setData] = useState({
    CardNumber: "",
    Expirydate: "",
    CVV: "",
    NameonCard: "",
  });

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
      alert(" Successfully Upgraded to Writer")
    }
  };

  return (
    <div>
      <Header />
      <div className="UpgradeToWriter-Div1">
        <div className="UpgradeToWriter-Div2">
          <h1 className="UpgradeToWriter-h1-1">Set up your card</h1>

          <div className="UpgradeToWriter-Div3">
            <input
              id="custom-input"
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
              id="custom-input"
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
              id="custom-input"
              type="number"
              className="form-control custom-input mx-5 w-75"
              placeholder="CVV"
              name="CVV"
              onChange={handleChange}
              value={data.CVV}
            />
            {errors.CVV && <div className="text-danger">{errors.CVV}</div>}
            <input
              id="custom-input"
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

          <button
            className="btn btn-dark px-5 py-2"
            onClick={handleSubmit}
          >
            Start Membership
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SetupCard;
