import React, { useState } from "react";
import "./viewerregister.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
// import validator from 'validator'
import { useNavigate } from "react-router-dom";

function ViewerRegister() {
  const [viewerRegister, setViewerRegister] =useState({

  });

  const ViewerRegisterChange = () => {};

  return (
    <div>
      <form>
        <div className="backgroundimg">
          <Container>
            <Row>
              {" "}
              <Col>
                <div className="text-center mb-4 ps-5 mt-4">
                  <b>Register</b>
                </div>
                <label>Name</label>
                <div className="firstname">
                  <input
                    type="text"
                    required
                    placeholder="firstname"
                    className="form-control"
                    name="firstname"
                    id="inputtransparent"
                    value={viewerRegister.firstname}
                    onChange={ViewerRegisterChange}
                  />
                </div>
                <div className="mb-2 mt-3 ">
                  <label className="pb-3">Gender :</label>
                  <div>
                    <label for="male">&nbsp; Male &nbsp;</label>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      onChange={ViewerRegisterChange}
                      required
                    />
                    <label for="female">&nbsp; Female &nbsp;</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      onChange={ViewerRegisterChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-2 mt-3">
                  <input
                    type="date"
                    placeholder="dob"
                    name="dob"
                    id="inputtransparent"
                    className="form-control"
                    value={viewerRegister.dob}
                    onChange={ViewerRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col>
                {" "}
                <div className="pt-5 mt-5">
                  <input
                    type="text"
                    placeholder="lastname"
                    name="lastname"
                    id="inputtransparent"
                    className="form-control"
                    value={viewerRegister.lastname}
                    onChange={ViewerRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-2 mt-3">
                  <input
                    type="text"
                    placeholder="street"
                    name="street"
                    id="inputtransparent"
                    className="form-control"
                    value={viewerRegister.street}
                    onChange={ViewerRegisterChange}
                    required
                  />
                </div>
                <div className="mb-2 mt-3">
                  <input
                    type="number"
                    placeholder="mobile"
                    className="form-control"
                    id="inputtransparent"
                    value={viewerRegister.mobile}
                    name="mobile"
                    onChange={ViewerRegisterChange}
                    required
                  />
                </div>
                <div className="mb-2 mt-3">
                  <input
                    type="email"
                    id="inputtransparent"
                    placeholder="Enter your email"
                    className="form-control"
                    name="email"
                    value={viewerRegister.email}
                    onChange={ViewerRegisterChange}
                    required
                  />
                </div>
                <div className="mb-2 mt-3">
                  <input
                    type="password"
                    placeholder="password"
                    id="inputtransparent"
                    name="password"
                    className="form-control"
                    value={viewerRegister.password}
                    onChange={ViewerRegisterChange}
                    required
                  />
                </div>
                <div className="mb-2 mt-3">
                  <select
                    id="country-state"
                    name="country"
                    className="form-control"
                    onChange={ViewerRegisterChange}
                  >
                    <option value="">Select Country</option>
                    <option>Nationality</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="Russia">Russia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                </div>
                
              </Col>
              <Col>
                <div className="mb-2 mt-3">
                  <input
                    type="text"
                    placeholder="city"
                    name="city"
                    className="form-control"
                    id="inputtransparent"
                    value={viewerRegister.city}
                    onChange={ViewerRegisterChange}
                    required
                  />
                </div>
                <div className="mb-2 mt-3">
                  <input
                    type="number"
                    placeholder="Pincode"
                    name="pincode"
                    id="inputtransparent"
                    className="form-control"
                    value={viewerRegister.pincode}
                    onChange={ViewerRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <div className="text-center">
              {" "}
              <button
                type="submit"
                className=" RegisterButton ps-5 pe-5 p-2 mt-5 mb-5"
              >
                Register
              </button>
              <button
                type="reset"
                className="cancelbutton ps-5 pe-5 p-2 mt-5 mb-5"
              >
                Cancel
              </button>
            </div>
          </Container>
        </div>
      </form>
    </div>
  );
}

export default ViewerRegister;
